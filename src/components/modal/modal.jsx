import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import modalStyles from './modal.module.css';

//import ModalOverlay from '';
//import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'

export default function Modal() {
    const modalRoot = document.getElementById("react-modals");


    return ReactDOM.createPortal(
        (
            <>
            <p>Я модальное окно, ура!</p>
            </>
        ), modalRoot
    );
}