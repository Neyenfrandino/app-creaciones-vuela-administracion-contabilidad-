
import './loading.style.scss';

const Loading = ({ isLoading }) => {
    return (
        <div className={`loading-container ${isLoading ? '' : 'hidden'}`}>
            <div class="loading-indicator">
                <div class="planet orbit-1"></div>
                <div class="planet orbit-2"></div>
                <div class="planet orbit-3"></div>
                <div class="planet orbit-4"></div>
            </div>
        </div>
    )
}
export default Loading;