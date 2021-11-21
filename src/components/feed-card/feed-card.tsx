import React from 'react';
import { useSelector } from 'react-redux';
import s from './feed-card.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TOrder, TIngredientObjData } from '../../utils/types';

type TFeedCard = {
  orderData: TOrder,
  key: number,
}

export function FeedCard({ orderData }: TFeedCard) {

  const ingrData = useSelector((state: any) => state.burgerVendor.ingridientsData.arrOfIngridients);

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

  const getIcons = (url: string) => {
    return (<div className={s.imgContainer} style={{ backgroundImage: `url(${url})` }}></div>)
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

  return (
    <article className={s.main}>
      <div className={s.plane + ' mb-6'}>
        <span className={s.number + ' text text_type_digits-default'}>#{orderData.number}</span>
        <span className={' text text_type_main-default text_color_inactive'}>сегодня, {getTime(orderData.createdAt)}</span>
      </div>
      <h4 className={s.header + ' text text_type_main-medium mb-2'}>{orderData.name}</h4>

      <div className={s.plane}>
        <div className={s.iconsContainer}>
          {/* {normalizedPics.map((img: string) => (getIcons(img)))} */}
        </div>

        <div className={s.price}><span className={' text text_type_digits-default mr-2'}>{getPrice(arrOfUsedIngr)}</span><CurrencyIcon type="primary" /></div>
      </div>
    </article >
  );
}
