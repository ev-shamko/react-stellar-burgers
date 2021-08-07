import React from "react";
import PropTypes from 'prop-types';
//import { IngridientsListContext } from '../../services/ingridientsContext';
import { useSelector } from 'react-redux';

import IngridientCard from "../ingridient-card/ingrdient-card"

// *********  Как работает этот компонет:
// получаем из стейта полный список ингридиентов (массив объектов)
// на его основании рендерим новый массив по типу ингридиента, полученного в пропсе

// <CardList type={"bun"} openModal={this.props.openModal} />
const CardList = ({ type }) => {

    //const { ingridientsState } = React.useContext(IngridientsListContext);
    const arrOfIngridients = useSelector(store => store.burgerVendor.ingridientsData.arrOfIngridients);
    
    // из массива всех ингридиентов выбираем ингридиенты определённого типа (например, только булки: obj.type === 'bun')
    const arrTargetedIngridients = arrOfIngridients.filter(function (obj) {
        return obj.type === type;
    });

    return (
        <>
            {
                arrTargetedIngridients.map((obj, index) => {
                    return (
                        <IngridientCard
                            objIngridient={obj}
                            key={obj._id}                            
                        />
                    )
                })
            }
        </>
    );
}

CardList.propTypes = {
    type: PropTypes.oneOf(["bun", "sauce", "main"]),
    //openModal: PropTypes.func.isRequired,
};

export default CardList;