import React  from 'react';
import PropTypes from 'prop-types';
import stylesMO from './modal-overlay.module.css';

function ModalOverlay({handleClick, children}){

  const reaction = () => {
    console.log('Отладка: в ModalOverlay пришло событие клика');
    handleClick();
  }

  return(
    <div className={stylesMO.modalOverlay} onClick={ reaction }>
      {children}
    </div>
  )
}

ModalOverlay.propTypes = {
  handleClick: PropTypes.func.isRequired
}; 

export default ModalOverlay;