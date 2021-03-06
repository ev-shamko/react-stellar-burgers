import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { useHistory, useLocation } from 'react-router-dom';

import s from './feed-card.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TOrder, TIngredientObjData } from '../../utils/types';

import { getOrderStatus, getPrice, getCompletedIngrList, getFormattedDate } from '../../utils/utils';


import {
  OPEN_MODAL,
  SET_MODAL_TYPE,
} from '../../services/actions/burgerVendor';

import {
  SET_DETAILED_ORDER_IN_MODAL,
} from '../../services/actions/wsActions';

type TFeedCard = {
  orderData: TOrder,
  key: number,
  isPersonal: boolean,
}

export function FeedCard({ orderData, isPersonal }: TFeedCard) {

  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation();


  const allIngrCatalog = useAppSelector((state) => state.burgerVendor.ingridientsData.arrOfIngridients);

  // ***** собираем полный массив ингридиентов для подсчёта стоимости заказа

  // const fullIngrList: Array<TIngredientObjData> = [];

  // for (let ingrId of orderData.ingredients) {
  //   arrOfIngridients.forEach((ingrObj) => {
  //     if (ingrObj._id === ingrId) {
  //       fullIngrList.push(ingrObj)
  //     }
  //   })
  // }

  //******* собираем массив с данными об используемых ингридиентах
  let arrOfUsedIngr: [] | Array<TIngredientObjData> = [];
  let arrImages: Array<string> = []


  if (allIngrCatalog && orderData) {
    arrOfUsedIngr = allIngrCatalog.filter((ingr: TIngredientObjData) => orderData.ingredients.includes(ingr._id));

    arrOfUsedIngr.forEach((ingr: TIngredientObjData) => { arrImages.push(ingr.image_mobile) })
  }


  // const getPrice = (arr: Array<TIngredientObjData>) => {
  //   return arr.reduce((previousValue: number, currentValue: TIngredientObjData) => {
  //     return previousValue + currentValue.price;
  //   }, 0);
  // }

  // ******************* Для иконок ингридиентов

  const getIcons = (url: string, index: number) => {
    return (<div className={s.imgContainer} style={{ backgroundImage: `url(${url})` }} key={index}></div>)
  }

  let normalizedPics = []
  // берем массив ссылок на иконки ингридиентов
  // делаем, чтобы было не больше 5 картинок
  // и разворачиваем их в обратном порядке для облегчения рендеринга с наложением
  const formateArr = (arr: Array<string>) => {

    if (arr.length < 1) { // предохранитель, чтобы не было рендеринга undefined на некоторых этапах жизни компонента
      return [];
    }

    let normalizedArr = arr.map(i => i);

    if (normalizedArr.length > 5) {
      normalizedArr.length = 5;
    }

    normalizedArr.reverse();

    return normalizedArr;
  }

  normalizedPics = formateArr(arrImages);

  // *******************


  // *******************

  const openIngridientDetails = () => {
    dispatch({
      type: OPEN_MODAL,
    });
    dispatch({
      type: SET_MODAL_TYPE,
      value: 'OrderCard',
    });
    dispatch({
      type: SET_DETAILED_ORDER_IN_MODAL,
      orderData,
    });
  };



  const handleClick = () => {
    openIngridientDetails();

    // console.log('history.location 1', history.location )
    // console.log('location 1', location)

    // при открытии модального окна с информацией об ингридиенте в адресной строке пропишется уникальный роут ингридиента
    // history.replace({
    //   pathname: `${history.location.pathname}/${orderData._id}`,
    //   state: { background: location }, // в background записался текущий объект location, который будет использоваться в App для изменения содержимого адресной строки
    // });

    if (isPersonal) {
      history.push({
        pathname: `${history.location.pathname}/${orderData._id}`,
        state: { profileOrderModal: location }, // в background записался текущий объект location, который будет использоваться в App для изменения содержимого адресной строки
      });
    } else {
      history.push({
        pathname: `${history.location.pathname}/${orderData._id}`,
        state: { feedModal: location }, // в background записался текущий объект location, который будет использоваться в App для изменения содержимого адресной строки
      });
    }
  };

  return (
    <article className={s.main} onClick={handleClick}>
      <div className={s.plane + ' mb-6'}>
        <span className={s.number + ' text text_type_digits-default'}>#{orderData.number}</span>
        <span className={' text text_type_main-default text_color_inactive'}>{getFormattedDate(orderData.createdAt)}</span>
      </div>
      <h4 className={s.header + ' text text_type_main-medium mb-2'}>{orderData.name}</h4>
      {isPersonal ? (<span className={' text text_type_main-default text_color_inactive mb-2'}>{getOrderStatus(orderData.status)}</span>) : null}
      <div className={s.plane}>
        <div className={s.iconsContainer}>
          {normalizedPics && normalizedPics.map((url: string, index) => (getIcons(url, index)))}
        </div>

        <div className={s.price}><span className={' text text_type_digits-default mr-2'}>{getPrice(getCompletedIngrList(orderData, allIngrCatalog))}</span><CurrencyIcon type="primary" /></div>
      </div>
    </article >
  );
}
