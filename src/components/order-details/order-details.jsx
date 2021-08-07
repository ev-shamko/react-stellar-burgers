import React from 'react';
import stylesOD from './order-details.module.css';
import { useSelector } from 'react-redux';


// <OrderDetails orderData={orderData} />
function OrderDetais() {
    const orderState = useSelector(store => store.burgerVendor.orderData);

    return (
        <>
            <h2 className={'text text_type_digits-large mt-30 mb-2'}>{orderState.order.number}</h2>
            <p className={'text text_type_main-medium mb-15'}>идентификатор заказа</p>
            <div className={stylesOD.bgForCheck + ' mb-15'}></div>
            <p className={"text text_type_main-default mb-2"}>Ваш заказ начали готовить</p>
            <p className={"text text_type_main-default text_color_inactive mb-30"}>Дождитесь готовности на орбитальной станции</p>
        </>
    )
}

export default OrderDetais;