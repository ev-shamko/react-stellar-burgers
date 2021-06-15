import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import crStyles from "./burger-constructor.module.css";
import DraggableItems from "../draggable-items/draggable-items";

import { IngridientsListContext } from '../../services/ingridientsContext';
import {
    ConstructorContext
} from '../../services/burgerConstructorContext';

import {
    ConstructorElement,
    Button,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

//<BurgerConstructor openModal={openModal} />
// @ts-ignore
function BurgerConstructor({ openModal }) {

    const { ingridientsState } = React.useContext(IngridientsListContext);
    const { constructorState, setConstructorState } = React.useContext(ConstructorContext);


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

    const openOrderModal = (event) => {
        return openModal(event, 'OrderDetails');
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
                            <DraggableItems arrSomeIngridients={constructorState.draggableIngridients} />
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
                            <Button type="primary" size="large" onClick={openOrderModal}>Оформить заказ</Button>
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

/*  Пример объекта, содержащегося в массиве с ингридиентами allIngridients :
{
    "_id": "60666c42cc7b410027a1a9b1",
    "name": "Краторная булка N-200i",
    "type": "bun",
    "proteins": 80,
    "fat": 24,
    "carbohydrates": 53,
    "calories": 420,
    "price": 1255,
    "image": "https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v": 0
}*/

export default BurgerConstructor;