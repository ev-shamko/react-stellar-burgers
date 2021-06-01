import React from "react";
import ingrStyles from "./ingridients-cardlist.module.css";
import IngridientCard from "../ingridient-card/ingrdient-card"
import ingridientsList from "../../utils/data";
import {
    Tab,

} from "@ya.praktikum/react-developer-burger-ui-components";


/*

1. Получаем ключевое слово, по которому фильтруем массив (this.props.type)
1. Или лучше получить массив

2. Отфильтровали массив с ингридиентами нужного типа

3. На основании массива черех map получили разметку и вернули ее




const keyword = "bun";


// @ts-ignore
const arrOfIngridients = ingridientsList.filter(function (obj) {
    return obj.type === keyword;
})

*/

// @ts-ignore
class CardList extends React.Component {
    render() {
        const {type} = this.props; // нельзя просто использовать this.props.type
        const arrSomeIngridients = ingridientsList.filter(function (obj) {
            return obj.type === type;
        });

        return (
            <>
                {
                    arrSomeIngridients.map((obj, index) => {
                        console.log(arrSomeIngridients);
                        return <IngridientCard image={obj.image} price={obj.price} name={obj.name} />
                    })
                }
            </>
        );
    }
}

// <CardList type="bun" />

export default CardList;