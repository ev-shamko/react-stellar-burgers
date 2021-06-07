import React from "react";
import PropTypes from 'prop-types';
import diStyles from "./draggable-items.module.css"
//import ConstructorItem from "../constructor-item/constructor-item";
import {
    ConstructorElement,
    DragIcon 
} from "@ya.praktikum/react-developer-burger-ui-components";


// <DraggableItems arrSomeIngridients={this.state.draggableIngridients} />
// draggableIngridients д.б. массивом с ингридиентами, по сути, как исходный массив с данными, но без булок
class DraggableItemsList extends React.Component {
    render() {
        return (
            <>
                {
                    this.props.arrSomeIngridients.map((obj, index) => {
                        return (
                            <div className={diStyles.draggableItime} key={index}>
                                <button className={diStyles.draggableButton}><DragIcon /></button>
                                <ConstructorElement text={obj.name} thumbnail={obj.image} price={obj.price} />
                            </div>
                        )

                    })
                }
            </>
        )
    }
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

  DraggableItemsList.propTypes = {
    ingridients: PropTypes.arrayOf(ingridientsInnerObjStructure.isRequired) // arrayOf - массив, состоящий из типа данных, указанного в скобках: объект определённой структуры, плюс ещё и isRequired
}



{/* Раньше здесь использовался модуль ConstructorItem - он возвращал разметку перетаскиваемого ингридиента
                {
                    this.props.arrSomeIngridients.map((obj, index) => {
                        return <ConstructorItem key={index} itemName={obj.name} price={obj.price} imageLink={obj.image} />
                    })
                }
*/}

export default DraggableItemsList;