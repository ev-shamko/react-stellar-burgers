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

    // constructorInitialState
    // В предыдущую итерацию тут был Стейт, хранящий информацию для BurgerConstructor, позволяет добавлять в него данные из BurgerIngridients
    bun: {},
    draggableIngridients: [],

    // модальное окно
    modalIsVisible: false,
    currentModalType: 'none',
    ingrInModalData: {},

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
            const sequenceId = state.draggableIngridients.length + 1;
            const objIngridientWithId = { ...action.value, sequenceId }; // добавляем к объекту ингридиента порядковый номер, он нужен для сортировки DND в конструкторе бургера
            return {
                ...state,
                draggableIngridients: state.draggableIngridients.concat(objIngridientWithId)  // добавляем в исходный массив объектов новый объект
            }
        }
        case ADD_MAIN: {
            const sequenceId = state.draggableIngridients.length + 1;
            const objIngridientWithId = { ...action.value, sequenceId };
            return {
                ...state,
                draggableIngridients: state.draggableIngridients.concat(objIngridientWithId)  // добавляем в исходный массив объектов новый объект
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
                $splice: [
                    [action.indexOfDroppedIngr, 1],
                    [action.originalIndexInStore, 0, state.draggableIngridients[action.indexOfDroppedIngr]],
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

// экспорт редьюсера