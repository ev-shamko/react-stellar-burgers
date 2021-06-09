import React from 'react';
import PropTypes from 'prop-types';
import stylesMO from './modal-overlay.module.css';

function ModalOverlay({ handleClick, children }) {

  const reaction = () => {
    // console.log('Отладка: в ModalOverlay пришло событие клика');
    handleClick();
  }

  React.useEffect(() => {
    const escHandler = (event) => { (event.key === 'Escape') && handleClick(); }

    document.addEventListener('keydown', escHandler);

    return () => { document.removeEventListener('keydown', escHandler); }
  }, [])

  return (
    <div className={stylesMO.modalOverlay} onClick={reaction}>
      {children}
    </div>
  )
}

ModalOverlay.propTypes = {
  handleClick: PropTypes.func.isRequired
};

export default ModalOverlay;