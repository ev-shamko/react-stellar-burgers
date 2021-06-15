import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import crStyles from "./burger-constructor.module.css";
import DraggableItems from "../draggable-items/draggable-items";

import { IngridientsListContext } from '../../services/ingridientsContext';
import {
    BurgerBunsContext,
    DraggableIngridientsContext
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
    const {bunIngridient, setBunIngridient} = React.useContext(BurgerBunsContext);
    const {draggableIngridients, setDraggableIngridients} = React.useContext(DraggableIngridientsContext);

    // setBunIngridient(ingridientsState.ingridientsData[0]);
    // console.log(
    //     'Привет из констуктора бургеров! Вот значение булок из нового стейта: ',
    //     bunIngridient
    // );

    // ******************* Захардкоденные дефолтные данные в конструкторе

    // эти ингридиенты попадут в конструктор при загрузке страницы
    const someIngridients = ingridientsState.ingridientsData.filter((obj) => {
        return obj.type === "sauce";
    });

    // стейты для булок и настраиваемых ингридиентов
    // const [bunIngridientOld, setBunIngridientOld] = React.useState(ingridientsState.ingridientsData[0]);
    // const [draggableIngridientsOld, setDraggableIngridientsOld] = React.useState(someIngridients);

    // ******************************

    // Пока что захардкодены дефолтные компоненты в конструкторе бургеров

useEffect(() => {
    setBunIngridient(ingridientsState.ingridientsData[0]);
    setDraggableIngridients(someIngridients);
    console.log(
        'Привет из констуктора бургеров! Вот значение булок и соусов из нового стейта: ',
        bunIngridient
    );
    console.log(draggableIngridients);
}, []);
    // ******************************

    function getTotalPrice() {
        const priceOfBun = bunIngridient.price * 2; // цена верхней и нижней булки
        let priceOfDraggableIngr = 0;

        // если есть ингридиенты между булками, то считаем их стоимость
        if (draggableIngridients.length > 0) {
            priceOfDraggableIngr = draggableIngridients.reduce(function (accumulator, currentValue) {
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
            {console.log('Рендерю >>BurgerConstructor<<')}

            <ul className={crStyles.chosenIngridients + ' mb-6'}>

                {/* Верхняя булка */}
                <li className={crStyles.topIngridinet}>
                    <ConstructorElement type="top" isLocked="true" text={bunIngridient.name + " (верх)"} thumbnail={bunIngridient.image} price={bunIngridient.price} />
                </li>

                {/* Контейнер с настраиваемыми ингридиентами */}
                <li className={crStyles.draggableIngridinetContainer}>
                    <DraggableItems arrSomeIngridients={draggableIngridients} />
                </li>

                {/* Нижняя булка */}
                <li className={crStyles.bottomIngridinet}>
                    <ConstructorElement type="bottom" isLocked="true" text={bunIngridient.name + " (низ)"} thumbnail={bunIngridient.image} price={bunIngridient.price} />
                </li>

            </ul>

            <div className={crStyles.totalBar}>
                <span className={'text text_type_digits-medium mr-10'}>{getTotalPrice()}<CurrencyIcon type={'primary'} /></span>
                <Button type="primary" size="large" onClick={openOrderModal}>Оформить заказ</Button>
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