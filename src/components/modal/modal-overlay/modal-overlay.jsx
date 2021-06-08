import React  from 'react';
import PropTypes from 'prop-types';
import sMO from './modal-overlay.module.css';

export default function ModalOverlay({handleClose, children}){

  const reaction = () => {
    console.log('Отладка: в ModalOverlay пришло событие клика');
    handleClose();
  }

  return(
    <div className={sMO.modalOverlay} onClick={ reaction }>
      {children}
    </div>
  )
}

ModalOverlay.propTypes = {
  handleClose: PropTypes.func
}; 