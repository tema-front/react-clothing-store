import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { cleanFiltredList, cleanSearchedList, searchResultTrue } from "../../store/cards/actions";
import { getCardsListSearched, getSearchLinearProgress } from "../../store/cards/selectors";
import { addBrand, addCategory, addDesigner, cleanFilter } from "../../store/filter/actions";
import { getFilters } from "../../store/filter/selectors";

export const Filter = () => {
    const dispatch = useDispatch();
    const [visibilityFilter, setVisibilityFilter] = useState(false);
    const cardsListSearched = useRef(useSelector(getCardsListSearched));
    const searchLinearProgress = useSelector(getSearchLinearProgress);
    const filters = useSelector(getFilters);
    const navigate = useNavigate();
    const params = useParams();
    const filterListRef = useRef();
    const filter = useRef();


    // const createURL = (page) => {
    //     debugger
    //     const { category, brand, designer } = filters;
    //     const filtredURL = `/catalog/${category || params.category || 'category'}/${brand || params.brand || 'brand'}/${designer || params.designer || 'designer'}/${page || params.pageId}`;
    //     return filtredURL;
    // }

    // useEffect(() => {
    //     // navigate(createURL());
    // }, [filters])

    const onVisibilityFilter = () => {
        debugger
        filter.current.classList.remove('filter-disable')
        setVisibilityFilter(true);
    }

    const onCloseFilter = () => {
        debugger
        if (filter.current) filter.current.classList.add('filter-disable')
        else return
        for (let key in filters) {
            if (!filters[key]) {
                for (let [i, itemList] of Object.entries(filterListRef.current.children)) {
                    if (filterListRef.current.children[i].innerText.toLowerCase() === key && filterListRef.current.children[i - 1]?.checked && !visibilityFilter) {
                        filterListRef.current.children[i - 1].checked = false
                    }

                }
            }
        }

        setVisibilityFilter(false);
    }

    useEffect(() => {
        if (!visibilityFilter) return;
        const { category, brand, designer } = filters;
        // for (let [i, key] in Object.entries(filters)) {
        //     debugger
        //     console.log(i, key, filters.key)
        // }
        let counter = 0
        for (let key in filters) {
            if (!filters[key]) continue;
            // if (!filters[key]) {
            //     for (let [i, itemList] of Object.entries(filterListRef.current.children)) {
            //         if (filterListRef.current.children[i].innerText.toLowerCase() === key && filterListRef.current.children[i - 1]?.checked && !visibilityFilter) {
            //             filterListRef.current.children[i - 1].checked = false
            //         }

            //     }

            //     continue
            // }
            for (let [i, itemList] of Object.entries(filterListRef.current.children)) {
                // filterListRef.current.children[i].checked = false;
                if ((itemList.id.split('-'))[itemList.id.split('-').length - 1] === key) {
                    itemList.checked = true;
                    for (let itemSublist of filterListRef.current.children[Number(i) + 2].children) {
                        if ((itemSublist.innerText).toLowerCase() === filters[key].toLowerCase()) {
                            itemSublist.children[0].checked = true;
                        }
                    }
                }

                // itemList.checked = false;
                // if ((Number(i) !== 0) && (Number(i) % 3 === 0)) {
                //     for (let itemSublist of filterListRef.current.children[i - 1].children) {
                //         itemSublist.children[0].checked = false;
                //     }
                    // }
            }
            counter++;
        }
        // Object.values(filters).forEach((filtersItem, i) => {
        //     if (filtersItem) {
        //         console.log(filterListRef.current.children);
        //     }
        // })
        // for (let [i, itemList] of Object.entries(filterListRef.current.children)) {
        //     // filterListRef.current.children[i].checked = false;
        //     itemList.checked = true;
        //     if ((Number(i) !== 0) && (Number(i) % 3 === 0)) {
        //         for (let itemSublist of filterListRef.current.children[i - 1].children) {
        //             itemSublist.children[0].checked = true;
        //         }
        //     }
        // }
    }, [visibilityFilter, filters])

    const cleanLists = () => {
        dispatch(searchResultTrue);
        dispatch(cleanSearchedList);
        dispatch(cleanFiltredList);
    }
    
    const handleAddCategory = (category) => {
        navigate(`/catalog/1`);
        if (category === filters.category) return;
        cleanLists();
        dispatch(addCategory(category));
    }

    const handleAddBrand = (brand) => {
        navigate(`/catalog/1`);
        if (brand === filters.brand) return;
        cleanLists();
        dispatch(addBrand(brand));

    }

    const handleAddDesigner = (designer) => {
        navigate(`/catalog/1`);
        if (designer === filters.designer) return;
        cleanLists();
        dispatch(addDesigner(designer));
    }

    useEffect(() => {
        debugger
        if ((filters.category || filters.brand || filters.designer) && !searchLinearProgress && Object.values(cardsListSearched.current).length) {
            handleCleaningFilter();
            dispatch(cleanFiltredList);
            dispatch(cleanFilter);  
        } 
    }, [searchLinearProgress])

    const handleCleaningFilter = () => {
        // navigate(`/catalog/1`);
        debugger
        // сделать через юзеффект, и отслеживать поиск
        // for (let i = 0; i < filterListRef.current.children.length; i++) {
        for (let [i, itemList] of Object.entries(filterListRef.current.children)) {
            // filterListRef.current.children[i].checked = false;
            itemList.checked = false;
            if ((Number(i) !== 0) && (Number(i + 1) % 3 === 0)) {
                for (let itemSublist of filterListRef.current.children[i].children) {
                    debugger
                    if (itemSublist.children[0].checked) navigate(`/catalog/1`);
                    itemSublist.children[0].checked = false;
                }
            }
        }

        dispatch(cleanFiltredList);
        dispatch(cleanFilter);  
    }

    useEffect(() => {
        // if (!visibilityFilter) return
        document.addEventListener("click", event => handleClick(event))
        return () => document.removeEventListener('click', handleClick);
        // document.addEventListener("click", (event) => {
        //     debugger
            // const filterIsOpen = event.composedPath().find(element => element.id === 'filter')
            // if (event.target.id != 'filter' && !filterIsOpen) {
            //     onCloseFilter();
            // };
        // });
    }, [visibilityFilter])

    const handleClick = (event) => {
        const filterIsOpen = event.composedPath().find(element => element.id === 'filter')
        if (event.target.id != 'filter' && !filterIsOpen) {
            onCloseFilter();
        };
    }

    return (
        <>
        <button id="filter" className="catalog-filter-btn" onClick={onVisibilityFilter}>filter
            <svg width="15" height="10" viewBox="0 0 15 10" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.833333 10H4.16667C4.625 10 5 9.625 5 9.16667C5 8.70833 4.625 8.33333 4.16667 8.33333H0.833333C0.375 8.33333 0 8.70833 0 9.16667C0 9.625 0.375 10 0.833333 10ZM0 0.833333C0 1.29167 0.375 1.66667 0.833333 1.66667H14.1667C14.625 1.66667 15 1.29167 15 0.833333C15 0.375 14.625 0 14.1667 0H0.833333C0.375 0 0 0.375 0 0.833333ZM0.833333 5.83333H9.16667C9.625 5.83333 10 5.45833 10 5C10 4.54167 9.625 4.16667 9.16667 4.16667H0.833333C0.375 4.16667 0 4.54167 0 5C0 5.45833 0.375 5.83333 0.833333 5.83333Z" />
            </svg>                    
        </button>
        <button id="filter" className="catalog-filter-btn-mobile" onClick={onVisibilityFilter}>
            <svg width="38" height="25" viewBox="0 0 38 25" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.08333 25H10.4167C11.5625 25 12.5 24.0625 12.5 22.9167C12.5 21.7708 11.5625 20.8333 10.4167 20.8333H2.08333C0.9375 20.8333 0 21.7708 0 22.9167C0 24.0625 0.9375 25 2.08333 25ZM0 2.08333C0 3.22917 0.9375 4.16667 2.08333 4.16667H35.4167C36.5625 4.16667 37.5 3.22917 37.5 2.08333C37.5 0.9375 36.5625 0 35.4167 0H2.08333C0.9375 0 0 0.9375 0 2.08333ZM2.08333 14.5833H22.9167C24.0625 14.5833 25 13.6458 25 12.5C25 11.3542 24.0625 10.4167 22.9167 10.4167H2.08333C0.9375 10.4167 0 11.3542 0 12.5C0 13.6458 0.9375 14.5833 2.08333 14.5833Z" />
            </svg>              
        </button>
        {/* {visibilityFilter && */}
            <div ref={filter} id="filter" className="catalog-filter filter-disable">
                <span className="catalog-filter-title">filter
                    <svg width="15" height="10" viewBox="0 0 15 10" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.833333 10H4.16667C4.625 10 5 9.625 5 9.16667C5 8.70833 4.625 8.33333 4.16667 8.33333H0.833333C0.375 8.33333 0 8.70833 0 9.16667C0 9.625 0.375 10 0.833333 10ZM0 0.833333C0 1.29167 0.375 1.66667 0.833333 1.66667H14.1667C14.625 1.66667 15 1.29167 15 0.833333C15 0.375 14.625 0 14.1667 0H0.833333C0.375 0 0 0.375 0 0.833333ZM0.833333 5.83333H9.16667C9.625 5.83333 10 5.45833 10 5C10 4.54167 9.625 4.16667 9.16667 4.16667H0.833333C0.375 4.16667 0 4.54167 0 5C0 5.45833 0.375 5.83333 0.833333 5.83333Z" />
                    </svg> 
                </span>
                <svg onClick={onCloseFilter} className="products-added-item-cross cross-catalog-filter" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.2453 9L17.5302 2.71516C17.8285 2.41741 17.9962 2.01336 17.9966 1.59191C17.997 1.17045 17.8299 0.76611 17.5322 0.467833C17.2344 0.169555 16.8304 0.00177586 16.4089 0.00140366C15.9875 0.00103146 15.5831 0.168097 15.2848 0.465848L9 6.75069L2.71516 0.465848C2.41688 0.167571 2.01233 0 1.5905 0C1.16868 0 0.764125 0.167571 0.465848 0.465848C0.167571 0.764125 0 1.16868 0 1.5905C0 2.01233 0.167571 2.41688 0.465848 2.71516L6.75069 9L0.465848 15.2848C0.167571 15.5831 0 15.9877 0 16.4095C0 16.8313 0.167571 17.2359 0.465848 17.5342C0.764125 17.8324 1.16868 18 1.5905 18C2.01233 18 2.41688 17.8324 2.71516 17.5342L9 11.2493L15.2848 17.5342C15.5831 17.8324 15.9877 18 16.4095 18C16.8313 18 17.2359 17.8324 17.5342 17.5342C17.8324 17.2359 18 16.8313 18 16.4095C18 15.9877 17.8324 15.5831 17.5342 15.2848L11.2453 9Z" />
                </svg>
                <button onClick={handleCleaningFilter} className="catalog-filter-clean">Clear</button>   
                <ul ref={filterListRef} className="catalog-filter-list">
                    <input type={"checkbox"} id='catalog-filter-list-item-category' className="catalog-filter-list-checkbox" />
                    <label htmlFor="catalog-filter-list-item-category" className="catalog-filter-list-item-label">
                        <li className="catalog-filter-list-item-txt">category</li>
                    </label>
                    <ul className="catalog-filter-sublist">
                        <li className="catalog-filter-sublist-item">
                            <input type='radio' onClick={() => handleAddCategory('men')} id="catalog-filter-sublist-men" name="catalog-filter-sublist-category" className="catalog-filter-sublist-item-radio" />
                            <label className="catalog-filter-sublist-item-txt" htmlFor="catalog-filter-sublist-men">Men</label>
                        </li>
                        <li className="catalog-filter-sublist-item">
                            <input type='radio' onClick={() => handleAddCategory('women')} id="catalog-filter-sublist-women" name="catalog-filter-sublist-category" className="catalog-filter-sublist-item-radio" />
                            <label className="catalog-filter-sublist-item-txt" htmlFor="catalog-filter-sublist-women">Women</label>
                        </li>
                        <li className="catalog-filter-sublist-item">
                            <input type='radio' onClick={() => handleAddCategory('kids')} id="catalog-filter-sublist-kids" name="catalog-filter-sublist-category" className="catalog-filter-sublist-item-radio" />
                            <label className="catalog-filter-sublist-item-txt" htmlFor="catalog-filter-sublist-kids">Kids</label>
                        </li>
                        <li className="catalog-filter-sublist-item">
                            <input type='radio' onClick={() => handleAddCategory('accessories')} id="catalog-filter-sublist-accesories" name="catalog-filter-sublist-category" className="catalog-filter-sublist-item-radio" />
                            <label className="catalog-filter-sublist-item-txt" htmlFor="catalog-filter-sublist-accesories">Accessories</label>
                        </li>
                    </ul>

                    <input type={"checkbox"} id='catalog-filter-list-item-brand' className="catalog-filter-list-checkbox" />
                    <label htmlFor="catalog-filter-list-item-brand" className="catalog-filter-list-item-label">
                        <li className="catalog-filter-list-item-txt">brand</li>
                    </label>
                    <ul className="catalog-filter-sublist">
                        <li className="catalog-filter-sublist-item">
                            <input type='radio' onClick={() => handleAddBrand('Royal Fashion')} id="catalog-filter-brand-royal" name="catalog-filter-sublist-brand" className="catalog-filter-sublist-item-radio" />
                            <label className="catalog-filter-sublist-item-txt" htmlFor="catalog-filter-brand-royal">Royal Fashion</label>
                        </li>
                        <li className="catalog-filter-sublist-item">
                            <input type='radio' onClick={() => handleAddBrand('EcoLime')} id="catalog-filter-brand-ecolime" name="catalog-filter-sublist-brand" className="catalog-filter-sublist-item-radio" />
                            <label className="catalog-filter-sublist-item-txt" htmlFor="catalog-filter-brand-ecolime">EcoLime</label>
                        </li>
                        <li className="catalog-filter-sublist-item">
                            <input type='radio' onClick={() => handleAddBrand('UnionClothing')} id="catalog-filter-brand-unionclothing" name="catalog-filter-sublist-brand" className="catalog-filter-sublist-item-radio" />
                            <label className="catalog-filter-sublist-item-txt" htmlFor="catalog-filter-brand-unionclothing">UnionClothing</label>
                        </li>
                    </ul>

                    <input type={"checkbox"} id='catalog-filter-list-item-designer' className="catalog-filter-list-checkbox" />
                    <label htmlFor="catalog-filter-list-item-designer" className="catalog-filter-list-item-label">
                        <li className="catalog-filter-list-item-txt">designer</li>
                    </label>
                    <ul className="catalog-filter-sublist">
                        <li className="catalog-filter-sublist-item">
                            <input type='radio' onClick={() => handleAddDesigner('Coco Chanel')} id="catalog-filter-designer-cocochanel" name="catalog-filter-sublist-designer" className="catalog-filter-sublist-item-radio" />
                            <label className="catalog-filter-sublist-item-txt" htmlFor="catalog-filter-designer-cocochanel">Coco Chanel</label>
                        </li>
                        <li className="catalog-filter-sublist-item">
                            <input type='radio' onClick={() => handleAddDesigner('Christian Dior')} id="catalog-filter-designer-christiandior" name="catalog-filter-sublist-designer" className="catalog-filter-sublist-item-radio" />
                            <label className="catalog-filter-sublist-item-txt" htmlFor="catalog-filter-designer-christiandior">Christian Dior</label>
                        </li>
                    </ul>
                </ul>
            </div>
        {/* } */}
        </>
    );
}