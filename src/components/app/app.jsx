import React, { useEffect } from 'react';
//import logo from '../../images/logo.svg';
import indexStyles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import actionTypes from '../../utils/actionTypes';

//import { IngridientsListContext } from '../../services/ingridientsContext';
//import { OrderStateContext } from '../../services/orderStateContext';
import { ConstructorContext } from '../../services/burgerConstructorContext';
import { useSelector, useDispatch } from 'react-redux';

import {
  TOGGLE_MODAL_VISIBILITY,
  SET_CURRENT_MODAL_TYPE,
  //SET_INGRIDIENT_IN_MODAL,
  INGRIDIENT_FETCH_SUCCESS,
  INGRIDIENT_FETCH_ERROR,
} from '../../services/actions/burgerVendor';

// Импорт захардкоденных данных
// import ORDER_DATA from '../../utils/order-data';
// import ingridientsList from '../../utils/data'; // пока не удаляю на случай падения сервера с API


// Импорты компонентов модального окна
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngridientDetais from '../ingridient-details/ingridient-details';

// временно захардкодено
const ApiUrl = "https://norma.nomoreparties.space/api/ingredients";

function App() {

  const dispatch = useDispatch();

  // ************ Рефакторинг стейтов, отвечающих за получение от API массива ингридиентов бургера
  // Раньше было 3 отдельных стейта

  const ingridientsInitialState = {
    ingridientsData: [],
    isLoading: false,
    hasError: false
  };

  function ingridientsReducer(state, action) {
    switch (action.type) {
      case actionTypes.GOT_DATA:
        return {
          ingridientsData: action.value,
          isLoading: false,
          hasError: false
        };
      case actionTypes.FETCH_ERROR:
        return {
          ingridientsData: [],
          isLoading: false,
          hasError: true
        }
      default:
        throw new Error(`Wrong type of action in ingridientsState reducer: ${action.type}`);
    }
  };

  //const [ingridientsState, setIngridientsState] = React.useReducer(ingridientsReducer, ingridientsInitialState, undefined);

  // ************ Стейт, хранящий информацию для BurgerConstructor, позволяет добавлять в него данные из BurgerIngridients

  const constructorInitialState = {
    bun: {},
    draggableIngridients: []
  };

  function constructorReducer(state, action) {
    switch (action.type) {
      case actionTypes.ADD_BUN:
        return {
          ...state,
          bun: action.content,
        };
      case actionTypes.ADD_SAUCE:
        return {
          ...state,
          draggableIngridients: state.draggableIngridients.concat(action.content)  // добавляем в исходный массив объектов новый объект
        };
      case actionTypes.ADD_MAIN:
        return {
          ...state,
          draggableIngridients: state.draggableIngridients.concat(action.content)  // добавляем в исходный массив объектов новый объект
        };
      case actionTypes.UPDATE_DRAGGABLE_INGRIDIENTS:
        return {
          ...state,
          draggableIngridients: action.content // в action.content должен быть корректный массив с объектами ингридиентов. Если мы удаляем из draggableIngridients какой-то ингридиент, то сюда должен прийти массив, из которого объект ингридиента уже удалён
        };
      case actionTypes.REMOVE_ALL_INGRIDIENTS:
        return {
          bun: {},
          draggableIngridients: []
        }
      default:
        return state;
    }
  }

  const [constructorState, setConstructorState] = React.useReducer(constructorReducer, constructorInitialState, undefined);
  //const [orderState, setOrderState] = React.useState({});
  

  /******************************************************** */
  /******      Импорт стейтов из редакса        ********* */
  /****************************************************** */

  const modalIsVisible = useSelector(store => store.burgerVendor.modalIsVisible);
  const currentModalType = useSelector(store => store.burgerVendor.currentModalType);
  const ingrInModalData = useSelector(store => store.burgerVendor.ingrInModalData);
  const orderState = useSelector(store =>  store.burgerVendor.orderData);
  const arrOfIngridients = useSelector(store => store.burgerVendor.ingridientsData.arrOfIngridients);
  const dataIsLoading = useSelector(store => store.burgerVendor.ingridientsData.ingrDataIsLoading);
  const dataHasError = useSelector(store => store.burgerVendor.ingridientsData.ingrDataHasError);


  /******************************************************** */
  /******      Получение данных от API           ********* */
  /****************************************************** */

  // функция для получения массива данных от API
  const getIngridientsData = (url = '') => {
    // console.log('Отправляю запрос к API c ингридиентами');

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
        // setOrderData - здесь захардкоденные данные заказа (для отладки попапа с данными заказа)
        // setOrderData(ORDER_DATA);
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

  // фетч к API за массивом данных (произойдёт после первичного рендера App)
  useEffect(() => getIngridientsData(ApiUrl), []);

  // ТЕСТИРУЕМ ОБРАБОТКУ fetch:
  // ApiUrl - правильный аргумент для getIngridientsData() который вызываем выше
  // для тестирования обработки неудачных fetch спользуй badFetch. 
  // Эти открытые API вернут res.ok и json. Но не будет res.data c массивом объектов, как от правильного API
  // const badFetchFood = "https://world.openfoodfacts.org/api/v0/product/737628064502.json";
  // const badFetchPokemon = "https://pokeapi.co/api/v2/pokemon/ditto";


  /******************************************************** */
  /************      Рендер      ************************* */
  /****************************************************** */

  // https://www.bxnotes.ru/conspect/lib/react/react-notes/rendering/ - хорошая статья по рендерингу в реакте, надо заюзать
  // https://max-frontend.gitbook.io/redux-course-ru-v2/sozdanie/optimizatsiya-refaktoring/optimizatsiya-pererisovok - статья про оптимизацию рендера


  return (
    <>
      {/* {console.log('РЕНДЕРЮ app.jsx')} */}
      <AppHeader />

      <main className={indexStyles.main}>
        <section className={indexStyles.headerSection}>
          <h1 className="text text_type_main-large">Соберите бургер</h1>
        </section>

        <section className={indexStyles.constructorContainer}>

          {/* Здесь стоит условие: отрисовка компонентов только после успешного получения данных правильного формата
          * Это очень важно непосредственно для компонента  BurgerConstructor, который роняет приложение при первичном рендере без fetch или без правильных пропсов после fetch

          ***Про условия отрисовки:
          Условие (!!arrOfIngridients.length) пересчитается в false как при первичном рендере до фетча, так и при .catch в fetch */}
          {!dataIsLoading && !dataHasError && !!arrOfIngridients.length && (
            <>
                <ConstructorContext.Provider value={{ constructorState, setConstructorState }}>

                    {/* попап  - ingrInModalData */}
                    <BurgerIngredients />

                    {/* попап  - orderData */}
                    <BurgerConstructor />

                    {/* рендеринг попапа с инфой об ингридиенте бургера - ingrInModalData*/}
                    {modalIsVisible && (currentModalType === 'IngridientDetails') &&
                      <Modal>
                        <IngridientDetais ingrInModalData={ingrInModalData} />
                      </Modal>
                    }

                    {/* рендеринг попапа с деталями заказа - orderData */}
                    {modalIsVisible && (currentModalType === 'OrderDetails') &&
                      <Modal>
                        <OrderDetails />
                      </Modal>
                    }

                </ConstructorContext.Provider>
            </>
          )}
        </section>
      </main>
    </>
  );
}

export default App;
