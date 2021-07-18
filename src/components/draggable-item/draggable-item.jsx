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


function DraggableItem({ sequenceId, ingrData, indexInStateArr, resortIngr, findIngridient }) {
    const dispatch = useDispatch();

    const stateDraggableIngridients = useSelector(store => store.burgerVendor.draggableIngridients); // массив объектов  

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


    /******* DND-ресортировка *******/
    // остальная логика в компоненте burger-constructor, т.к. там рендерится контейнер, внутри которого совершаем перетаскивание

    // помечаем элементы ингридиентов как цель драга
    const [{ isDragging }, dragItem, draggedPreview] = useDrag(
        () => ({
            type: "draggableIngridient",
            item: { sequenceId, indexInStateArr }, // в доке indexInStateArr находят через findIngridient(), но можно и из пропсов брать
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
            end: (item, monitor) => {
                const { sequenceId: droppedOnId, originalIndex } = item;
                const didDrop = monitor.didDrop();
                if (!didDrop) {
                    resortIngr(droppedOnId, originalIndex);
                }
            },
        }),
        [sequenceId, indexInStateArr, resortIngr]
    );

    // дополнительно помечаем все перетаскиваемые ингридиенты ещё и как цель дропа
    const [, targetOfDrop] = useDrop(
        () => ({
            accept: "draggableIngridient",
            canDrop: () => false,
            hover({ sequenceId: draggedId }) {
                if (draggedId !== sequenceId) {
                    const { indexInStore: indexOfDraggedItem } = findIngridient(sequenceId);
                    resortIngr(draggedId, indexOfDraggedItem);
                }
            },
        }),
        [findIngridient, resortIngr]
    );

    const opacity = isDragging ? 0 : 1;

    //ref={(node) => dropItem(preview(node))} - напоминаю себе, что такой записью мы передаём в реф 2 функции: dropItem, preview, и обе получают необходимый им аргумент node. Соответственно, один и тот же элемент используется и как превью в процессе перетаскивания и как цель для дропа.

    return (
        <div className={diStyles.draggableItime} ref={(node) => targetOfDrop(draggedPreview(node))} style={{ opacity }}>
            <button ref={dragItem} className={diStyles.draggableButton}>
                <DragIcon />
            </button>
            <ConstructorElement text={ingrData.name} thumbnail={ingrData.image} price={ingrData.price} handleClose={deleteThisIngridient} />
        </div>
    )
}

export default DraggableItem;