import React from "react";
import PropTypes from 'prop-types';

import cardStyles from "./ingridient-card.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";

/* <IngridientCard
        objIngridient={obj}
        key={obj._id}
        openModal={this.props.openModal}
    />
*/

// @ts-ignore
const IngridientCard = ({ objIngridient, openModal, setConstructorState }) => {

    const openIngridientDetails = (event) => {
        return openModal(event, 'IngridientDetails', objIngridient);
    };

    const addIngridientInConstructor = () => {
        setConstructorState({type: `add ${objIngridient.type}`, content: objIngridient}); // меняем стейт редьюесорм
    }

        return (
        <div className={cardStyles.ingrCard + ' mb-8'} onClick={openIngridientDetails}>
            {/* В разметку карточки ингридиента добавлена дополнительная обёртка (div), 
            чтобы по клику на ингридиент запускалась ещё одна функция: добавление ингридиента в конструктор */}
            <div onClick={addIngridientInConstructor}>
                <img src={objIngridient.image} alt={objIngridient.name} className={cardStyles.itemPic} />
                <div className={cardStyles.price}>
                    <Counter count={1} size="default" />
                    <span className="m-2 text_type_digits-default">{objIngridient.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <h3 className="m-1 text_type_main-default">{objIngridient.name}</h3>
            </div>
        </div>
    );
}

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

IngridientCard.propTypes = {
    ingridients: PropTypes.arrayOf(ingridientsInnerObjStructure.isRequired), // arrayOf - массив, состоящий из типа данных, указанного в скобках: объект определённой структуры, плюс ещё и isRequired
    openModal: PropTypes.func.isRequired
}

export default IngridientCard;