import React, { useEffect } from 'react';
//import logo from '../../images/logo.svg';
import indexStyles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import actionTypes from '../../utils/actionTypes';

import { IngridientsListContext } from '../../services/ingridientsContext';
import { OrderStateContext } from '../../services/orderStateContext';
import { ConstructorContext } from '../../services/burgerConstructorContext';

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

  const [ingridientsState, setIngridientsState] = React.useReducer(ingridientsReducer, ingridientsInitialState, undefined);

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
        console.log('actionTypes.UPDATE_DRAGGABLE_INGRIDIENTS');
        return {
          ...state,
          draggableIngridients: action.content // в action.content должен быть корректный массив с объектами ингридиентов. Если мы удаляем из draggableIngridients какой-то ингридиент, то сюда должен прийти массив, из которого объект ингридиента уже уданён
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
  const [orderState, setOrderState] = React.useState({});

  /******************************************************** */
  /******      Управление модальным окном        ********* */
  /****************************************************** */

  // по-хорошему, перенести бы эти стейты в Modal, чтобы все приложение не перерендеривалось
  const [modalIsVisible, setModalVisibility] = React.useState(false);
  const [currentModalType, setCurrentModalType] = React.useState('none');
  // const [orderData, setOrderData] = React.useState({});
  const [ingrInModalData, setIngrInModalData] = React.useState({});

  const closeModal = () => {
    setModalVisibility(false);
    setCurrentModalType('none');
  }

  const openModal = (
    event = "attention: didn't get an event in first arg of openModal() in app.js",
    typeOfModal = 'none',
    objIngridient = {}
  ) => {
    // console.log('event in openModal() is ', event);
    // console.log('typeOfModal is ', typeOfModal);

    setModalVisibility(true); // отображаем модальное окно   
    setCurrentModalType(typeOfModal); //уведомляем Modal, какой тип модалки открыть
    setIngrInModalData(objIngridient); // этот стейт содержит объект с данными об ингридиенте, нужен для рендера IngridientDetails внутри Modal
  }


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

        setIngridientsState({ type: actionTypes.GOT_DATA, value: res.data });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(`Error: can't fetch ingridiets data from ${url}`);
        console.log(`response from server is: `, err);
        console.log(`err.message is: `, err.message);

        setIngridientsState({ type: actionTypes.FETCH_ERROR });
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
          1) Условие ingridientsData пересчитается в false, если в результате fetch сервер вернул объект ответа без свойства res.data (т.е. оно будет undefined) - так иногда бывает со стороны https://norma.nomoreparties.space/*  - в принципе, теперь это условие можно убрать
          2) Условие (!!ingridientsData.length) пересчитается в false как при первичном рендере до фетча, так и при .catch в fetch */}
          {!ingridientsState.isLoading && !ingridientsState.hasError && ingridientsState.ingridientsData && !!ingridientsState.ingridientsData.length && (
            <>
              <IngridientsListContext.Provider value={{ ingridientsState }}>
                <ConstructorContext.Provider value={{ constructorState, setConstructorState }}>
                  <OrderStateContext.Provider value={{ orderState, setOrderState }}>

                    {/* попап  - ingrInModalData */}
                    <BurgerIngredients openModal={openModal} />

                    {/* попап  - orderData */}
                    <BurgerConstructor openModal={openModal} />

                    {/* рендеринг попапа с инфой об ингридиенте бургера - ingrInModalData*/}
                    {modalIsVisible && (currentModalType === 'IngridientDetails') &&
                      <Modal closeModal={closeModal}>
                        <IngridientDetais ingrInModalData={ingrInModalData} />
                      </Modal>
                    }

                    {/* рендеринг попапа с деталями заказа - orderData */}
                    {modalIsVisible && (currentModalType === 'OrderDetails') &&
                      <Modal closeModal={closeModal}>
                        <OrderDetails />
                      </Modal>
                    }

                  </OrderStateContext.Provider>
                </ConstructorContext.Provider>
              </IngridientsListContext.Provider>
            </>
          )}

        </section>
      </main>
    </>
  );
}

export default App;
