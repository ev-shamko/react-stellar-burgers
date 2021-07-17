import React from "react";
import { useCallback } from 'react';
import diStyles from "./draggable-item.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from "react-dnd";
import {
    UPDATE_DRAGGABLE_INGRIDIENTS,
} from '../../services/actions/burgerVendor';
import {
    ConstructorElement,
    DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";


function DraggableItem({sortingOrderId, ingrData, indexInStateArr}) {
    const dispatch = useDispatch();

    const stateDraggableIngridients = useSelector(store => store.burgerVendor.draggableIngridients); // массив объектов  

    // setListOfIngridients(stateDraggableIngridients); // будет содержать массив объектов. Нам важно свойство ingr.sortingOrderId


    const deleteThisIngridient = () => {
        // копируем данные из стейта родительского компонента в эту переменную
        const arrOfIngrObjects = stateDraggableIngridients.slice(0);

        // удаляем из массива ингридиент с текущим индексом
        arrOfIngrObjects.splice(indexInStateArr, 1);

        // записываем в стейт новый массив ингридиентов
        dispatch({
            type: UPDATE_DRAGGABLE_INGRIDIENTS,
            value: arrOfIngrObjects,// сюда передаём новый массив
        });
    }

    return (
        <div className={diStyles.draggableItime} >
            <button className={diStyles.draggableButton}><DragIcon /></button>
            <ConstructorElement text={ingrData.name} thumbnail={ingrData.image} price={ingrData.price} handleClose={deleteThisIngridient} />
        </div>
    )
}

export default DraggableItem;

/***** Логика ресортировки ингридиентов с помощью DND  ******* */

    // объекты draggableIngridient содержат уникальный для элементов списка sortingOrderId
    // 



    // const [{ isDragging }, dragRef] = useDrag(
    //     () => ({
    //         type: 'draggableIngridient',
    //         item: { sortingOrderId, originalIndex },
    //         collect: (monitor) => ({
    //             isDragging: monitor.isDragging(),
    //         }),
    //         end: (item, monitor) => {
    //             const { sortingOrderId: droppedId, originalIndex } = item;
    //             const didDrop = monitor.didDrop();
    //             if (!didDrop) {
    //                 moveIngridient(droppedId, originalIndex);
    //             }
    //         },
    //     }),
    //     [sortingOrderId, originalIndex, moveIngridient]
    // );

    // const findIngridient = useCallback((ingrId) => {
    //     const card = listOfIngridients.filter((ingr) => `${ingr.sortingOrderId}` === ingrId)[0]; // ? ingr._id ???
    //     return {
    //         card,
    //         index: listOfIngridients.indexOf(card),
    //     };
    // }, [listOfIngridients]);

    // const originalIndex = () => {
    //     return findIngridient(sortingOrderId).index;
    // };

    // const moveIngridient = useCallback(
    //     (sortingOrderId, atIndex) => {
    //         const { index } = findIngridient(sortingOrderId);
    //         dispatch({
    //             type: REARRANGE_DRAGGABLE_INGRIDIENTS, // заменить
    //             index: index,
    //             atIndex: atIndex,
    //         });
    //     },
    //     [findIngridient, dispatch]
    // );

    // // это вроде для дропа перетаскиваемого ингридиента на любой другой ингридиент
    // const [, drop] = useDrop(
    //     () => ({
    //         accept: "draggableIngridient",
    //         canDrop: () => false,
    //         hover({ id: draggedId }) {  // не понимаю, тут заменять id на sortingOrderId?
    //             if (draggedId !== id) {
    //                 const { index: overIndex } = findIngridient(sortingOrderId);
    //                 moveIngridient(draggedId, overIndex);
    //             }
    //         },
    //     }),
    //     [findIngridient, moveIngridient]
    // );

    // const opacity = isDragging ? 0 : 1;