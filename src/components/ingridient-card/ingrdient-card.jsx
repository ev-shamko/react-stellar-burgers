import React from "react";
import cardStyles from "./ingridient-card.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";

// @ts-ignore
const IngridientCard = ({image, price, name}) => {
        return (
            <div className={cardStyles.ingrCard + ' mb-8'}>
                <img src={image} alt={name} className={cardStyles.itemPic} />
                <div className={cardStyles.price}>
                    <Counter count={1} size="default" />
                    <span className="m-2 text_type_digits-default">{price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <h3 className="m-1 text_type_main-default">{name}</h3>
            </div>
        );
    }

// вызываем так:
// <IngridientCard image={ingridientsList[0].image} price={ingridientsList[0].price} name={ingridientsList[0].name}

export default IngridientCard;