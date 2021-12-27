import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Pagination = ({pageId}) => {
    const [paginationNumbers, setPaginationNumber] = useState([]);
    const [paginationMoreThree, setPaginationMoreThree] = useState(false);
    const lastPage = 20;

    useEffect(() => {
debugger
        let newPaginationNumbers = []
        if (Number(pageId) <= 4) {
            setPaginationMoreThree(false)
            for (let i = 1; i <= 6; i++) {
                newPaginationNumbers.push(i)
            }
            setPaginationNumber(newPaginationNumbers)
        } else {
            setPaginationMoreThree(true)
            for (let i = Number(pageId) - 2; i <= Number(pageId) + 2; i++) {
                if (i > lastPage) continue
                newPaginationNumbers.push(i)
            }
            setPaginationNumber(newPaginationNumbers);
        }
    }, [pageId])

    const goTopPage = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    return (
        <div className="products-pagination-wrp">
            <div className="products-pagination">
                {!!(+pageId - 1) ? 
                <Link onClick={goTopPage} to={`/catalog/${+pageId - 1}`} className="products-pagination-btns" key={'ReturnBtnActive'}>
                    <svg width="9" height="14" viewBox="0 0 9 14" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.99512 2L3.99512 7L8.99512 12L7.99512 14L0.995117 7L7.99512 0L8.99512 2Z" />
                    </svg>
                </Link>
                :
                <button disabled className="products-pagination-btns link-disable" key={'ReturnBtnDisabled'}>
                    <svg width="9" height="14" viewBox="0 0 9 14" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.99512 2L3.99512 7L8.99512 12L7.99512 14L0.995117 7L7.99512 0L8.99512 2Z" />
                    </svg>
                </button>
                }
                <ul className="products-pagination-numbers-list">
                    {paginationMoreThree ? 
                        <>
                        <li key={'BackBegin'}><Link onClick={goTopPage} className="products-pagination-numbers-list-item" to={`/catalog/1`}>1</Link></li>
                        <li key={'BackBeginEllipsis'} className="products-pagination-numbers-list-item products-pagination-numbers-list-item-ellipsis-left">...</li>
                        {paginationNumbers?.map((number, i) => (
                            <li><Link onClick={goTopPage} key={i} className="products-pagination-numbers-list-item" to={`/catalog/${number}`}>{number} </Link> </li>
                        ))}
                        </>
                        :
                        paginationNumbers?.map((number, i) => (
                            <li><Link onClick={goTopPage} key={i} className="products-pagination-numbers-list-item" to={`/catalog/${number}`}>{number} </Link> </li>
                        ))
                    }

                    {(pageId < lastPage - 3) && 
                        ( 
                            <>
                            <li key={'toTheEndEllipsis'} className="products-pagination-numbers-list-item products-pagination-numbers-list-item-ellipsis-right">...</li>
                            <li key={'toTheEnd'}><Link onClick={goTopPage} className="products-pagination-numbers-list-item" to={`/catalog/${lastPage}`}>{lastPage}</Link></li>
                            </>
                        )
                    
                    }
                </ul>
                    {!!(pageId >= lastPage) ? 
                        <button disabled className="products-pagination-btns link-disable" onClick={goTopPage}>
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
    );
}