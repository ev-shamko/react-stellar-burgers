import React, { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';

import modalStyles from './modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useDispatch } from 'react-redux';
import {
    CLOSE_MODAL,
    SET_MODAL_TYPE,
} from '../../services/actions/burgerVendor';

const Modal: FC = ({ children }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const modalRoot = document.getElementById("react-modals") as HTMLElement;

    // Функция передаётся в onClick <article>. Предотвращает всплытие события клика с модального окна до ModalOverlay. Иначе клик по любому месту модального окна закроет модальное окно. А надо, чтобы так делал только клик по крестику и клик по ModalOverlay.
    const stopPropagation = (event: React.MouseEvent<HTMLElement>) => {
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

        history.replace({
            pathname: `/`,
        });
    }

    // Логика закрытия по esc. Она не работает, если написать ее в компоненте modaloverlay на .tsx  Не понимаю, почему ломается.
    useEffect(() => {
        const escHandler = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose();
            }
        }
        document.addEventListener('keydown', escHandler);
        return () => document.removeEventListener('keydown', escHandler);
    })

    return ReactDOM.createPortal(
        (
            <ModalOverlay handleClick={handleClose} >
                {/* {console.log('Отладка: рендерю модальное окно')} */}

                <article className={modalStyles.modal} onClick={stopPropagation}>
                    <button onClick={handleClose} className={modalStyles.closeButton}>
                        <CloseIcon type="primary" />
                    </button>
                    {children}
                </article>
            </ModalOverlay>
        ), modalRoot
    );
}

export default Modal;