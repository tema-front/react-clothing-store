import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cardsSearch, requestAllCardsDatas } from "../../store/cards/actions";
import { getAllCatalogLoaded } from "../../store/cards/selectors";

export const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const catalogLoaded = useSelector(getAllCatalogLoaded);
    const dispatch = useDispatch();

    const handleSearch = () => {
        if (catalogLoaded && searchValue) {
            dispatch(cardsSearch(searchValue))
        } else {
            dispatch(requestAllCardsDatas())
        }



        
    }

    useEffect(() => {
        if (catalogLoaded && searchValue) dispatch(cardsSearch(searchValue));
    }, [catalogLoaded])

    const handleSearchValue = (event) => {
        setSearchValue(event.target.value)
    }

    return (
        <>
            <input value={searchValue} onChange={event => handleSearchValue(event)} type='text'></input>
            <button onClick={handleSearch}>Search</button>
        </>
    );
}