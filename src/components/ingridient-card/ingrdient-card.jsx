import React from "react";
import PropTypes from 'prop-types';

import cardStyles from "./ingridient-card.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";

/* <IngridientCard
        key={obj._id}
        image={obj.image}
        price={obj.price}
        name={obj.name}
        openModal={this.props.openModal}
        />
*/

// @ts-ignore
const IngridientCard = ({ image, price, name, openModal }) => {

    const openIngridientDetails = (event) => {
        return openModal(event, 'IngridientDetails');
    };

    return (
        <div className={cardStyles.ingrCard + ' mb-8'} onClick={openIngridientDetails}>
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

IngridientCard.propTypes = {
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired
}

export default IngridientCard;