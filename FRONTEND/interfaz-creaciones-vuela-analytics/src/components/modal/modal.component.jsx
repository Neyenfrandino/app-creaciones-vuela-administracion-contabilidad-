
import './modal.style.scss'

const Modal = ({ show, handleClose, children, title }) => {

    if(!show) return null;  

    return (
        <div className="modal-container">
            <div className="modal">
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button className="close-button" onClick={handleClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <div className="modal-body">
                    {children}
                </div>
                
            </div>
        </div>
    )
}

export default Modal;