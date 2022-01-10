import { useState } from "react";

export const Filter = () => {
    const [visibilityFilter, setVisibilityFilter] = useState(false);

    const onVisibilityFilter = () => {
        setVisibilityFilter(!visibilityFilter);
    }

    return (
        <>
        <button className="catalog-filter-btn" onClick={onVisibilityFilter}>filter
            <svg width="15" height="10" viewBox="0 0 15 10" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.833333 10H4.16667C4.625 10 5 9.625 5 9.16667C5 8.70833 4.625 8.33333 4.16667 8.33333H0.833333C0.375 8.33333 0 8.70833 0 9.16667C0 9.625 0.375 10 0.833333 10ZM0 0.833333C0 1.29167 0.375 1.66667 0.833333 1.66667H14.1667C14.625 1.66667 15 1.29167 15 0.833333C15 0.375 14.625 0 14.1667 0H0.833333C0.375 0 0 0.375 0 0.833333ZM0.833333 5.83333H9.16667C9.625 5.83333 10 5.45833 10 5C10 4.54167 9.625 4.16667 9.16667 4.16667H0.833333C0.375 4.16667 0 4.54167 0 5C0 5.45833 0.375 5.83333 0.833333 5.83333Z" />
            </svg>                    
        </button>
        <button className="catalog-filter-btn-mobile" onClick={onVisibilityFilter}>
            <svg width="38" height="25" viewBox="0 0 38 25" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.08333 25H10.4167C11.5625 25 12.5 24.0625 12.5 22.9167C12.5 21.7708 11.5625 20.8333 10.4167 20.8333H2.08333C0.9375 20.8333 0 21.7708 0 22.9167C0 24.0625 0.9375 25 2.08333 25ZM0 2.08333C0 3.22917 0.9375 4.16667 2.08333 4.16667H35.4167C36.5625 4.16667 37.5 3.22917 37.5 2.08333C37.5 0.9375 36.5625 0 35.4167 0H2.08333C0.9375 0 0 0.9375 0 2.08333ZM2.08333 14.5833H22.9167C24.0625 14.5833 25 13.6458 25 12.5C25 11.3542 24.0625 10.4167 22.9167 10.4167H2.08333C0.9375 10.4167 0 11.3542 0 12.5C0 13.6458 0.9375 14.5833 2.08333 14.5833Z" />
            </svg>              
        </button>
        {visibilityFilter &&
            <div className="catalog-filter">
                <span>filter
                    <svg width="15" height="10" viewBox="0 0 15 10" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.833333 10H4.16667C4.625 10 5 9.625 5 9.16667C5 8.70833 4.625 8.33333 4.16667 8.33333H0.833333C0.375 8.33333 0 8.70833 0 9.16667C0 9.625 0.375 10 0.833333 10ZM0 0.833333C0 1.29167 0.375 1.66667 0.833333 1.66667H14.1667C14.625 1.66667 15 1.29167 15 0.833333C15 0.375 14.625 0 14.1667 0H0.833333C0.375 0 0 0.375 0 0.833333ZM0.833333 5.83333H9.16667C9.625 5.83333 10 5.45833 10 5C10 4.54167 9.625 4.16667 9.16667 4.16667H0.833333C0.375 4.16667 0 4.54167 0 5C0 5.45833 0.375 5.83333 0.833333 5.83333Z" />
                    </svg> 
                </span>
                <svg onClick={onVisibilityFilter} className="products-added-item-cross" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.2453 9L17.5302 2.71516C17.8285 2.41741 17.9962 2.01336 17.9966 1.59191C17.997 1.17045 17.8299 0.76611 17.5322 0.467833C17.2344 0.169555 16.8304 0.00177586 16.4089 0.00140366C15.9875 0.00103146 15.5831 0.168097 15.2848 0.465848L9 6.75069L2.71516 0.465848C2.41688 0.167571 2.01233 0 1.5905 0C1.16868 0 0.764125 0.167571 0.465848 0.465848C0.167571 0.764125 0 1.16868 0 1.5905C0 2.01233 0.167571 2.41688 0.465848 2.71516L6.75069 9L0.465848 15.2848C0.167571 15.5831 0 15.9877 0 16.4095C0 16.8313 0.167571 17.2359 0.465848 17.5342C0.764125 17.8324 1.16868 18 1.5905 18C2.01233 18 2.41688 17.8324 2.71516 17.5342L9 11.2493L15.2848 17.5342C15.5831 17.8324 15.9877 18 16.4095 18C16.8313 18 17.2359 17.8324 17.5342 17.5342C17.8324 17.2359 18 16.8313 18 16.4095C18 15.9877 17.8324 15.5831 17.5342 15.2848L11.2453 9Z" />
                </svg>   
                <ul className="catalog-filter-list"> 
                    <li className="catalog-filter-list-item">category</li>
                    <ul className="catalog-filter-sublist">
                        <li className="catalog-filter-sublist-item"><button>Men</button></li>
                        <li className="catalog-filter-sublist-item"><button>Women</button></li>
                        <li className="catalog-filter-sublist-item"><button>Kids</button></li>
                        <li className="catalog-filter-sublist-item"><button>Accessories</button></li>
                    </ul>


                    <li className="catalog-filter-list-item">brand</li>
                    <li className="catalog-filter-list-item">desinger</li>
                </ul>
            </div>
        }
        </>
    );
}