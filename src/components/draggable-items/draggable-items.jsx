import React from "react";
import diStyles from "./draggable-items.module.css"
import { ConstructorContext } from '../../services/burgerConstructorContext'

import {
    ConstructorElement,
    DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";

function DraggableItemsList() {
    const { constructorState, setConstructorState } = React.useContext(ConstructorContext);

    return (
        <>
            {
                constructorState.draggableIngridients.map((obj, index) => {

                    const deleteThisIngridient = () => {
                        // копируем данные из стейта родительского компонента в эту переменную
                        const arrOfIngridients = constructorState.draggableIngridients.slice(0);

                        // удаляем из массива ингридиент с текущим индексом
                        arrOfIngridients.splice(index, 1);

                        // записываем в стейт новый массив ингридиентов
                        return setConstructorState({ type: "update draggableIngridients", content: arrOfIngridients });;
                    }

                    return (
                        <div className={diStyles.draggableItime} key={index}>
                            <button className={diStyles.draggableButton}><DragIcon /></button>
                            <ConstructorElement text={obj.name} thumbnail={obj.image} price={obj.price} handleClose={deleteThisIngridient} />
                        </div>
                    )
                })
            }
        </>
    )
}

export default DraggableItemsList;