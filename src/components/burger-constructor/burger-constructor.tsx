/* eslint-disable */
import React, { useState } from "react";
import { useCallback } from "react";
import s from "./burger-constructor.module.css";
import DraggableItem from "../draggable-item/draggable-item";
import { useDrop } from "react-dnd";
import { appUseSelector, appUseDispatch } from '../../services/hooks';
import { Loader } from "../loader/loader";

import { useHistory } from 'react-router-dom';
import { TIngredientType, TIngredientObjData, TIngredientInStore, TFindIngredientInStore, TResortIngrList } from '../../utils/types';

import {
  postBurgerOrderThunk,
  ADD_BUN,
  ADD_SAUCE,
  ADD_MAIN,
  RESORT_DRAGGABLE_INGRIDIENTS,
} from '../../services/actions/burgerVendor';

import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { urlApiPostOrder } from '../../utils/api-url';

function BurgerConstructor() {
  const dispatch = appUseDispatch();
  const history = useHistory();

  // стейты с данными об ингридиентах бургера
  const { chosenBun, chosenDraggableIngr, isLoggedIn, loaderIsVisible  } = appUseSelector((store: any) => ({ // TODO: типизируем в следующем спринте
    chosenBun: store.burgerVendor.bun,
    chosenDraggableIngr: store.burgerVendor.draggableIngridients,
    isLoggedIn: store.user.isLoggedIn,
    loaderIsVisible: store.burgerVendor.constructorLoaderIsVisible,
  }));

  /******************************************************** */
  /******        DragAndDrop логика              ********* */
  /****************************************************** */

  // при метком броске карточки ингридиента добавляет ингридиент в конструктор
  function onDropHandler(objIngridient: TIngredientObjData) {
    addIngridientInConstructor(objIngridient);
  };

  type TGetActionResponse = 'ADD_BUN' | 'ADD_SAUCE' | 'ADD_MAIN' | 'error';

  // функция возвращает нужный экшн в зависимости от типа ингридиента
  // это нужно для добавления ингридиета в стейт
  const getAction = (typeOfIngridient: TIngredientType): TGetActionResponse => {
    if (typeOfIngridient === 'bun') {
      return ADD_BUN;
    }

    if (typeOfIngridient === 'sauce') {
      return ADD_SAUCE;
    }

    if (typeOfIngridient === 'main') {
      return ADD_MAIN;
    }

    return 'error';
  };

  const addIngridientInConstructor = (objIngridient: TIngredientObjData) => {
    dispatch({
      type: getAction(objIngridient.type), // в зависимости от типа добавляемого ингридиента сюда подставится нужный экшн
      value: objIngridient,
    })
  };

  const [{ background }, dropTarget] = useDrop({
    accept: "ingridient",
    drop(objIngridient: TIngredientObjData) {
      onDropHandler(objIngridient);
    },
    // когда доносим ингридиент до окна конструктора, окно подсветится градиентом
    collect: monitor => ({
      background: monitor.isOver() ? 'radial-gradient(circle, rgba(63,94,251,0.6110819327731092) 0%, rgba(252,70,107,0) 44%)' : '',
    }),
  });


  /******** DND-ресортировка выбранных ингридиентов ********/
  /***************************************************************** */

  // Реализовано по аналогии с примером из доки: 
  // https://codesandbox.io/s/github/react-dnd/react-dnd/tree/gh-pages/examples_hooks_js/04-sortable/cancel-on-drop-outside?from-embed=&file=/src/Container.jsx:121-162

  // Функция возвращает объект с данными ингридиента и с его индексом в массиве из store. Применяется для получения данных о drop-элементе и drag-элементе
  const findIngridientInStore = useCallback<TFindIngredientInStore>(
    (targetIngrID) => {
      // получаем из хранилища объект ингридиента, у которого objIngr.instanceID равен ID объекта, переданному в функцию в качестве аргумента
      const objIngrData = chosenDraggableIngr.filter((objIngr: TIngredientInStore) => objIngr.instanceID === targetIngrID)[0];
      return {
        objIngrData, // в это свойство кладём объект ингридиента из редакс-хранилища
        ingrIndexInStore: chosenDraggableIngr.indexOf(objIngrData), // сюда запишется индекс, по которому данный объект ингридиента находится в массиве chosenDraggableIngr
      };
    },
    [chosenDraggableIngr]
  );

  // Ставит драг-ингридиент перед тем ингридиентом, на который его перетащили
  const resortIngrList: TResortIngrList =
    // draggedInstanceId - укикальный ID ингридиента, который мы перетаскиваем. Является свойством объекта ингридиента.
    // droppedIndexInStore - индекс (в массиве хранилища) дроп-элемента, на который перетащили драг-элемент
    (draggedInstanceId: number, droppedIndexInStore: number) => {
      const { ingrIndexInStore } = findIngridientInStore(draggedInstanceId); // получаем порядковый id ингридиента, на который дропнули перетаскиваемый ингридиент

      dispatch({
        type: RESORT_DRAGGABLE_INGRIDIENTS,
        indexOfDraggedIngr: ingrIndexInStore,
        indexOfDroppedIngr: droppedIndexInStore,
      });
    };

  // помечаем контейнер, внутри которого может происходить ресортировка списка начинок бургера
  const [, dropResort] = useDrop(() => ({ accept: "draggableIngridient" }));

  /************************************************************************************** */
  /******   Остальная логика: стейты, подсчёты цены, отправка заказа, рендер   ********* */
  /************************************************************************************ */

  // подсчитываем стоимость всех ингридиентов, инфу берём из стейта редакса
  function getTotalPrice(): number {
    const priceOfBun = chosenBun.price * 2; // цена верхней и нижней булки
    let priceOfDraggableIngr = 0;

    // если есть ингридиенты между булками, то считаем их стоимость
    if (chosenDraggableIngr.length > 0) {
      priceOfDraggableIngr = chosenDraggableIngr.reduce(function (summ: number, ingridient: TIngredientInStore) {
        return summ + Number(ingridient.price);
      }, 0);
    }

    return priceOfBun + priceOfDraggableIngr;
  };

  // функция создаёт объект тела POST-запроса к API 
  // Его структура такая:  { "ingredients": ["609646e4dc916e00276b286e", "609646e4dc916e00276b2870"]  }  
  // Первый id в формате строки - это булка, последующие - остальные ингридиенты*/
  function createPostBody() {
    const arrWithOrderData = [];

    // добавляем id булки
    arrWithOrderData.push(chosenBun["_id"]);

    // пушим id остальных ингридиентов в массив с данными о заказе
    chosenDraggableIngr.forEach((obj: TIngredientInStore) => {
      arrWithOrderData.push(obj["_id"]);
    });

    return { "ingredients": arrWithOrderData };
  }

  const sendOrderToApi = async () => {
    // TODO: 
    // Показать лоудер -> автологин -> если норм, сделать заказ -> после ответа убрать лоудер
    if (!isLoggedIn) {
      // ! добавить заголовок авторизации в фетч
      return (history.push({ pathname: '/login' }));
    }

    return dispatch(postBurgerOrderThunk(urlApiPostOrder, createPostBody));
  };

  return (
    <section className={s.container} ref={dropTarget} style={{ background }}>
      {/* {console.log('Рендерю >>BurgerConstructor<<')} */}
      { loaderIsVisible ? <div className={s.loader}><Loader /></div> : null}


      <ul className={s.chosenIngridients + ' mb-6'}>

        {/* Верхняя булка: отрисуется, если пользователь уже выбрал булку  */}
        {(chosenBun.name) &&
          (
            <li className={s.topIngridinet}>
              <ConstructorElement type="top" isLocked={true} text={chosenBun.name + " (верх)"} thumbnail={chosenBun.image} price={chosenBun.price} />
            </li>
          )
        }

        {/* Контейнер с настраиваемыми ингридиентами: отрисуется, если что-то уже выбрано */}
        {(chosenDraggableIngr.length > 0) &&
          (
            <li className={s.draggableIngridinetContainer} ref={dropResort}>
              {chosenDraggableIngr.map((ingr: TIngredientInStore, index: number) => {
                return (
                  <DraggableItem
                    key={ingr.instanceID}
                    ingrInstanceID={ingr.instanceID}
                    ingrData={ingr}
                    ingrIndexInStoreArr={index}
                    resortIngrList={resortIngrList}
                    findIngridient={findIngridientInStore}
                  />
                )
              })
              }
            </li>
          )
        }

        {/* Нижняя булка: отрисуется, если пользователь уже выбрал булку  */}
        {(chosenBun.name) &&
          (
            <li className={s.bottomIngridinet}>
              <ConstructorElement type="bottom" isLocked={true} text={chosenBun.name + " (низ)"} thumbnail={chosenBun.image} price={chosenBun.price} />
            </li>
          )
        }

      </ul>

      <div className={s.totalBar}>
        {/* Блок со стоимостью и кнопкой заказа: Если пользователь не выбрал бургерную булку, то этот блок не будет отрисовываться */}
        {/* Если не выбран ни один ингридиент, отобразится подсказка про перетаскивание. Если не выбрана булка, появится подсказка про булку */}
        {(chosenBun.name) &&
          (
            <>
              <span className={'text text_type_digits-medium mr-10'}>{getTotalPrice()}<CurrencyIcon type={'primary'} /></span>
              <Button type="primary" size="large" onClick={sendOrderToApi}>Оформить заказ</Button>
            </>
          )
          ||
          (
            <div style={{ margin: '0 auto' }}>
              {(!chosenBun.name) && (chosenDraggableIngr.length < 1) &&
                (
                  <span className={'text text_type_main-medium mr-10'} style={{ textAlign: 'center', justifyContent: 'center', display: 'table-cell', paddingRight: '40px' }}>{/* TODO: вынести стили в module.css */}
                    Перетащите сюда ингридиенты, <br></br>которые хотите добавить в бургер
                  </span>
                )
                ||
                (
                  <span className={'text text_type_main-medium mr-10'} style={{}}>
                    Выберите булку для бургера
                  </span>
                )
              }
            </div>
          )
        }

      </div>

    </section>
  );
  // }
}

export default BurgerConstructor;