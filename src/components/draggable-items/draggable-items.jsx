import React from "react";
import diStyles from "./draggable-items.module.css"
import { ConstructorContext } from '../../services/burgerConstructorContext'
import actionTypes from '../../utils/actionTypes';


import { useDispatch, useSelector } from 'react-redux';
import {
    UPDATE_DRAGGABLE_INGRIDIENTS,
} from '../../services/actions/burgerVendor';


import {
    ConstructorElement,
    DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";

function DraggableItemsList() {
    const dispatch = useDispatch();
    const stateOfDraggableIngridients = useSelector(store => store.burgerVendor.draggableIngridients);  

    const { constructorState, setConstructorState } = React.useContext(ConstructorContext);

    return (
        <>
            {
                stateOfDraggableIngridients.map((obj, index) => {

                    const deleteThisIngridient = () => {
                        // копируем данные из стейта родительского компонента в эту переменную
                        // const arrOfIngridients = constructorState.draggableIngridients.slice(0);
                        const reduxArrOfDraggableIngridient = stateOfDraggableIngridients.slice(0);

                        // удаляем из массива ингридиент с текущим индексом
                        // arrOfIngridients.splice(index, 1);
                        reduxArrOfDraggableIngridient.splice(index, 1);

                        // записываем в стейт новый массив ингридиентов

                        dispatch({
                            type: UPDATE_DRAGGABLE_INGRIDIENTS,
                            value: reduxArrOfDraggableIngridient,// здесь нужен новый массив
                        });

                        // return setConstructorState({ type: actionTypes.UPDATE_DRAGGABLE_INGRIDIENTS, content: arrOfIngridients });;
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