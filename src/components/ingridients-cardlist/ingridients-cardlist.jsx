import React from "react";
import ingrStyles from "./ingridients-cardlist.module.css";
import IngridientCard from "../ingridient-card/ingrdient-card"
import ingridientsList from "../../utils/data";
import {
    Tab,

} from "@ya.praktikum/react-developer-burger-ui-components";

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