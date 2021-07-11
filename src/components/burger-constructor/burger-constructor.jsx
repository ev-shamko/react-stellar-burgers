import React from "react";
import PropTypes from 'prop-types';
import crStyles from "./burger-constructor.module.css";
import DraggableItems from "../draggable-items/draggable-items";

import { useDispatch, useSelector } from 'react-redux';
import {
    SET_ORDER_STATE,
    OPEN_MODAL,
    SET_MODAL_TYPE,
    REMOVE_ALL_INGRIDIENTS,
} from '../../services/actions/burgerVendor';

import {
    ConstructorElement,
    Button,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

// @ts-ignore
function BurgerConstructor() {
    const dispatch = useDispatch();
    const chosenBun = useSelector(store => store.burgerVendor.bun); // объект с данными о булке, выбранной пользователем
    const chosenDraggableIngr = useSelector(store => store.burgerVendor.draggableIngridients); // массив объектов с данными об ингридиентах, которые выбрал пользователь

    // ******************************

    function getTotalPrice() {
        const priceOfBun = chosenBun.price * 2; // цена верхней и нижней булки
        let priceOfDraggableIngr = 0;

        // если есть ингридиенты между булками, то считаем их стоимость
        if (chosenDraggableIngr.length > 0) {
            priceOfDraggableIngr = chosenDraggableIngr.reduce(function (accumulator, currentValue) {
                return accumulator + Number(currentValue.price);
            }, 0);
        }

        return priceOfBun + priceOfDraggableIngr;
    };

    // функция создаёт объект тела POST-запроса к API 
    /* Его структура такая:  { "ingredients": ["609646e4dc916e00276b286e", "609646e4dc916e00276b2870"]  }  Первый id в формате строки - это булка, полседующие - остальные ингридиенты*/
    function createPostBody() {
        const arrWithOrderData = [];

        // добавляем id булки
        arrWithOrderData.push(chosenBun["_id"]);

        // пушим id остальных ингридиентов в массив с данными о заказе
        chosenDraggableIngr.forEach((obj) => {
            arrWithOrderData.push(obj["_id"]);
        });

        return { "ingredients": arrWithOrderData };
    }

    const postBurgerOrder = (event) => {

        // TODO: использовать константу из utils
        const POST_URL = 'https://norma.nomoreparties.space/api/orders'

        fetch(POST_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(createPostBody())
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .then((res) => {
                console.log('in fetch: Получен номер заказа', res.order.number);
                // сохраняем объект ответа от сервера с инфой о заказе в редакс-хранилище
                dispatch({
                    type: SET_ORDER_STATE,
                    value: res,
                });
            })
            .then(() => {
                dispatch({
                    type: OPEN_MODAL,
                });
                dispatch({
                    type: SET_MODAL_TYPE,
                    value: 'OrderDetails',
                });

                dispatch({
                    type: REMOVE_ALL_INGRIDIENTS,
                });
            })
            .catch((err) => {
                console.log(`Error: some error ocured during posting order`);
                console.log(`response from server is: `, err);
            });
    }

    const sendOrderToApi = (event) => {        
        return postBurgerOrder(event);
    };

    return (
        <section className={crStyles.container}>
            {/* {console.log('Рендерю >>BurgerConstructor<<')} */}

            <ul className={crStyles.chosenIngridients + ' mb-6'}>

                {/* Верхняя булка: отрисуется, если пользователь уже выбрал булку  */}
                {(chosenBun.name) &&
                    (
                        <li className={crStyles.topIngridinet}>
                            <ConstructorElement type="top" isLocked="true" text={chosenBun.name + " (верх)"} thumbnail={chosenBun.image} price={chosenBun.price} />
                        </li>
                    )
                }

                {/* Контейнер с настраиваемыми ингридиентами: отрисуется, если что-то уже выбрано */}
                {(chosenDraggableIngr.length > 0) &&
                    (
                        <li className={crStyles.draggableIngridinetContainer}>
                            <DraggableItems />
                        </li>
                    )
                }

                {/* Нижняя булка: отрисуется, если пользователь уже выбрал булку  */}
                {(chosenBun.name) &&
                    (
                        <li className={crStyles.bottomIngridinet}>
                            <ConstructorElement type="bottom" isLocked="true" text={chosenBun.name + " (низ)"} thumbnail={chosenBun.image} price={chosenBun.price} />
                        </li>
                    )
                }

            </ul>

            <div className={crStyles.totalBar}>
                {/* Блок со стоимостью и кнопкой заказа: Если пользователь не выбрал бургерную булку, то этот блок не будет отрисовываться */}
                {(chosenBun.name) &&
                    (
                        <>
                            <span className={'text text_type_digits-medium mr-10'}>{getTotalPrice()}<CurrencyIcon type={'primary'} /></span>
                            <Button type="primary" size="large" onClick={sendOrderToApi}>Оформить заказ</Button>
                        </>
                    )
                    ||
                    (
                        <span className={'text text_type_main-medium mr-10'}>Выберите булку для бургера</span>
                    )
                }
            </div>

        </section>
    );
    // }
}

// BurgerConstructor.propTypes = {
//     openModal: PropTypes.func.isRequired
// }

export default BurgerConstructor;