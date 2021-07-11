import React, { useEffect } from 'react';
//import logo from '../../images/logo.svg';
import indexStyles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useSelector, useDispatch } from 'react-redux';
import {
  INGRIDIENT_FETCH_SUCCESS,
  INGRIDIENT_FETCH_ERROR,
} from '../../services/actions/burgerVendor';

// import ingridientsList from '../../utils/data'; // пока не удаляю на случай падения сервера с API

// Импорты компонентов модального окна
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngridientDetais from '../ingridient-details/ingridient-details';

// временно захардкодено
const ApiUrl = "https://norma.nomoreparties.space/api/ingredients";

function App() {

  const dispatch = useDispatch();

  /******************************************************** */
  /******      Импорт стейтов из редакса        ********* */
  /****************************************************** */

  const modalIsVisible = useSelector(store => store.burgerVendor.modalIsVisible);
  const currentModalType = useSelector(store => store.burgerVendor.currentModalType);
  const ingrInModalData = useSelector(store => store.burgerVendor.ingrInModalData);
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
          * Это очень важно для компонента  BurgerConstructor, который роняет приложение при первичном рендере без fetch или без правильных пропсов после fetch

          ***Про условия отрисовки:
          Условие (!!arrOfIngridients.length) пересчитается в false как при первичном рендере до фетча, так и при .catch в fetch. Предотвращает падение приложения, если в arrOfIngridients запишутся данные неподходящего формата */}
          {!dataIsLoading && !dataHasError && !!arrOfIngridients.length && (
            <>
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
            </>
          )}
        </section>
      </main>
    </>
  );
}

export default App;
