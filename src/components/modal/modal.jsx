import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import modalStyles from './modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function Modal({ closeModal, children }) {
    const modalRoot = document.getElementById("react-modals");

    // Функция передаётся в onClick <article>. Предотвращает всплытие события клика с модального окна до ModalOverlay. Иначе клик по любому месту модального окна закроет модальное окно. А надо, чтобы так делал только клик по крестику и клик по ModalOverlay.
    const stopPropagation = (event) => {
        event.stopPropagation();
    }

    return ReactDOM.createPortal(
        (
            <ModalOverlay handleClick={closeModal} >
                {console.log('Отладка: рендерю модальное окно')}

                <article className={modalStyles.modal} onClick={stopPropagation}>
                    <button onClick={closeModal} className={modalStyles.closeButton}>
                        <CloseIcon />
                    </button>
                    {children}
                </article>
            </ModalOverlay>
        ), modalRoot
    );
}

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
};

export default Modal;