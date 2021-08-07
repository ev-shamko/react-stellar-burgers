import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import modalStyles from './modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useDispatch } from 'react-redux';
import { 
    CLOSE_MODAL, 
    SET_MODAL_TYPE, 
} from '../../services/actions/burgerVendor';

function Modal({ children }) {
    const dispatch = useDispatch();
    const modalRoot = document.getElementById("react-modals");

    // Функция передаётся в onClick <article>. Предотвращает всплытие события клика с модального окна до ModalOverlay. Иначе клик по любому месту модального окна закроет модальное окно. А надо, чтобы так делал только клик по крестику и клик по ModalOverlay.
    const stopPropagation = (event) => {
        event.stopPropagation();
    }

    const handleClose = () => {
        dispatch({
            type: CLOSE_MODAL,
        });

        dispatch({
            type: SET_MODAL_TYPE,
            value: 'none',
        });
    }

    return ReactDOM.createPortal(
        (
            <ModalOverlay handleClick={handleClose} >
                {/* {console.log('Отладка: рендерю модальное окно')} */}

                <article className={modalStyles.modal} onClick={stopPropagation}>
                    <button onClick={handleClose} className={modalStyles.closeButton}>
                        <CloseIcon />
                    </button>
                    {children}
                </article>
            </ModalOverlay>
        ), modalRoot
    );
}

Modal.propTypes = {
    children: PropTypes.element.isRequired
};

export default Modal;