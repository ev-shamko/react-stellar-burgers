import React, { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useHistory, useLocation } from 'react-router-dom';

import modalStyles from './modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../../services/hooks';

import {
    CLOSE_MODAL,
    SET_MODAL_TYPE,
} from '../../services/actions/burgerVendor';

type TLocationState = {
    background?: Location;
};

const Modal: FC = ({ children }) => {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const location = useLocation<TLocationState | undefined>();
    const currentModalType = useAppSelector(state => state.burgerVendor.currentModalType);

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

        // фикс: после закрытия модального окна о свежем заказе не будет редиректа history.goBack();
        if (currentModalType === 'OrderDetails') {
            return history.push({
                // pathname: `/`,
                state: { background: location },
            })
        }

        history.goBack(); // теперь это работает, потому что содержимое объекта location корректно меняется при открытии модалок, которые открываются в результате работы handleClick(), в котором корректно делается history.push, чтобы прописать в истории нужную "предыдущую страницу"
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