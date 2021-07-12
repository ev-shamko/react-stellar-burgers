export const TOGGLE_MODAL_VISIBILITY = 'TOGGLE_MODAL_VISIBILITY';
export const SET_CURRENT_MODAL_TYPE = 'SET_CURRENT_MODAL_TYPE';
export const SET_INGRIDIENT_IN_MODAL = 'SET_INGRIDIENT_IN_MODAL';
export const SET_ORDER_STATE = 'SET_ORDER_STATE';
export const INGRIDIENT_FETCH_SUCCESS = 'INGRIDIENT_FETCH_SUCCESS';
export const INGRIDIENT_FETCH_ERROR = 'INGRIDIENT_FETCH_ERROR';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const SET_MODAL_TYPE = 'SET_CURRENT_MODAL_TYPE';
export const ADD_BUN = 'ADD_BUN';
export const ADD_SAUCE = 'ADD_SAUCE';
export const ADD_MAIN = 'ADD_MAIN';
export const UPDATE_DRAGGABLE_INGRIDIENTS = 'UPDATE_DRAGGABLE_INGRIDIENTS';
export const REMOVE_ALL_INGRIDIENTS = 'REMOVE_ALL_INGRIDIENTS';

// миддлвара для thunk
// запрос к серверу для получения списка доступных ингридиентов бургера
export function getIngridientsData(url = 'https://norma.nomoreparties.space/api/ingredients') {
    return function (dispatch) {
        fetch(url)
            .then((res) => {
                /* https://github.com/ev-shamko/react-stellar-burgers/pull/2#discussion_r648116469 
                отличный комментарий от ревьюера про то, как этот условный блок ловит ошибку и перенаправляет ее в .catch - - -  плюс ссылки на доку от developer.mozilla.org */
                if (res.ok) {                    
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .then((res) => {

                if (!(Array.isArray(res.data))) {
                    console.log('Promise.reject(This response is not valid)');
                    console.log(`Didn't find array in res.data  :-(   Probably got wrong response from ${url}`);
                    return Promise.reject(res);
                }
                dispatch({
                    type: INGRIDIENT_FETCH_SUCCESS,
                    value: res.data,
                })
            })
            .catch((err) => {
                console.log(`Error: can't fetch ingridiets data from ${url}`);
                console.log(`response from server is: `, err);
                console.log(`err.message is: `, err.message);

                dispatch({
                    type: INGRIDIENT_FETCH_ERROR,
                })
            });
    };
};