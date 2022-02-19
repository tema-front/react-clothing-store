import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cardsSearch, cleanFiltredList, cleanSearchedList, requestAllCardsDatas, searchDelayEnd, searchDelayStart, searchResultTrue } from "../../store/cards/actions";
import { getAllCatalogLoaded, getCardsListSearched } from "../../store/cards/selectors";
import { cleanFilter } from "../../store/filter/actions";
import { getFilters } from "../../store/filter/selectors";

export const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const cardsListSearched = useRef(useSelector(getCardsListSearched));
    const catalogLoaded = useSelector(getAllCatalogLoaded);
    const filters = useSelector(getFilters);
    const dispatch = useDispatch();
    const searchRef = useRef();
    const navigate = useNavigate();
    let timer = useRef();
    
    const handleSearch = () => {
        clearTimeout(timer.current);
        dispatch(searchDelayStart)
        timer.current = setTimeout(() => {
            
            navigate(`/catalog/1`);
            dispatch(cleanFiltredList);
            dispatch(cleanFilter);
            dispatch(searchDelayEnd);
            if (searchValue[searchValue.length - 1] === ' ') {
                dispatch(cardsSearch(searchValue.slice(0, -1)))
            } else dispatch(cardsSearch(searchValue))
        }, 500)

    }

    useEffect(() => {
        if (!cardsListSearched.length) setSearchValue('');
        if (!searchValue) {
            dispatch(searchResultTrue);
            dispatch(cleanSearchedList);
        }  
    }, [cardsListSearched])

    useEffect(() => {
        if (catalogLoaded && searchValue) handleSearch();
    }, [catalogLoaded])

    const handleSearchValue = (event) => {
        setSearchValue(event.target.value)
    }

    useEffect(() => {
        if (!searchValue) {
            dispatch(searchResultTrue);
            dispatch(cleanSearchedList);
            clearTimeout(timer.current);
            dispatch(searchDelayEnd)

            return
        }
        if (catalogLoaded && searchValue) handleSearch();
        if (!catalogLoaded && searchValue) dispatch(requestAllCardsDatas())
            
    }, [searchValue])

    useEffect(() => {
        
        if (!Object.values(filters)[0] && !Object.values(filters)[1] && !Object.values(filters)[2]) return
        if (searchValue && !Object.values(cardsListSearched.current).length) {
            setSearchValue('');
        }
    }, [filters])

    const handleClearSearch = () => {
        setSearchValue('');
        dispatch(searchResultTrue);
        dispatch(cleanSearchedList);
        clearTimeout(timer.current);
        dispatch(searchDelayEnd)
        dispatch(cleanFiltredList);
        dispatch(cleanFilter);  
    }

    return (
        <div className="search">
            <input ref={searchRef} value={searchValue} onChange={event => handleSearchValue(event)} type='text' className="search-field" placeholder="Search"></input>
            <button onClick={handleClearSearch} className="search-clear-btn" >Clear</button>
        </div>
    );
}