import update from "immutability-helper";

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
} from '../actions/burgerVendor';


const initialState = {
    ingridientsData: {
        arrOfIngridients: [],
        ingrDataIsLoading: false,
        ingrDataHasError: false,
    },

    // два свойства с содержимым ингридиентов в BurgerConcstructor
    bun: {},
    draggableIngridients: [],

    // модальное окно
    modalIsVisible: false,
    currentModalType: 'none',
    ingrInModalData: {}, // TODO: переименовать в ingrDataInModal

    orderData: {},
};

// создание редьюсера
// выполняю рекомендацию к проекту: на данном этапе собираю все редьюсеры в одном файле

export const burgerVendorReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_MODAL_VISIBILITY: {
            return {
                ...state,
                modalIsVisible: action.value, // true/false
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
            console.log('SET_ORDER_STATE: ', action.value)
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
                    ingridientsData: [],
                    isLoading: false,
                    hasError: true
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
                currentModalType: action.value, // 'none' / 'IngridientDetails' / 'OrderDetails'
            }
        }
        case ADD_BUN: {
            return {
                ...state,
                bun: action.value, // объект с данными о булке
            }
        }
        case ADD_SAUCE: {
            const instanceID = state.draggableIngridients.length + 1;
            const objIngridientWithId = { ...action.value, instanceID }; // добавляем в объект ингридиента уникальный ID (instanceID), он нужен для DND-ресортировки в конструкторе бургера. Почему называется obj.instanceID, а не просто obj.id? Потому что внутри таких объектов уже есть свойство obj._id, и оно не уникально для массива draggableInghidients, т.к. в массив можно добавить несколько одинаковых ингридиентов с одним и тем же obj._id. И ещё лично мне легко перепутать obj._id и ob.id - слишком похожее написание.
            return {
                ...state,
                draggableIngridients: state.draggableIngridients.concat(objIngridientWithId)  // добавляем в исходный массив объектов новый объект
            }
        }
        case ADD_MAIN: {
            const instanceID = state.draggableIngridients.length + 1;
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
                // пакет immutability-helper для этого нужндается в indexOfDraggedIngr и indexOfDroppedIngr - исходных индексах в массиве draggableIngridients
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
                bun: {},
                draggableIngridients: []
            }
        }
        default: {
            return state;
        }
    }
}