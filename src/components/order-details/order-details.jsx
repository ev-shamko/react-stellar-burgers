import React from 'react';
import stylesOD from './order-details.module.css';
import PropTypes from 'prop-types';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'

// напоминалка:
// на момент 1 спринта orderData - это стейт app.js
// он захардкоден и становится равен объекту с данными после успешного фетча к API за списком ингридиентов

function OrderDetais({orderData}) {

    return (
        <>
            <h2 className={'text text_type_digits-large mt-30 mb-2'}>{orderData.orderNumber}</h2>
            <p className={'text_type_main-medium mb-15'}>идентификатор заказа</p>
            <div className={stylesOD.bgForCheck + ' mb-15'}>
                {/* <CheckMarkIcon type="primary" /> */} {/* Проще сделать фоновую картинку, чем залезать в размеры иконки из пакета */}
            </div>
            <p className={"text text_type_main-default mb-2"}>Ваш заказ начали готовить</p>
            <p className={"text text_type_main-default mb-30"}>Дождитесь готовности на орбитальной станции</p>
        </>
    )
}

OrderDetais.propTypes = {
    orderData: PropTypes.object.isRequired
};

export default OrderDetais;