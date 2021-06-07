import React from "react";
import PropTypes from 'prop-types';
import crStyles from "./burger-constructor.module.css";
import DraggableItems from "../draggable-items/draggable-items";
import {
    ConstructorElement,
    Button,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

// @ts-ignore
class BurgerConstructor extends React.Component {

    constructor(props) {
        super(props);

        // пока что захардодено
        // создаём массив с ингридиентами, которые будут находиться между верхней и нижней булкой. Из этого массива нагененрируем ингридиенты для конструктора
        this.someIngridients = this.props.allIngridients.filter((obj) => {
            return obj.type === "main";
        })

        this.state = {
            //пока что захардкодено
            bunIngridient: this.props.allIngridients[0],
            draggableIngridients: this.someIngridients,
        }
    }

    getTotalPrice() {
        let totalPrice = this.state.bunIngridient.price * 2; // цена верхней и нижней булки
        let summOfDraggableIngr = 0;

        // если есть ингридиенты между булками, то считаем их стоимость
        if (this.state.draggableIngridients.length > 0) {
            summOfDraggableIngr = this.state.draggableIngridients.reduce(function (accumulator, currentValue) {
                return accumulator + Number(currentValue.price);
            }, 0);
        }

        return totalPrice + summOfDraggableIngr;
    }

    render() {
        return (
            <section className={crStyles.container}>
                <ul className={crStyles.chosenIngridients + ' mb-6'}>

                    <li className={crStyles.topIngridinet}>
                        <ConstructorElement type="top" isLocked="true" text={this.state.bunIngridient.name + " (верх)"} thumbnail={this.state.bunIngridient.image} price={this.state.bunIngridient.price} />
                    </li>

                    <li className={crStyles.draggableIngridinetContainer}>
                        <DraggableItems arrSomeIngridients={this.state.draggableIngridients} />
                    </li>

                    <li className={crStyles.bottomIngridinet}>
                        <ConstructorElement type="bottom" isLocked="true" text={this.state.bunIngridient.name + " (низ)"} thumbnail={this.state.bunIngridient.image} price={this.state.bunIngridient.price} />
                    </li>
                </ul>
                <div className={crStyles.totalBar}>
                    <span className={'text text_type_digits-medium mr-10'}>{this.getTotalPrice()}<CurrencyIcon type={'primary'} /></span>
                    <Button type="primary" size="large">Оформить заказ</Button>
                </div>
            </section>
        );
    }
}

export default BurgerConstructor;