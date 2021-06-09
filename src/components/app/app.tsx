import React, { useEffect } from 'react';
//import logo from '../../images/logo.svg';
import indexStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import ORDER_DATA from '../../utils/order-data';
// import ingridientsList from '../../utils/data';

import Modal from '../modal/modal';

// временно захардкодено
const ApiUrl = "https://norma.nomoreparties.space/api/ingredients ";


function App() {

  const [ingridientsData, setIngridientsData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  // по-хорошему, перенести бы эти стейты в Modal, чтобы все приложение не перерендеривалось
  const [modalIsVisible, setModalVisibility] = React.useState(false);
  const [currentModalType, setCurrentModalType] = React.useState('none');
  const [orderData, setOrderData] = React.useState({});
  const [ingrInModalData, setIngrInModalData] = React.useState({});

  /******************************************************** */
  /******      Управление модальным окном           ********* */

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
    setIngrInModalData(objIngridient);
  }


  /******************************************************** */
  /******      Получение данных от API           ********* */

  // функция для получения массива данных от API
  const getIngridientsData = () => {
    console.log('Отправляю запрос к API');

    fetch(ApiUrl)
      .then((res) => res.json())
      .then((res) => {

        // setIngridientsData(res.data); // здесь поменяется стейт
        // setIsLoading(false); // здесь тоже поменяется стейт
        // setHasError(false);

        (() => {
          setIngridientsData(res.data); // здесь поменяется стейт
          setIsLoading(false); // здесь тоже поменяется стейт
          setHasError(false);
        })();

        // здесь захардкоденные данные заказа (для отладки попапа с данными заказа)
        setOrderData(ORDER_DATA);

        /* // это для отладки: иногда в объекте ответа может приходить ошибка или не то что нужно
        console.log('res ', res);
        console.log('res.data', res.data);
        console.log(`ingridientsData`, ingridientsData);
        console.log(`!!ingridientsData`, !!ingridientsData);
        */
      })
      .catch((err) => {

        console.log(`Error: can't fetch ingridiets data from ${ApiUrl}`);
        console.log(`err.message is: `, err.message);

        setIsLoading(false);
        setHasError(true);

        console.log(`ingridientsData`, ingridientsData);
      });
  }

  // фетч к API за массивом данных после первичного рендера
  useEffect(() => getIngridientsData(), []);


  /******************************************************** */
  /************      Рендер      ************** */

  return (
    <>
    {console.log('РЕНДЕРЮ app.jsx')}
      { modalIsVisible &&
        <Modal
          closeModal={closeModal}
          typeOfModal={currentModalType}
          orderData={orderData}
          ingrInModalData={ingrInModalData}
        />
      }
      <AppHeader />
      <main className={indexStyles.main}>

        <section className={indexStyles.headerSection}>
          <h1 className="text text_type_main-large">Соберите бургер</h1>
        </section>

        {/** Ради пиксельпёрфекта секция ниже - это флекс-контейнер,
         * растущий слева направо. Он выходит за правую границу родительского <main>.
         */}
        <section className={indexStyles.constructorContainer}>

          {/* Здесь стоит условие: отрисовка компонентов только после успешного получения данных правильного формата
          * Это очень важно непосредственно для компонента  BurgerConstructor, который роняет приложение при первичном рендере без fetch или без правильных пропсов после fetch

          ***Про условия отрисовки:
          1) Условие ingridientsData пересчитается в false, если в результате fetch сервер вернул объект ответа без свойства res.data (т.е. оно будет undefined) - так иногда бывает со стороны https://norma.nomoreparties.space/*
          2) Условие (!!ingridientsData.length) пересчитается в false как при первичном рендере до фетча, так и при .catch в fetch */}
          {!isLoading && !hasError && ingridientsData && !!ingridientsData.length && (
            <>
              <BurgerIngredients allIngridients={ingridientsData} openModal={openModal} />
              <BurgerConstructor allIngridients={ingridientsData} openModal={openModal} />
            </>
          )}

        </section>

      </main>
    </>
  );
}

export default App;
