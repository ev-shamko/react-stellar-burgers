import React, { useEffect } from 'react';
//import logo from '../../images/logo.svg';
import indexStyles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngridientDetais from '../ingridient-details/ingridient-details';

import { useSelector, useDispatch } from 'react-redux';
import {
  getIngridientsData,
} from '../../services/actions/burgerVendor';

// временно захардкодено
import { urlApiGetIngridients } from '../../utils/api-url';
// import ingridientsList from '../../utils/data'; // пока не удаляю на случай падения сервера с API

function App() {

  const dispatch = useDispatch();

  /******************************************************** */
  /******      Импорт стейтов из редакса        ********* */
  /****************************************************** */

  const { modalIsVisible, currentModalType, ingrInModalData, arrOfIngridients, dataIsLoading, dataHasError } = useSelector(store => ({
    modalIsVisible: store.burgerVendor.modalIsVisible,
    currentModalType: store.burgerVendor.currentModalType,
    ingrInModalData: store.burgerVendor.ingrInModalData,
    arrOfIngridients: store.burgerVendor.ingridientsData.arrOfIngridients,
    dataIsLoading: store.burgerVendor.ingridientsData.ingrDataIsLoading,
    dataHasError: store.burgerVendor.ingridientsData.ingrDataHasError,
  }));

  /******************************************************** */
  /******    Получение массива данных данных от API     ********* */
  /****************************************************** */

  // фетч произойдёт после первичного рендера App
  // в dispatch передана функция, что возможно благодаря thunk
  useEffect(() => dispatch(getIngridientsData(urlApiGetIngridients)), []);

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
          * Это очень важно для компонента  BurgerConstructor, который роняет приложение при первичном рендере без fetch или без правильного массива данных с ингридиентами

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
