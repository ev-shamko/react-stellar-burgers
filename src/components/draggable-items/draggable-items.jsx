import React from "react";
import diStyles from "./draggable-items.module.css"
//import ConstructorItem from "../constructor-item/constructor-item";
import {
    ConstructorElement,
    DragIcon 
} from "@ya.praktikum/react-developer-burger-ui-components";


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
                <DragIcon />
            </>
        )
    }
}


{/* Раньше здесь использовался модуль ConstructorItem - он возвращал разметку перетаскиваемого ингридиента
                {
                    this.props.arrSomeIngridients.map((obj) => {
                        return <ConstructorItem itemName={obj.name} price={obj.price} imageLink={obj.image} />
                    })
                }
*/}

export default DraggableItemsList;