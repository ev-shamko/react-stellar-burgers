import React from "react";
import PropTypes from 'prop-types';
import crStyles from "./burger-constructor.module.css";
import DraggableItems from "../draggable-items/draggable-items";
import actionTypes from '../../utils/actionTypes';

import { OrderStateContext } from '../../services/orderStateContext';
import { ConstructorContext } from '../../services/burgerConstructorContext';

import {
    ConstructorElement,
    Button,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

//<BurgerConstructor openModal={openModal} />
// @ts-ignore
function BurgerConstructor({ openModal }) {

    const { constructorState, setConstructorState } = React.useContext(ConstructorContext);
    const { setOrderState } = React.useContext(OrderStateContext);

    /*{
    bun: {},
    draggableIngridients: [{}, {}]
  };
  */

    // ******** Можно включить захардкодены дефолтные компоненты в конструкторе бургеров

    // useEffect(() => {
    // для отладки проставляем дефолтные ингридиенты в конструкторе
    // setConstructorState({ type: 'add sauce', content: ingridientsState.ingridientsData[3] });
    // setConstructorState({ type: 'add bun', content: ingridientsState.ingridientsData[0] });
    // }, []);

    // ******************************

    function getTotalPrice() {
        const priceOfBun = constructorState.bun.price * 2; // цена верхней и нижней булки
        let priceOfDraggableIngr = 0;

        // если есть ингридиенты между булками, то считаем их стоимость
        if (constructorState.draggableIngridients.length > 0) {
            priceOfDraggableIngr = constructorState.draggableIngridients.reduce(function (accumulator, currentValue) {
                return accumulator + Number(currentValue.price);
            }, 0);
        }

        return priceOfBun + priceOfDraggableIngr;
    };



    // функция создаёт объект тела POST-запроса к API 
    /* Его структура такая:  { "ingredients": ["609646e4dc916e00276b286e", "609646e4dc916e00276b2870"]  }  */
    function createPostBody() {
        const arrForOrder = [];

        // добавляем id булки
        arrForOrder.push(constructorState.bun["_id"]);

        // добавляем id остальных ингридиентов
        constructorState.draggableIngridients.map((obj) => {
            arrForOrder.push(obj["_id"]);
            return true;
        });

        const bodyOfPost = { "ingredients": arrForOrder };
        return bodyOfPost;
    }

    const postBurgerOrder = (event) => {

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
                setOrderState(res); // записываем в стейт объект ответа от сервера
            })
            .then(() => {
                openModal(event, 'OrderDetails'); 
                setConstructorState({ type: actionTypes.REMOVE_ALL_INGRIDIENTS });
            })
            .catch((err) => {
                console.log(`Error: some error ocured during posting order`);
                console.log(`response from server is: `, err);
            });
    }

    const sendOrderToApi = (event) => {
        postBurgerOrder(event)
        return true;
    };

    return (
        <section className={crStyles.container}>
            {/* {console.log('Рендерю >>BurgerConstructor<<')} */}

            <ul className={crStyles.chosenIngridients + ' mb-6'}>

                {/* Верхняя булка: отрисуется, если пользователь уже выбрал булку  */}
                {(constructorState.bun.name) &&
                    (
                        <li className={crStyles.topIngridinet}>
                            <ConstructorElement type="top" isLocked="true" text={constructorState.bun.name + " (верх)"} thumbnail={constructorState.bun.image} price={constructorState.bun.price} />
                        </li>
                    )
                }

                {/* Контейнер с настраиваемыми ингридиентами: отрисуется, если что-то уже выбрано */}
                {(constructorState.draggableIngridients.length > 0) &&
                    (
                        <li className={crStyles.draggableIngridinetContainer}>
                            <DraggableItems />
                        </li>
                    )
                }

                {/* Нижняя булка: отрисуется, если пользователь уже выбрал булку  */}
                {(constructorState.bun.name) &&
                    (
                        <li className={crStyles.bottomIngridinet}>
                            <ConstructorElement type="bottom" isLocked="true" text={constructorState.bun.name + " (низ)"} thumbnail={constructorState.bun.image} price={constructorState.bun.price} />
                        </li>
                    )
                }

            </ul>

            <div className={crStyles.totalBar}>
                {/* Если пользователь не выбрал бургерную булку, то не будет отрисовываться поле с общей стоимостью и кнопка заказа */}
                {(constructorState.bun.name) &&
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

BurgerConstructor.propTypes = {
    openModal: PropTypes.func.isRequired
}

export default BurgerConstructor;