import React from 'react';
import PropTypes from 'prop-types';
import stylesMO from './modal-overlay.module.css';

function ModalOverlay({ handleClick, children }) {

  React.useEffect(() => {
    const escHandler = (event) => { (event.key === 'Escape') && handleClick(); }
    document.addEventListener('keydown', escHandler);
    return () => { document.removeEventListener('keydown', escHandler); }
  }, [handleClick])

  return (
    <div className={stylesMO.modalOverlay} onClick={handleClick}>
      {children}
    </div>
  )
}

ModalOverlay.propTypes = {
  handleClick: PropTypes.func.isRequired
};

export default ModalOverlay;