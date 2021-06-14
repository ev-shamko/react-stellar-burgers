import React, { useEffect } from 'react';
//import logo from '../../images/logo.svg';
import indexStyles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import { IngridientsListContext } from '../../services/ingridientsContext';

// Импорт захардкоденных данных
import ORDER_DATA from '../../utils/order-data';
// import ingridientsList from '../../utils/data'; // пока не удаляю на случай падения сервера с API


// Импорты компонентов модального окна
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngridientDetais from '../ingridient-details/ingridient-details';

// временно захардкодено
const ApiUrl = "https://norma.nomoreparties.space/api/ingredients";

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
  /******      Управление модальным окном        ********* */
  /****************************************************** */

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
  // НЕ ЗАБЫТЬ СПРОСИТЬ: почему у меня тут постоянно требуют указания дефолтного значения аргумента или стейта?
  const getIngridientsData = (url = '') => {
    console.log('Отправляю запрос к API');

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

        console.log(res);

        // здесь захардкоденные данные заказа (для отладки попапа с данными заказа)
        setOrderData(ORDER_DATA);
        
        setIngridientsData(res.data); // здесь поменяется стейт после первичного рендера и вызовет второй рендер App
        setIsLoading(false); // здесь тоже поменяется стейт после первичного рендера и вызовет третий перерендер App - нужно объединить все 3 стейта в 1 объект
        setHasError(false);


      })
      .catch((err) => {

        console.log(`Error: can't fetch ingridiets data from ${url}`);
        console.log(`response from server is: `, err);
        console.log(`err.message is: `, err.message);

        setIsLoading(false);
        setHasError(true);
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
  return (
    <>
      {console.log('РЕНДЕРЮ app.jsx')}

      {/* рендеринг попапа с инфой об ингридиенте бургера */}
      {modalIsVisible && (currentModalType === 'IngridientDetails') &&
        <Modal closeModal={closeModal}>
          <IngridientDetais ingrInModalData={ingrInModalData} />
        </Modal>
      }

      {/* рендеринг попапа с деталями заказа */}
      {modalIsVisible && (currentModalType === 'OrderDetails') &&
        <Modal closeModal={closeModal}>
          <OrderDetails orderData={orderData} />
        </Modal>
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
          1) Условие ingridientsData пересчитается в false, если в результате fetch сервер вернул объект ответа без свойства res.data (т.е. оно будет undefined) - так иногда бывает со стороны https://norma.nomoreparties.space/*  - в принципе, теперь это условие можно убрать
          2) Условие (!!ingridientsData.length) пересчитается в false как при первичном рендере до фетча, так и при .catch в fetch */}
          {!isLoading && !hasError && ingridientsData && !!ingridientsData.length && (
            <>
              <IngridientsListContext.Provider value={{ ingridientsData }}>
                <BurgerIngredients openModal={openModal} />
                <BurgerConstructor allIngridients={ingridientsData} openModal={openModal} />
              </IngridientsListContext.Provider>
            </>
          )}

        </section>
      </main>
    </>
  );
}

export default App;
