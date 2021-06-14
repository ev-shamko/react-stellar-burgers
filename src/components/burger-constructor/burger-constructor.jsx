import React from "react";
import PropTypes from 'prop-types';
import crStyles from "./burger-constructor.module.css";
import DraggableItems from "../draggable-items/draggable-items";

import { IngridientsListContext } from '../../services/ingridientsContext';

import {
    ConstructorElement,
    Button,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

//<BurgerConstructor allIngridients={ingridientsData} openModal={openModal} />
// @ts-ignore
function BurgerConstructor({ allIngridients, openModal }) {

    const someIngridients = allIngridients.filter((obj) => {
        return obj.type === "main";
    });

    const [bunIngridient, setBunIngridient] = React.useState(someIngridients[0]);
    const [draggableIngridients, setDraggableIngridients] = React.useState(someIngridients);

    function getTotalPrice() {
        const totalPrice = bunIngridient.price * 2; // цена верхней и нижней булки
        let summOfDraggableIngr = 0;

        // если есть ингридиенты между булками, то считаем их стоимость
        if (draggableIngridients.length > 0) {
            summOfDraggableIngr = draggableIngridients.reduce(function (accumulator, currentValue) {
                return accumulator + Number(currentValue.price);
            }, 0);
        }

        return totalPrice + summOfDraggableIngr;
    };

    const openOrderModal = (event) => {
        return openModal(event, 'OrderDetails');
    };

    return (
        <section className={crStyles.container}>
            {console.log('Рендерю BurgerConstructor')}
            <ul className={crStyles.chosenIngridients + ' mb-6'}>

                <li className={crStyles.topIngridinet}>
                    <ConstructorElement type="top" isLocked="true" text={bunIngridient.name + " (верх)"} thumbnail={bunIngridient.image} price={bunIngridient.price} />
                </li>

                <li className={crStyles.draggableIngridinetContainer}>
                    <DraggableItems arrSomeIngridients={draggableIngridients} />
                </li>

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

// в этом индентификаторе записан валидатор для объектов, находящихся внутри массива allIngridients
// мы ожидаем, что массив tallIngridients будет состоять из объектов с такой структурой
const ingridientsInnerObjStructure = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
});

BurgerConstructor.propTypes = {
    allIngridients: PropTypes.arrayOf(ingridientsInnerObjStructure.isRequired), // arrayOf - массив, состоящий из типа данных, указанного в скобках: объект определённой структуры, плюс ещё и isRequired
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