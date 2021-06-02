import React from "react";
import crStyles from "./burger-constructor.module.css";
import IngridientCard from "../ingridient-card/ingrdient-card";
import CardList from "../ingridients-cardlist/ingridients-cardlist";
import ingridientsList from "../../utils/data";
import {
    ConstructorElement,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";


// @ts-ignore
class BurgerConstructor extends React.Component {
    render() {
        return (
            <section className={crStyles.container}>
                <ConstructorElement type="top" isLocked="true" text="Краторная булка N-200i (верх)" thumbnail="https://code.s3.yandex.net/react/code/bun-02.png" price="200" />

                <ConstructorElement text="Соус традиционный галактический" thumbnail="https://code.s3.yandex.net/react/code/sauce-03.png" price="200" />
                <ConstructorElement text="Биокотлета из марсианской Магнолии" thumbnail="https://code.s3.yandex.net/react/code/meat-01.png" price="200" />
                <ConstructorElement text="Хрустящие минеральные кольца" thumbnail="https://code.s3.yandex.net/react/code/mineral_rings.png" price="200" />
                <ConstructorElement text="Хрустящие минеральные кольца" thumbnail="https://code.s3.yandex.net/react/code/mineral_rings.png" price="200" />
                <ConstructorElement text="Хрустящие минеральные кольца" thumbnail="https://code.s3.yandex.net/react/code/mineral_rings.png" price="200" />

                <ConstructorElement type="bottom" isLocked="true" text="Краторная булка N-200i (низ)" thumbnail="https://code.s3.yandex.net/react/code/bun-02.png" price="200" />

                <div><Button type="primary" size="large">Оформить заказ</Button></div>
            </section>
        );
    }
}

export default BurgerConstructor;