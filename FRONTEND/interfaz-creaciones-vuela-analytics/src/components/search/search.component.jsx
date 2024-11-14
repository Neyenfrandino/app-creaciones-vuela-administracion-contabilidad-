
import './search.style.scss';
const Search = ({ handleSearch }) => {


    return (
        <div className="search__container">
            <input 
                type="search" 
                placeholder="Buscar..." 
                className="search__input"
                onChange={handleSearch}
                aria-label="Buscar"
            />
        </div>
    );
};

export default Search;
