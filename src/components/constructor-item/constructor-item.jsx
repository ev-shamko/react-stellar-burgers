/* После рефакторинга этот модуль стал не нужен
Его задачи теперь выполняет DraggableItems
Пока на всякий случай не буду удалять */


import React from "react";
import ciStyles from "./constructor-item.module.css";
import {
    ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

class ConstructorItem extends React.Component {
    render() {
        return (
            <div className={ciStyles.draggableItime}>
                <button className={ciStyles.draggableButton}></button>
                <ConstructorElement text={this.props.itemName} thumbnail={this.props.imageLink} price={this.props.price} />
            </div>
        )
    }
}

export default ConstructorItem;