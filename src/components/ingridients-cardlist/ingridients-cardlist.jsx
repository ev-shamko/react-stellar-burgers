import React from "react";
import PropTypes from 'prop-types';
import { IngridientsListContext } from '../../services/ingridientsContext';

import IngridientCard from "../ingridient-card/ingrdient-card"

// *********  Как работает этот компонет:
// получаем из стейта полный список ингридиентов (массив объектов)
// на его основании рендерим новый массив по типу ингридиента, полученного в пропсе

// <CardList type={"bun"} openModal={this.props.openModal} />
const CardList = ({ type, openModal }) => {

    const { ingridientsState } = React.useContext(IngridientsListContext);

    const arrSomeIngridients = ingridientsState.ingridientsData.filter(function (obj) {
        return obj.type === type;
    });

    return (
        <>
            {
                arrSomeIngridients.map((obj, index) => {
                    return (
                        <IngridientCard
                            objIngridient={obj}
                            key={obj._id}
                            openModal={openModal}
                        />
                    )
                })
            }
        </>
    );
}

CardList.propTypes = {
    type: PropTypes.oneOf(["bun", "sauce", "main"]),
    openModal: PropTypes.func.isRequired,
};

export default CardList;