import React from "react";
import PropTypes from 'prop-types';
import cardStyles from "./ingridient-card.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, DragPreviewImage } from "react-dnd";

import { useDispatch } from 'react-redux';
import {
    OPEN_MODAL,
    SET_MODAL_TYPE,
    SET_INGRIDIENT_IN_MODAL,
    // ADD_BUN,
    // ADD_SAUCE,
    // ADD_MAIN,
} from '../../services/actions/burgerVendor';

/* <IngridientCard
        objIngridient={obj}
        key={obj._id}
    />
*/

// @ts-ignore
const IngridientCard = ({ objIngridient }) => {
    const dispatch = useDispatch();

    const [{ outline }, dragRef, dragPreviewImg] = useDrag({
        type: 'ingridient', // тут мб в будущем захочу только два типа: "bun"/"draggableIngridient"
        item: objIngridient,

        //добавляет элементу рамку, если элемент является перетаскиваемым
        // если перепесать, может иначе влиять на стили элемента, или вообще стать условием, при котором элемент отображается/пропадает (return (!isDrag && <div><div>)
        collect: (monitor) => ({
            outline: monitor.isDragging() ? '1px solid #4C4CFF' : '',
        }),
    });

    const openIngridientDetails = (event) => {
        dispatch({
            type: OPEN_MODAL,
        });
        dispatch({
            type: SET_MODAL_TYPE,
            value: 'IngridientDetails',
        });
        dispatch({
            type: SET_INGRIDIENT_IN_MODAL,
            value: objIngridient,
        });
    };

    // функция возвращает нужный экшн в зависимости от типа ингридиента
    // это нужно для добавления ингридиета в стейт
    // const getAction = (typeOfIngridient) => {
    //     if (typeOfIngridient === 'bun') {
    //         return ADD_BUN;
    //     }

    //     if (typeOfIngridient === 'sauce') {
    //         return ADD_SAUCE;
    //     }

    //     if (typeOfIngridient === 'main') {
    //         return ADD_MAIN;
    //     }
    // };

    // const addIngridientInConstructor = () => {
    //     dispatch({
    //         type: getAction(objIngridient.type), // в зависимости от типа добавляемого ингридиента сюда подставится нужный экшн
    //         value: objIngridient,
    //     })
    // };

    const handleClick = (event) => {
        openIngridientDetails(event);
        // addIngridientInConstructor();
    };

    return (
        <>
            <DragPreviewImage connect={dragPreviewImg} src={objIngridient.image} /> {/* При перетаскивании будет показываться только картинка, а не вся карточка ингридиента */}
            <div className={cardStyles.ingrCard + ' mb-8'} onClick={handleClick} ref={dragRef} style={{ outline }}>
                <img src={objIngridient.image} alt={objIngridient.name} className={cardStyles.itemPic} />
                <div className={cardStyles.price}>
                    <Counter count={1} size="default" />
                    <span className="m-2 text_type_digits-default">{objIngridient.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <h3 className="m-1 text_type_main-default">{objIngridient.name}</h3>
            </div>
        </>
    );
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

IngridientCard.propTypes = {
    objIngridient: PropTypes.shape(ingridientsInnerObjStructure.isRequired),
}

export default IngridientCard;