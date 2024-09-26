import { useEffect, useState } from 'react';
import Modal from '../modal/modal.component';
import './super_user_bento.style.scss';


const SuperUserBento = ({ object_data }) => {
  const [isOpen, setIsOpen] = useState({
    isOpen: false,
    object: null,
  });

  const handleOnclick = (e, object) => {
    setIsOpen((prevState) => ({
      ...prevState,
      isOpen: !prevState.isOpen,  // Invierte el valor de isOpen
      object: object,  // Asigna el nuevo objeto
    }));
  }

  const closeModal = () => {
    setIsOpen((prevState) => ({
      ...prevState,
      isOpen: false,
      object: null,
    }));
  }


  console.log(isOpen.object, 'jajajajjaa');

  return (
    <div className="super_user__container">
      <div className='super_user__content'>
        {
          object_data.map((object, index) => {
            let ispar = index % 2 === 0;
            return(
              <div className={`super_user__category ${ispar ? 'left' : 'right'}`} key={index}>
                  <h2>{object.section_title}</h2>
                  <button onClick={(e)=> handleOnclick(e, object)}>Ver detalles</button>
              </div>
            )
          })
        }
      </div>
        <Modal isOpen={isOpen.isOpen} closeModal={closeModal}>
          {
            isOpen.object && 
            <>
              <h2>{isOpen.object.section_title}</h2>
                <div className='super_user__modal__function--container'>
                  <div className='super_user__modal__buttons'>
                    {
                        Object.keys(isOpen.object).map((key, index) => {
                          return(
                            <div className="modal__buttons" key={index}>
                              <button>{isOpen.object[key]}</button>
                            </div>
                          )
                        })
                      }

                  </div>

                    <div className='super_user__modal__value--container'>
                      {/* <div className='super_user__modal__value--left'>
                        </div> */}
                    </div>
                </div>
                {/* <button onClick={closeModal}>Cerrar</button> */}

              </>
          }
        </Modal>
    </div>
  )
}

export default SuperUserBento;


