import {
    TOGGLE_MODAL_VISIBILITY,
    SET_CURRENT_MODAL_TYPE,
    SET_INGRIDIENT_IN_MODAL,
    SET_ORDER_STATE
} from '../actions/burgerVendor';


const initialState = {
    // для получения списка ингридиентов от API
    ingridientsData: [],
    isLoading: false,
    hasError: false,

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
            console.log('SET_ORDER_STATE: ', action.value )
            return {
                ...state,
                orderData: action.value, // {}
            }
        }
        default: {
            return state;
        }
    }
}

// экспорт редьюсера