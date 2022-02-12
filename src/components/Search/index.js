import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cardsSearch, cleanFiltredList, cleanSearchedList, nothingFound, requestAllCardsDatas, searchResultTrue } from "../../store/cards/actions";
import { getAllCatalogLoaded } from "../../store/cards/selectors";
import { cleanFilter } from "../../store/filter/actions";

export const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const catalogLoaded = useSelector(getAllCatalogLoaded);
    const dispatch = useDispatch();
    const searchRef = useRef();

    const handleSearch = () => {
        debugger
        // if (catalogLoaded && searchValue) {
            dispatch(cleanFiltredList);
            dispatch(cleanFilter);
            if (searchValue[searchValue.length - 1] === ' ') {
                dispatch(cardsSearch(searchValue.slice(0, -1)))
            } else dispatch(cardsSearch(searchValue))
        // } else {
            // dispatch(requestAllCardsDatas())
        // }
    }

    useEffect(() => {
        searchRef.current.focus();  
    })

    useEffect(() => {
        debugger
        if (catalogLoaded && searchValue) handleSearch();
    }, [catalogLoaded])

    const handleSearchValue = (event) => {
        setSearchValue(event.target.value)
    }

    useEffect(() => {
        debugger
        if (!searchValue) {
            dispatch(cleanSearchedList);
            dispatch(searchResultTrue);
            return
        }
        if (catalogLoaded && searchValue) handleSearch();
        if (!catalogLoaded && searchValue) dispatch(requestAllCardsDatas())
            
    }, [searchValue])

    const handleClearSearch = () => {
        setSearchValue('');
        dispatch(searchResultTrue);
        dispatch(cleanSearchedList);
    }

    return (
        <div className="search">
            <input ref={searchRef} value={searchValue} onChange={event => handleSearchValue(event)} type='text' className="search-field" placeholder="Search"></input>
            <button onClick={handleClearSearch} className="search-clear-btn" >Clear</button>
        </div>
    );
}