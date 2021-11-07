import React from "react";
import diStyles from "./draggable-item.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import {
    UPDATE_DRAGGABLE_INGRIDIENTS,
} from '../../services/actions/burgerVendor';
import {
    ConstructorElement,
    DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";

import { TIngridientType, TIngridientObjData, TIngridientInStore, TFindIngridientInStore, TResortIngrList } from '../../utils/types';
import { AllByAttribute } from "@testing-library/dom";


type TDraggableItemProps = {
    ingrInstanceID: number,
    ingrData: TIngridientObjData,
    ingrIndexInStoreArr: number,
    resortIngrList: TResortIngrList,
    findIngridient: TFindIngridientInStore,
}


const DraggableItem: React.FC<TDraggableItemProps> = ({ ingrInstanceID, ingrData, ingrIndexInStoreArr, resortIngrList, findIngridient }) => {
    const dispatch = useDispatch();

    const stateDraggableIngridients = useSelector((store: any) => store.burgerVendor.draggableIngridients); // массив объектов  

    const deleteThisIngridient = () => {
        // копируем данные из стейта родительского компонента в эту переменную
        const arrOfIngrObjects = stateDraggableIngridients.slice(0);

        // удаляем из массива ингридиент с текущим индексом
        arrOfIngrObjects.splice(ingrIndexInStoreArr, 1);

        // записываем в стейт новый массив ингридиентов
        dispatch({
            type: UPDATE_DRAGGABLE_INGRIDIENTS,
            value: arrOfIngrObjects,// сюда передаём новый массив
        });
    }


    /******* DND-ресортировка *******/
    // остальная логика этой ресортировки в компоненте burger-constructor, т.к. там рендерится контейнер, внутри которого совершаем перетаскивание

    // для перетаскиваемых элементов:
    const [{ isDragging }, dragItem, draggedPreview] = useDrag(
        () => ({
            type: "draggableIngridient",
            item: { ingrInstanceID, ingrIndexInStoreArr },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
            end: (item, monitor) => {
                const didDrop = monitor.didDrop();
                // если не дропнули элемент где положено, то отменяем ресортировку и возвращаем как было. Для этого передаём в resortIngrList() не droppedIndexInStore, а как бы draggedIndexInStore
                if (!didDrop) {
                    resortIngrList(item.ingrInstanceID, item.ingrIndexInStoreArr); // используем данные из объекта item не смотря на то, что в принципе можно взять эти же переменные из замыкания. Не будем извращаться над логикой библиотеки
                }
            },
        }),
        [ingrInstanceID, ingrIndexInStoreArr, resortIngrList]
    );

    // дополнительно помечаем все перетаскиваемые ингридиенты ещё и как цель дропа
    const [, targetOfDrop] = useDrop(
        // @ts-ignore: god no please no
        () => ({
            accept: "draggableIngridient",
            canDrop: () => false,
            hover({ ingrInstanceID: draggedInstanceId }) { // при включенной проверке типов вот здесь всё ломается. Но не переименовать переменную нельзя. Что с этим делать - я хз. пше Проще всего переписать всю логику по образцу из документации для тайпскрипта, но это всё-равно займёт много времени
                if (draggedInstanceId !== ingrInstanceID) {
                    const { ingrIndexInStore: droppedIndexInStore } = findIngridient(ingrInstanceID); // получаем индекс драг-элемента, на который перетащили дроп-элемент
                    resortIngrList(draggedInstanceId, droppedIndexInStore);
                }
            },
        }),
        [findIngridient, resortIngrList]
    );

    const opacity = isDragging ? 0 : 1;

    //ref={(node) => dropItem(preview(node))} - напоминаю себе, что такой записью мы передаём в реф 2 функции: dropItem, preview, и обе получают необходимый им аргумент node. Соответственно, один и тот же элемент используется и как превью в процессе перетаскивания и как цель для дропа.

    return (

        <div className={diStyles.draggableItime} ref={(node) => targetOfDrop(draggedPreview(node))} style={{ opacity }}>
            <button ref={dragItem} className={diStyles.draggableButton}>
                <DragIcon type="primary" />
            </button>
            <ConstructorElement text={ingrData.name} thumbnail={ingrData.image} price={ingrData.price} handleClose={deleteThisIngridient} />
        </div>
    )
}

export default DraggableItem;