// импорт экшенов
import {
    TOGGLE_MODAL_VISIBILITY,
    SET_CURRENT_MODAL_TYPE,
    SET_INGRIDIENT_IN_MODAL,
    SET_ORDER_STATE
} from '../actions/burgerVendor';

// исходное состояние




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
        default: {
            return state;
        }
    }
}

// экспорт редьюсера