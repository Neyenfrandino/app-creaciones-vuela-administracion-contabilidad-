import './modal.style.scss'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;
  
  console.log(isOpen);
  const closeModalHandler = () => {
    closeModal();
  }

  return (
    <div className="modal__container">
      <div className="modal__content">
        <div className="modal__close" onClick={closeModalHandler}>
        <FontAwesomeIcon icon={faTimes} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;