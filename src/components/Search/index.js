import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cardsSearch, cleanFiltredList, cleanSearchedList, requestAllCardsDatas } from "../../store/cards/actions";
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
            dispatch(cardsSearch(searchValue))
        // } else {
            // dispatch(requestAllCardsDatas())
        // }
    }

    useEffect(() => {
        searchRef.current.focus();  
    })

    useEffect(() => {
        debugger
        if (catalogLoaded && searchValue) dispatch(cardsSearch(searchValue));
    }, [catalogLoaded])

    const handleSearchValue = (event) => {
        setSearchValue(event.target.value)
    }

    useEffect(() => {
        if (!searchValue) return
        debugger
        if (catalogLoaded && searchValue) handleSearch();
        if (!catalogLoaded && searchValue) dispatch(requestAllCardsDatas())
            
    }, [searchValue])

    const handleClearSearch = () => {
        setSearchValue('');
        dispatch(cleanSearchedList);
    }

    return (
        <div className="search">
            <input ref={searchRef} value={searchValue} onChange={event => handleSearchValue(event)} type='text' className="search-field" placeholder="Search"></input>
            <button onClick={handleClearSearch} className="search-clear-btn" >Clear</button>
        </div>
    );
}