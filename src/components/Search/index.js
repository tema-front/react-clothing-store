import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cardsSearch, cleanFiltredList, cleanSearchedList, nothingFound, requestAllCardsDatas, searchDelayEnd, searchDelayStart, searchResultTrue } from "../../store/cards/actions";
import { getAllCatalogLoaded, getCardsListSearched, getSearchCircular } from "../../store/cards/selectors";
import { cleanFilter } from "../../store/filter/actions";

export const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const cardsListSearched = useRef(useSelector(getCardsListSearched))
    const catalogLoaded = useSelector(getAllCatalogLoaded);
    const dispatch = useDispatch();
    const searchRef = useRef();
    const navigate = useNavigate();
    let timer = useRef();
    
    const handleSearch = () => {
        dispatch(cleanFiltredList);
        dispatch(cleanFilter);
        clearTimeout(timer.current);
        dispatch(searchDelayStart)
        timer.current = setTimeout(() => {
            debugger
            navigate(`/catalog/1`);
            dispatch(searchDelayEnd)
            if (searchValue[searchValue.length - 1] === ' ') {
                dispatch(cardsSearch(searchValue.slice(0, -1)))
            } else dispatch(cardsSearch(searchValue))
        }, 500)

    }

    useEffect(() => {
        searchRef.current.focus();  
    })

    useEffect(() => {
        if (!searchValue) {
            dispatch(searchResultTrue);
            dispatch(cleanSearchedList);
        }  
    }, [cardsListSearched])





    // useEffect(() => {
    //     if (searchValue)
    // }, [searchValue])



    useEffect(() => {
        if (catalogLoaded && searchValue) handleSearch();
    }, [catalogLoaded])

    const handleSearchValue = (event) => {
        setSearchValue(event.target.value)
    }

    useEffect(() => {
        debugger
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