import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getCardsListFiltred, getCardsListSearched, getSearchStatus } from "../../store/cards/selectors";

export const Pagination = ({pageId}) => {
    const [paginationNumbers, setPaginationNumber] = useState([]);
    const [paginationMoreThree, setPaginationMoreThree] = useState(false);
    const cardsListFiltred = useSelector(getCardsListFiltred);
    const cardsListSearched = useSelector(getCardsListSearched);
    const [lastPage, setLastPage] = useState(20);
    const nothingFound = useSelector(getSearchStatus)
    const listRef = useRef();
    const navigate = useNavigate();
    
    useEffect(() => {
        
        if (Object.keys(cardsListFiltred).length || Object.keys(cardsListSearched).length) {
            setLastPage(Object.keys(cardsListFiltred).length || Object.keys(cardsListSearched).length)
        } else {
            setLastPage(20)
        }
    }, [cardsListFiltred, cardsListSearched])

    useEffect(() => {
        let newPaginationNumbers = []
        
        if (Number(lastPage) >= 4) {
            if (Number(pageId) <= 3) {
                newPaginationNumbers = [];
                setPaginationMoreThree(false)
                for (let i = 1; i <= 4; i++) {
                    newPaginationNumbers.push(i)
                }
                setPaginationNumber(newPaginationNumbers)
            } else {
                setPaginationMoreThree(true)
                newPaginationNumbers = [];
                for (let i = Number(pageId) - 1; i <= Number(pageId) + 1; i++) {
                    if (i > Number(lastPage)) continue
                    newPaginationNumbers.push(i)
                }
                setPaginationNumber(newPaginationNumbers);
            }
        } else {
            newPaginationNumbers = [];
            for (let i = 1; i <= Number(lastPage); i++) {
                newPaginationNumbers.push(i)
            }
            setPaginationNumber(newPaginationNumbers);
        }
    }, [pageId, lastPage])

    const goTopPage = (moveNumber) => {
        if (+moveNumber === +pageId) return;
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    useEffect(() => {
        if (!paginationNumbers.length || nothingFound) return;
        if (paginationMoreThree) {
            listRef.current.children[2].children[0].checked = true
        } else {
            listRef.current.children[+pageId - 1].children[0].checked = true
        }
    }, [paginationNumbers])

    return (
        (!nothingFound && 
            <div className="products-pagination-wrp">
                <div className="products-pagination">
                    {!!(+pageId - 1) ? 
                    <Link onClick={goTopPage} to={`/catalog/${+pageId - 1}`} className="products-pagination-btns" key={'ReturnBtnActive'}>
                        <svg width="9" height="14" viewBox="0 0 9 14" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.99512 2L3.99512 7L8.99512 12L7.99512 14L0.995117 7L7.99512 0L8.99512 2Z" />
                        </svg>
                    </Link>
                    :
                    <button disabled className="products-pagination-btns disable" key={'ReturnBtnDisabled'}>
                        <svg width="9" height="14" viewBox="0 0 9 14" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.99512 2L3.99512 7L8.99512 12L7.99512 14L0.995117 7L7.99512 0L8.99512 2Z" />
                        </svg>
                    </button>
                    }
                    <ul ref={listRef} className="products-pagination-numbers-list">
                        {paginationMoreThree ? 
                            <>
                            <li key={'BackBegin'} className="products-pagination-numbers-list-item-first">
                                <Link onClick={() => goTopPage(1)} className="products-pagination-numbers-list-item" to={`/catalog/1`}>1...</Link>
                            </li>
                            {paginationNumbers?.map((number, i) => (
                                <li key={i}>
                                    <input type="radio" class="pagination-radio" name="registration-radio-btn" id={`pagination-label-${number}`} value={number} />
                                    <Link onClick={() => goTopPage(number)} to={`/catalog/${number}`} class="pagination-label products-pagination-numbers-list-item">{number}</Link>
                                </li>
                            ))}
                            </>
                            :
                            paginationNumbers?.map((number, i) => (
                                <li key={i}>
                                    <input type="radio" class="pagination-radio" name="registration-radio-btn" id={`pagination-label-${number}`} value={number} />
                                    <Link onClick={() => goTopPage(number)} to={`/catalog/${number}`} class="pagination-label products-pagination-numbers-list-item">{number}</Link>
                                </li>
                            ))
                        }

                        {((pageId < lastPage - 2) && (lastPage > 4)) ?
                            ( 
                                <li key={'toTheEnd'} className="products-pagination-numbers-list-item-last">
                                    <Link onClick={() => goTopPage(lastPage)} className="products-pagination-numbers-list-item" to={`/catalog/${lastPage}`}>...{lastPage}</Link>
                                </li>
                            )
                            : ((pageId < lastPage - 1) && (lastPage > 4) &&
                                <li key={'toTheEnd'}>
                                    <Link onClick={() => goTopPage(lastPage)} className="products-pagination-numbers-list-item" to={`/catalog/${lastPage}`}>{lastPage}</Link>
                                </li>  
                            )
                        }
                    </ul>
                        {!!(pageId >= lastPage) ? 
                            <button disabled className="products-pagination-btns disable" onClick={goTopPage}>
                                <svg width="9" height="14" viewBox="0 0 9 14" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.994995 12L5.995 7L0.994995 2L1.995 0L8.995 7L1.995 14L0.994995 12Z" />
                                </svg>   
                            </button>
                            :
                            <Link to={`/catalog/${+pageId + 1}`} className="products-pagination-btns" onClick={goTopPage}>
                                <svg width="9" height="14" viewBox="0 0 9 14" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.994995 12L5.995 7L0.994995 2L1.995 0L8.995 7L1.995 14L0.994995 12Z" />
                                </svg>                            
                            </Link>
                        }
                </div>
            </div>
        )
    );
}