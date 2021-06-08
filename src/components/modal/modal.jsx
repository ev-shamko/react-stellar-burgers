import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import modalStyles from './modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

//import ModalOverlay from '';
//import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'

function Modal({ closeModal }) {
    const modalRoot = document.getElementById("react-modals");

    // Функция передаётся в onClick <article>. Предотвращает всплытие события клика с модального окна до ModalOverlay. Иначе клик по любому месту модального окна закроет модальное окно. А надо, чтобы так делал только клик по крестику и клик по ModalOverlay.
    const stopPropagation = (event) => {
        event.stopPropagation();
    }

    return ReactDOM.createPortal(
        (
            <ModalOverlay handleClick={closeModal} >
                {console.log('Отладка: отрисовываю модальное окно')}
                <article className={modalStyles.modal} onClick={stopPropagation}>
                    <h2 className={'text text_type_main-large mt-10 ml-10'}>Вы открыли модальное окно</h2>
                    <button onClick={closeModal} className={modalStyles.closeButton}><CloseIcon /></button>
                </article>
            </ModalOverlay>
        ), modalRoot
    );
}

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
};

export default Modal;