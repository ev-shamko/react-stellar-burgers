import update from "immutability-helper"; // этот пакет для ресортировки массива, хранящегося в стейте
import { TBurgerVendorActionsUnion } from '../actions/burgerVendor';

import { TOrderData, TDraggableIngr, TIngredientObjData, TModalType } from '../../utils/types';

import {
    TOGGLE_MODAL_VISIBILITY,
    SET_CURRENT_MODAL_TYPE,
    SET_INGRIDIENT_IN_MODAL,
    SET_ORDER_STATE,
    INGRIDIENT_FETCH_SUCCESS,
    INGRIDIENT_FETCH_ERROR,
    OPEN_MODAL,
    CLOSE_MODAL,
    SET_MODAL_TYPE,
    ADD_BUN,
    ADD_SAUCE,
    ADD_MAIN,
    UPDATE_DRAGGABLE_INGRIDIENTS,
    REMOVE_ALL_INGRIDIENTS,
    RESORT_DRAGGABLE_INGRIDIENTS,
    SET_CONSTRUCTOR_LOADER,
} from '../actions/burgerVendor';

export type TBurgerVendorReducer = {
    ingridientsData: {
        arrOfIngridients: Array<TIngredientObjData>,
        ingrDataIsLoading: boolean,
        ingrDataHasError: boolean,
    }
    bun: TIngredientObjData,
    draggableIngridients: Array<TDraggableIngr>,

    modalIsVisible: boolean,
    currentModalType: TModalType,
    ingrInModalData: TIngredientObjData,
    orderData: TOrderData,
    constructorLoaderIsVisible: boolean,

}

// 'пустой' объект ингридиента, решает проблему типирования пропса для модального она
export const blankIngr: TIngredientObjData  = {
    _id: '',
    name: '',
    type: 'main',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: '',
    image_mobile: '',
    image_large: '',
    __v: 0,
}

const initialState: TBurgerVendorReducer = {
    ingridientsData: {
        arrOfIngridients: [],
        ingrDataIsLoading: false,
        ingrDataHasError: false,
    },

    // два свойства с содержимым ингридиентов в BurgerConcstructor
    bun: blankIngr,
    draggableIngridients: [],

    // модальное окно
    modalIsVisible: false,
    currentModalType: 'none',
    ingrInModalData: blankIngr, // TODO: переименовать в ingrDataInModal

    orderData: {
        success: false,
        name: '',
        order: {
            number: '',
        },
    },
    constructorLoaderIsVisible: false,
};

// создание редьюсера
// выполняю рекомендацию к проекту: на данном этапе собираю все редьюсеры в одном файле

export const burgerVendorReducer = (state = initialState, action: TBurgerVendorActionsUnion): TBurgerVendorReducer => {
    switch (action.type) {
        case TOGGLE_MODAL_VISIBILITY: {
            return {
                ...state,
                modalIsVisible: action.value,
            }
        }
        case SET_CURRENT_MODAL_TYPE: {
            return {
                ...state,
                currentModalType: action.value, // 'none', 'IngridientDetails', 'OrderDetails'
            }
        }
        case SET_INGRIDIENT_IN_MODAL: {
            return {
                ...state,
                ingrInModalData: action.value // {}
            }
        }
        case SET_ORDER_STATE: {
            return {
                ...state,
                orderData: action.value, // {}
            }
        }
        case INGRIDIENT_FETCH_SUCCESS: {
            return {
                ...state,
                ingridientsData: {
                    arrOfIngridients: action.value,
                    ingrDataIsLoading: false,
                    ingrDataHasError: false,
                },
            }
        }
        case INGRIDIENT_FETCH_ERROR: {
            return {
                ...state,
                ingridientsData: {
                    arrOfIngridients: [],
                    ingrDataIsLoading: false,
                    ingrDataHasError: true
                },
            }
        }
        case OPEN_MODAL: {
            return {
                ...state,
                modalIsVisible: true,
            }
        }
        case CLOSE_MODAL: {
            return {
                ...state,
                modalIsVisible: false,
            }
        }
        case SET_MODAL_TYPE: {
            return {
                ...state,
                currentModalType: action.value,
            }
        }
        case ADD_BUN: {
            return {
                ...state,
                bun: action.value, // объект с данными о булке
            }
        }
        case ADD_SAUCE: {
            const instanceID = (new Date()).getTime(); // лучше сделать гарантированно уникальный id, иначе забагует DND
            const objIngridientWithId: TDraggableIngr = { ...action.value, instanceID }; // добавляем в объект ингридиента уникальный ID (instanceID), он нужен для DND-ресортировки в конструкторе бургера. Почему называется obj.instanceID, а не просто obj.id? Потому что внутри таких объектов уже есть свойство obj._id, и оно не уникально для массива draggableInghidients, т.к. в массив можно добавить несколько одинаковых ингридиентов с одним и тем же obj._id. И ещё лично мне легко перепутать obj._id и ob.id - слишком похожее написание.
            return {
                ...state,
                draggableIngridients: state.draggableIngridients.concat(objIngridientWithId)  // добавляем в исходный массив объектов новый объект
            }
        }
        case ADD_MAIN: {
            const instanceID = (new Date()).getTime();
            const objInstance = { ...action.value, instanceID }; // добавляем в объект ингридиента уникальный instanceID, он нужен для DND-ресортировки в конструкторе бургера
            return {
                ...state,
                draggableIngridients: state.draggableIngridients.concat(objInstance)  // добавляем в исходный массив объектов новый объект
            };
        }
        case UPDATE_DRAGGABLE_INGRIDIENTS: {
            return {
                ...state,
                draggableIngridients: action.value // в action.value должен быть корректный массив с объектами ингридиентов. Если мы удаляем из draggableIngridients какой-то ингридиент, то сюда должен прийти массив, из которого объект ингридиента уже удалён
            };
        }
        case RESORT_DRAGGABLE_INGRIDIENTS: {
            const resortedArrOfIngridients = update(state.draggableIngridients, {
                // Что здесь происходит: мы ресортируем массив объектов ингридиентов в конструкторе бургера
                // пакет immutability-helper для этого нуждается в indexOfDraggedIngr и indexOfDroppedIngr - исходных индексах в массиве draggableIngridients
                // Выбранный ингридиент (indexOfDraggedIngr) ставится на индекс другого ингридиента (indexOfDroppedIngr).
                $splice: [
                    [action.indexOfDraggedIngr, 1],
                    [action.indexOfDroppedIngr, 0, state.draggableIngridients[action.indexOfDraggedIngr]],
                ],
            });
            return {
                ...state,
                draggableIngridients: resortedArrOfIngridients,
            }
        }
        case REMOVE_ALL_INGRIDIENTS: {
            return {
                ...state,
                bun: blankIngr,
                draggableIngridients: []
            }
        }
        case SET_CONSTRUCTOR_LOADER: {
            return {
                ...state,
                constructorLoaderIsVisible: action.value,
            }
        }
        default: {
            return state;
        }
    }
}