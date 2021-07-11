import React from "react";
import PropTypes from 'prop-types';
import {
    ConstructorContext
} from '../../services/burgerConstructorContext';

import cardStyles from "./ingridient-card.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";

import { useDispatch } from 'react-redux';
import {
    OPEN_MODAL,
    SET_MODAL_TYPE,
    SET_INGRIDIENT_IN_MODAL,
    ADD_BUN,
    ADD_SAUCE, // прямо сейчас я не вызываю эти переменные, а сразу генерирую строку. Нипарядок!
    ADD_MAIN,
} from '../../services/actions/burgerVendor';

/* <IngridientCard
        objIngridient={obj}
        key={obj._id}
        openModal={this.props.openModal}
    />
*/

// @ts-ignore
const IngridientCard = ({ objIngridient }) => {
    const dispatch = useDispatch();

    // const { setConstructorState } = React.useContext(ConstructorContext);

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
        //return openModal(event, 'IngridientDetails', objIngridient);
    };

    // с action.type получилось изящно, я молодец
    const addIngridientInConstructor = () => {
        // отсюда потом удалить управление старым стейтом
        // setConstructorState({ type: `ADD_${objIngridient.type.toUpperCase()}`, content: objIngridient });
        
        dispatch({
            type: `ADD_${objIngridient.type.toUpperCase()}`,
            value: objIngridient,
        })
    };

    const handleClick = (event) => {
        openIngridientDetails(event);
        addIngridientInConstructor();
    }

    return (
        <div className={cardStyles.ingrCard + ' mb-8'} onClick={handleClick}>
            <img src={objIngridient.image} alt={objIngridient.name} className={cardStyles.itemPic} />
            <div className={cardStyles.price}>
                <Counter count={1} size="default" />
                <span className="m-2 text_type_digits-default">{objIngridient.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <h3 className="m-1 text_type_main-default">{objIngridient.name}</h3>
        </div>
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
    objIngridient: PropTypes.shape(ingridientsInnerObjStructure.isRequired), // arrayOf - массив, состоящий из типа данных, указанного в скобках: объект определённой структуры, плюс ещё и isRequired
    //openModal: PropTypes.func.isRequired
}

export default IngridientCard;