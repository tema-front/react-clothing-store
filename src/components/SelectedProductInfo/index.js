import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCardToCart, removeCardFromCart } from "../../store/cart/actions";
import { getCartList } from "../../store/cart/selectors";

export const SelectedProductInfo = ({ cardInfo }) => {
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const cartList = useSelector(getCartList);
    const [alreadyInCart, setAlreadyInCart] = useState(false);

    useEffect(() => {
        debugger
        if (cartList.find(card => card.id === cardInfo.id)) {
            setAlreadyInCart(true)
        } else setAlreadyInCart(false);
    }, [cardInfo, cartList])

    const handleRemoveCardFromCart = (cardId) => {
        dispatch(removeCardFromCart(cardId));
    }

    const handleAddProductToCart = (cardInfo) => {
        dispatch(addCardToCart(cardInfo, color, size, quantity))
    }

    const handleDecreaseQuantity = () => {
        if (quantity === 1) return;
        setQuantity(quantity - 1);
    }

    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1);
    }

    const handleChangeSize = (size) => {
        setSize(size.split('-')[0]);
    }

    const handleChangeColor = (color) => {
        setColor(color);
    }

    return (
        <section className="product-selected-info">
            <div className="product-selected-info-wrp">
                <span className="product-selected-category-name">{cardInfo.category} collection,  {cardInfo.brand}, by {cardInfo.designer}</span>
                <h2 className="product-selected-title">{cardInfo?.title}</h2>
                <p className="product-selected-info-txt">{cardInfo?.description}</p>
                <span className="product-selected-price">${cardInfo?.price}.00</span>
                <hr className="product-selected-info-trait" />
                <div className="product-selected-setting">
                    <nav className="filter-item product-selected-filter-item">
                        {/* <button className="filter-item-btn"><span>choose color</span>
                            <svg width="11" height="6" viewBox="0 0 11 6"  xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.00214 5.00214C4.83521 5.00247 4.67343 4.94433 4.54488 4.83782L0.258102 1.2655C0.112196 1.14422 0.0204417 0.969958 0.00302325 0.781035C-0.0143952 0.592112 0.0439493 0.404007 0.165221 0.258101C0.286493 0.112196 0.460759 0.0204417 0.649682 0.00302327C0.838605 -0.0143952 1.02671 0.043949 1.17262 0.165221L5.00214 3.36602L8.83167 0.279536C8.90475 0.220188 8.98884 0.175869 9.0791 0.149125C9.16937 0.122382 9.26403 0.113741 9.35764 0.1237C9.45126 0.133659 9.54198 0.162021 9.6246 0.207156C9.70722 0.252292 9.7801 0.313311 9.83906 0.386705C9.90449 0.460167 9.95405 0.546351 9.98462 0.639855C10.0152 0.733359 10.0261 0.83217 10.0167 0.930097C10.0073 1.02802 9.97784 1.12296 9.93005 1.20895C9.88227 1.29494 9.81723 1.37013 9.73904 1.42982L5.45225 4.88068C5.32002 4.97036 5.16154 5.01312 5.00214 5.00214Z" />
                            </svg>                        
                       </button> */}
                        {alreadyInCart 
                            ? 
                            <>
                            <select disabled onChange={(event) => handleChangeColor(event.target.value)} className='disable product-selected-option'>
                                <option value="default">CHOOSE COLOR</option>
                                <option value="Black">Color: Black</option>
                                <option value="Gray">Color: Gray</option>
                                <option value="Orange">Color: Orange</option>
                                <option value="Red">Color: Red</option>
                                <option value="White">Color: White</option>
                            </select>

                            <select disabled onChange={(event) => handleChangeSize(event.target.value)} className='disable product-selected-option'>
                                <option value="default">CHOOSE SIZE</option>
                                <option value="S-size">Size: S</option>
                                <option value="M-size">Size: M</option>
                                <option value="L-size">Size: L</option>
                                <option value="XL-size">Size: XL</option>
                            </select>

                            <span className='product-selected-option'>Quantity:
                                {quantity !== 1 ? 
                                    <button disabled onClick={() => handleDecreaseQuantity()} className="product-cart-quantity-btns">−</button>
                                    :
                                    <button disabled className="disable product-cart-quantity-btns">−</button>
                                }
                                <span className="product-cart-quantity-counter">{quantity}</span>
                                <button disabled onClick={() => handleIncreaseQuantity()} className="disable product-cart-quantity-btns">+</button>
                            </span>     
                            </>
                            :
                            <>
                            <select onChange={(event) => handleChangeColor(event.target.value)} className='product-selected-option'>
                                <option value="default">CHOOSE COLOR</option>
                                <option value="Black">Color: Black</option>
                                <option value="Gray">Color: Gray</option>
                                <option value="Orange">Color: Orange</option>
                                <option value="Red">Color: Red</option>
                                <option value="White">Color: White</option>
                            </select>

                            <select onChange={(event) => handleChangeSize(event.target.value)} className='product-selected-option'>
                                <option value="default">CHOOSE SIZE</option>
                                <option value="S-size">Size: S</option>
                                <option value="M-size">Size: M</option>
                                <option value="L-size">Size: L</option>
                                <option value="XL-size">Size: XL</option>
                            </select>

                            <span className='product-selected-option'>Quantity:
                                {quantity !== 1 ? 
                                    <button onClick={() => handleDecreaseQuantity()} className="product-cart-quantity-btns">−</button>
                                    :
                                    <button disabled className="disable product-cart-quantity-btns">−</button>
                                }
                                <span className="product-cart-quantity-counter">{quantity}</span>
                                <button onClick={() => handleIncreaseQuantity()} className="product-cart-quantity-btns">+</button>
                            </span> 
                            </>    
                        }

                        {/* <button className="filter-item-btn"><span>choose size</span>
                            <svg width="11" height="6" viewBox="0 0 11 6"  xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.00214 5.00214C4.83521 5.00247 4.67343 4.94433 4.54488 4.83782L0.258102 1.2655C0.112196 1.14422 0.0204417 0.969958 0.00302325 0.781035C-0.0143952 0.592112 0.0439493 0.404007 0.165221 0.258101C0.286493 0.112196 0.460759 0.0204417 0.649682 0.00302327C0.838605 -0.0143952 1.02671 0.043949 1.17262 0.165221L5.00214 3.36602L8.83167 0.279536C8.90475 0.220188 8.98884 0.175869 9.0791 0.149125C9.16937 0.122382 9.26403 0.113741 9.35764 0.1237C9.45126 0.133659 9.54198 0.162021 9.6246 0.207156C9.70722 0.252292 9.7801 0.313311 9.83906 0.386705C9.90449 0.460167 9.95405 0.546351 9.98462 0.639855C10.0152 0.733359 10.0261 0.83217 10.0167 0.930097C10.0073 1.02802 9.97784 1.12296 9.93005 1.20895C9.88227 1.29494 9.81723 1.37013 9.73904 1.42982L5.45225 4.88068C5.32002 4.97036 5.16154 5.01312 5.00214 5.00214Z" />
                            </svg>                        
                        </button> */}
                        {/* <button className="filter-item-btn"><span>quantity</span>
                            <svg width="11" height="6" viewBox="0 0 11 6"  xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.00214 5.00214C4.83521 5.00247 4.67343 4.94433 4.54488 4.83782L0.258102 1.2655C0.112196 1.14422 0.0204417 0.969958 0.00302325 0.781035C-0.0143952 0.592112 0.0439493 0.404007 0.165221 0.258101C0.286493 0.112196 0.460759 0.0204417 0.649682 0.00302327C0.838605 -0.0143952 1.02671 0.043949 1.17262 0.165221L5.00214 3.36602L8.83167 0.279536C8.90475 0.220188 8.98884 0.175869 9.0791 0.149125C9.16937 0.122382 9.26403 0.113741 9.35764 0.1237C9.45126 0.133659 9.54198 0.162021 9.6246 0.207156C9.70722 0.252292 9.7801 0.313311 9.83906 0.386705C9.90449 0.460167 9.95405 0.546351 9.98462 0.639855C10.0152 0.733359 10.0261 0.83217 10.0167 0.930097C10.0073 1.02802 9.97784 1.12296 9.93005 1.20895C9.88227 1.29494 9.81723 1.37013 9.73904 1.42982L5.45225 4.88068C5.32002 4.97036 5.16154 5.01312 5.00214 5.00214Z" />
                            </svg>                        
                        </button> */}
                    </nav>

                    {/* background-image: url(../../img/.svg/account_checkdaw.svg); */}
                    {alreadyInCart 
                        ? 
                        <button disabled className="product-selected-btn-done">
                            <svg width="20" height="16" viewBox="0 0 20 16" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.8035 0H18.0904C17.8502 0 17.6222 0.111827 17.4752 0.303176L7.3702 13.2826L2.52481 7.05754C2.45151 6.96318 2.35808 6.88688 2.25153 6.83438C2.14499 6.78187 2.0281 6.75451 1.90963 6.75437H0.196467C0.032258 6.75437 -0.0584248 6.94572 0.0420614 7.07494L6.75503 15.6981C7.06874 16.1006 7.67166 16.1006 7.98782 15.6981L19.9579 0.318087C20.0584 0.191349 19.9677 0 19.8035 0Z" />
                            </svg> 
                            <span className="products-selected-btn-txt">Done</span>
                            <svg onClick={() => handleRemoveCardFromCart(cardInfo.id)} className="product-selected-btn-done-cross" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.2453 9L17.5302 2.71516C17.8285 2.41741 17.9962 2.01336 17.9966 1.59191C17.997 1.17045 17.8299 0.76611 17.5322 0.467833C17.2344 0.169555 16.8304 0.00177586 16.4089 0.00140366C15.9875 0.00103146 15.5831 0.168097 15.2848 0.465848L9 6.75069L2.71516 0.465848C2.41688 0.167571 2.01233 0 1.5905 0C1.16868 0 0.764125 0.167571 0.465848 0.465848C0.167571 0.764125 0 1.16868 0 1.5905C0 2.01233 0.167571 2.41688 0.465848 2.71516L6.75069 9L0.465848 15.2848C0.167571 15.5831 0 15.9877 0 16.4095C0 16.8313 0.167571 17.2359 0.465848 17.5342C0.764125 17.8324 1.16868 18 1.5905 18C2.01233 18 2.41688 17.8324 2.71516 17.5342L9 11.2493L15.2848 17.5342C15.5831 17.8324 15.9877 18 16.4095 18C16.8313 18 17.2359 17.8324 17.5342 17.5342C17.8324 17.2359 18 16.8313 18 16.4095C18 15.9877 17.8324 15.5831 17.5342 15.2848L11.2453 9Z" />
                            </svg>   
                        </button>
                        :
                        <button className="product-selected-btn" onClick={() => handleAddProductToCart(cardInfo)} >
                            <svg width="32" height="29" viewBox="0 0 32 29" xmlns="http://www.w3.org/2000/svg">
                                <path d="M26.2009 29C25.5532 28.9738 24.9415 28.6948 24.4972 28.2227C24.0529 27.7506 23.8114 27.1232 23.8245 26.475C23.8376 25.8269 24.1043 25.2097 24.5673 24.7559C25.0303 24.3022 25.6527 24.048 26.301 24.048C26.9493 24.048 27.5717 24.3022 28.0347 24.7559C28.4977 25.2097 28.7644 25.8269 28.7775 26.475C28.7906 27.1232 28.549 27.7506 28.1047 28.2227C27.6604 28.6948 27.0488 28.9738 26.401 29H26.2009ZM6.75293 26.32C6.75293 25.79 6.91011 25.2718 7.20459 24.8311C7.49907 24.3904 7.91764 24.0469 8.40735 23.844C8.89705 23.6412 9.43594 23.5881 9.95581 23.6915C10.4757 23.7949 10.9532 24.0502 11.328 24.425C11.7028 24.7998 11.9581 25.2773 12.0615 25.7972C12.1649 26.317 12.1118 26.8559 11.9089 27.3456C11.7061 27.8353 11.3626 28.2539 10.9219 28.5483C10.4812 28.8428 9.96304 29 9.43298 29C9.08087 29.0003 8.73212 28.9311 8.40674 28.7966C8.08136 28.662 7.78569 28.4646 7.53662 28.2158C7.28755 27.9669 7.09001 27.6713 6.9552 27.3461C6.82039 27.0208 6.75098 26.6721 6.75098 26.32H6.75293ZM10.553 20.686C10.2935 20.6868 10.0409 20.6024 9.83411 20.4457C9.62727 20.2891 9.47758 20.0689 9.40796 19.819L4.57495 2.36401H1.18201C0.868521 2.36401 0.567859 2.23947 0.346191 2.01781C0.124523 1.79614 0 1.49549 0 1.18201C0 0.868519 0.124523 0.567873 0.346191 0.346205C0.567859 0.124537 0.868521 5.81268e-06 1.18201 5.81268e-06H5.46301C5.7225 -0.00080736 5.97504 0.0837201 6.18176 0.240568C6.38848 0.397416 6.53784 0.617884 6.60693 0.868006L11.4399 18.323H24.6179L29.001 8.27501H14.401C14.2428 8.27961 14.0854 8.25242 13.9379 8.19507C13.7904 8.13771 13.6559 8.05134 13.5424 7.94108C13.4288 7.83082 13.3386 7.69891 13.277 7.55315C13.2154 7.40739 13.1836 7.25075 13.1836 7.0925C13.1836 6.93426 13.2154 6.77762 13.277 6.63186C13.3386 6.4861 13.4288 6.35419 13.5424 6.24393C13.6559 6.13367 13.7904 6.0473 13.9379 5.98994C14.0854 5.93259 14.2428 5.90541 14.401 5.91001H30.814C31.0097 5.90996 31.2022 5.95866 31.3744 6.05172C31.5465 6.14478 31.6928 6.27926 31.7999 6.44301C31.9078 6.60729 31.9734 6.79569 31.9908 6.99145C32.0083 7.18721 31.9771 7.38424 31.9 7.565L26.495 19.977C26.4026 20.1876 26.251 20.3668 26.0585 20.4927C25.866 20.6186 25.641 20.6858 25.411 20.686H10.553Z" />
                            </svg> 
                            <span className="products-selected-btn-txt">Add to Cart</span>
                        </button>  
                    }
                </div>
            </div>
        </section>
    );
}
