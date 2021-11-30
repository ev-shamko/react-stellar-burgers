import { FC } from 'react';
import stylesMO from './modal-overlay.module.css';

type TModalOverlayProps = {
  handleClick: () => void,
}

const ModalOverlay: FC<TModalOverlayProps> = ({ handleClick, children }) => {

  return (
    <div className={stylesMO.modalOverlay} onClick={handleClick}>
      {children}
    </div>
  )
}

export default ModalOverlay;