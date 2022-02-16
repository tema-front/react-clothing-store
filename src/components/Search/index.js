import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cardsSearch, cleanFiltredList, cleanSearchedList, nothingFound, requestAllCardsDatas, searchDelayEnd, searchDelayStart, searchResultTrue } from "../../store/cards/actions";
import { getAllCatalogLoaded, getCardsListSearched, getSearchCircular, getSearchStatus } from "../../store/cards/selectors";
import { cleanFilter } from "../../store/filter/actions";
import { getFilters } from "../../store/filter/selectors";
import { Filter } from "../Filter";

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
        console.log(Filter);
        timer.current = setTimeout(() => {
            debugger
            navigate(`/catalog/1`);
            dispatch(cleanFiltredList);
            dispatch(cleanFilter);
            dispatch(searchDelayEnd);
            // handleCleaningFilter();
            if (searchValue[searchValue.length - 1] === ' ') {
                dispatch(cardsSearch(searchValue.slice(0, -1)))
            } else dispatch(cardsSearch(searchValue))
        }, 500)

    }

    // useEffect(() => {
    //     searchRef.current.focus();  
    // })

    useEffect(() => {
        debugger
        // Не отрабатывает, потому что cardsListSearched в рефе. Надо что-то придумать...
        if (!cardsListSearched.length) setSearchValue('');
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

    useEffect(() => {
        debugger
        if (!Object.values(filters)[0] && !Object.values(filters)[1] && !Object.values(filters)[2]) return
        if (searchValue && !Object.values(cardsListSearched.current).length) {
            setSearchValue('');
        }
    }, [filters])

    const handleClearSearch = () => {
        setSearchValue('');
        // ПОПРОБУЙ СДЕЛАТЬ ФИЛЬТР, ПОТОМ ПОИСК, ПОТОМ CLEAN SEARCH
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