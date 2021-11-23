import React from 'react';
import { appUseSelector, appUseDispatch } from '../../services/hooks';
import { useHistory, useLocation } from 'react-router-dom';

import s from './feed-card.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TOrder, TIngredientObjData } from '../../utils/types';


import {
  OPEN_MODAL,
  SET_MODAL_TYPE,
  // SET_INGRIDIENT_IN_MODAL, // заменить на подстановку данных о заказе
} from '../../services/actions/burgerVendor';

type TFeedCard = {
  orderData: TOrder,
  key: number,
  isPersonal: boolean,
}

export function FeedCard({ orderData, isPersonal }: TFeedCard) {

  const dispatch = appUseDispatch();
  const history = useHistory();
  const location = useLocation();


  const ingrData = appUseSelector((state) => state.burgerVendor.ingridientsData.arrOfIngridients);


  // собираем массив с данными об используемых ингридиентах
  let arrOfUsedIngr: [] | Array<TIngredientObjData> = [];
  let arrImages: Array<string> = []

  if (ingrData && orderData) {
    arrOfUsedIngr = ingrData.filter((ingr: TIngredientObjData) => orderData.ingredients.includes(ingr._id));

    arrOfUsedIngr.forEach((ingr: TIngredientObjData) => { arrImages.push(ingr.image_mobile) })
  }


  const getTime = (createdAt: string) => {
    const parseDate = new Date(Date.parse(createdAt));

    const options: any = { hour: 'numeric', minute: 'numeric', timeZoneName: 'short' };
    const formatedTime = new Intl.DateTimeFormat('ru-RU', options).format(parseDate);

    return formatedTime;
  }

  const getPrice = (arr: Array<TIngredientObjData>) => {
    return arr.reduce((previousValue: number, currentValue: TIngredientObjData) => {
      return previousValue + currentValue.price;
    }, 0);
  }

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

    let normalizerArr = arr.map(i => i);

    if (normalizerArr.length > 5) {
      normalizerArr.length = 5;
    }

    normalizerArr.reverse();

    return normalizerArr;
  }

  normalizedPics = formateArr(arrImages);

  // *******************

  const getStatus = (): string => {
    switch (orderData.status) {
      case ('done'): {
        return 'Выполнен';
      }
      case ('pending'): {
        return 'Готовится';
      }
      default: return 'Отменён'
    }
  }

  // *******************

  const openIngridientDetails = () => {
    dispatch({
      type: OPEN_MODAL,
    });
    dispatch({
      type: SET_MODAL_TYPE,
      value: 'OrderCard',
    });
    // dispatch({
    //   type: SET_INGRIDIENT_IN_MODAL,
    //   value: objIngridient,
    // });

    console.log(orderData);
  };



  const handleClick = () => {
    openIngridientDetails();

    // console.log('history.location 1', history.location )
    // console.log('location 1', location)

    // при открытии модального окна с информацией об ингридиенте в адресной строке пропишется уникальный роут ингридиента
      history.replace({
        pathname: `${history.location.pathname}/${orderData._id}`,
        state: { background: location }, // в background записался текущий объект location, который будет использоваться в App для изменения содержимого адресной строки
      });


    };

  return (
    <article className={s.main} onClick={handleClick}>
      <div className={s.plane + ' mb-6'}>
        <span className={s.number + ' text text_type_digits-default'}>#{orderData.number}</span>
        <span className={' text text_type_main-default text_color_inactive'}>сегодня, {getTime(orderData.createdAt)}</span>
      </div>
      <h4 className={s.header + ' text text_type_main-medium mb-2'}>{orderData.name}</h4>
      {isPersonal ? (<span className={' text text_type_main-default text_color_inactive mb-2'}>{getStatus()}</span>) : null}
      <div className={s.plane}>
        <div className={s.iconsContainer}>
          {normalizedPics && normalizedPics.map((url: string, index) => (getIcons(url, index)))}
        </div>

        <div className={s.price}><span className={' text text_type_digits-default mr-2'}>{getPrice(arrOfUsedIngr)}</span><CurrencyIcon type="primary" /></div>
      </div>
    </article >
  );
}
