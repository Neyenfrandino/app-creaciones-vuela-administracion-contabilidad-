
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import './button_back.style.scss';

const ButtonBack = () => {

    return (
        <div className="button_back__container">
        <button onClick={() => window.history.back()}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>
    )
}

export default ButtonBack;