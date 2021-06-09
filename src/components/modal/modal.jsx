import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import modalStyles from './modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';
import OrderDetails from '../order-details/order-details';
import IngridientDetais from '../ingridient-details/ingridient-details';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

//import ModalOverlay from '';
//import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'

function Modal({ closeModal, typeOfModal, orderData, ingrInModalData }) {
    const [gotOrder, setGotOrder] = React.useState(false);
    const modalRoot = document.getElementById("react-modals");

    // Функция передаётся в onClick <article>. Предотвращает всплытие события клика с модального окна до ModalOverlay. Иначе клик по любому месту модального окна закроет модальное окно. А надо, чтобы так делал только клик по крестику и клик по ModalOverlay.
    const stopPropagation = (event) => {
        event.stopPropagation();
    }

    // отрисуется при ошибке вызова модального окна
    const errorInnerComponent = (arg) => {
        return (
            <>
                <h2 className={'text text_type_main-large mt-10 ml-10'}>Произошла ошибка {arg}</h2>
                <p className={'text text_type_main-small mt-10 ml-10 mr-10'}>Вы хотели сделать заказ или посмотреть информацию об ингридиентах, но видите этот текст? Значит, только что произошёл технический сбой. Закройте это окно и повторите попытку. Если ошибка повторилась, позовите официантку Норму, она поможет разобраться с неполадкой и примет ваш заказ ^_^</p>

            </>
        )
    }

    // при рендере определяет содержимое модального окна: информация о заказе, инфа об ингридиенте либо ошибка
    function renderInnerComponent() {
        if (typeOfModal === "OrderDetails") {
            return (<OrderDetails orderData={orderData} />);
        }

        if (typeOfModal === "IngridientDetails") {
            return (<IngridientDetais ingrInModalData={ingrInModalData} />)
        }

        // вот такая ситуация вообще не должна возникать, но мало ли что
        if (typeOfModal === "null") {
            return (
                errorInnerComponent(' typeOfModal === "null"')
            )
        }

        return errorInnerComponent();
    }

    return ReactDOM.createPortal(
        (
            <ModalOverlay handleClick={closeModal} >
                {console.log('Отладка: рендерю модальное окно')}

                <article className={modalStyles.modal} onClick={stopPropagation}>
                    <button onClick={closeModal} className={modalStyles.closeButton}>
                        <CloseIcon />
                    </button>
                    {renderInnerComponent()}
                </article>
            </ModalOverlay>
        ), modalRoot
    );
}

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    typeOfModal: PropTypes.oneOf(["none", "OrderDetails", "IngridientDetails"]),
    orderData: PropTypes.object.isRequired,
    ingrInModalData: PropTypes.object.isRequired,
};

export default Modal;