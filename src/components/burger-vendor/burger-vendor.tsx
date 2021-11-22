import React, { useEffect } from 'react';
import styles from './burger-vendor.module.css';

import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { appUseSelector, appUseDispatch } from '../../services/hooks';

import {
  getIngridientsData,
} from '../../services/actions/burgerVendor';

// временно захардкодено
import { urlApiGetIngridients } from '../../utils/api-url';

function BurgerVendor() {

  const dispatch = appUseDispatch();

  /******************************************************** */
  /******      Импорт стейтов из редакса        ********* */
  /****************************************************** */

  const { modalIsVisible, currentModalType, arrOfIngridients, dataIsLoading, dataHasError } = appUseSelector((store: any) => ({
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
  //@ts-ignore
  useEffect(() => dispatch(getIngridientsData(urlApiGetIngridients)), [dispatch]);


  /******************************************************** */
  /************      Рендер      ************************* */
  /****************************************************** */

  // https://www.bxnotes.ru/conspect/lib/react/react-notes/rendering/ - хорошая статья по рендерингу в реакте, надо заюзать
  // https://max-frontend.gitbook.io/redux-course-ru-v2/sozdanie/optimizatsiya-refaktoring/optimizatsiya-pererisovok - статья про оптимизацию рендера


  return (
    <>
      <section className={styles.headerSection}>
        <h1 className="text text_type_main-large">Соберите бургер</h1>
      </section>

      <section className={styles.constructorContainer}>

        {/* Здесь стоит условие: отрисовка компонентов только после успешного получения данных правильного формата
* Это очень важно для компонента  BurgerConstructor, который роняет приложение при первичном рендере без fetch или без правильного массива данных с ингридиентами

***Про условия отрисовки:
Условие (!!arrOfIngridients) пересчитается в false как при первичном рендере до фетча, так и при .catch в fetch. Предотвращает падение приложения, если arrOfIngridients === undefined, что может быть при падении сервера или изменении структуры ответа от api 
Условие (!!arrOfIngridients.length) уточняет проверку !!arrOfIngridient.  Если сервер вернёт пустой массив, мы не будем отображать компоненты конструктора бургера */}
        {!dataIsLoading && !dataHasError && !!arrOfIngridients&& !!arrOfIngridients.length && (
          <>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />{/* попап  - ingrInModalData */}
              <BurgerConstructor />{/* попап  - orderData */}
            </DndProvider>

            {/* рендер попапа с инфой об ингридиенте бургера - ingrInModalData*/}
            {/* {modalIsVisible && (currentModalType === 'IngridientDetails') &&
              <Modal>
                <IngridientDetais ingrInModalData={ingrInModalData} />
              </Modal>
            } */}

            {/* рендер попапа с деталями заказа - orderData */}
            {modalIsVisible && (currentModalType === 'OrderDetails') &&
              <Modal>
                <OrderDetails />
              </Modal>
            }
          </>
        )}
      </section>
    </>
  );
}

export default BurgerVendor;