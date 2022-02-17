import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { changeColor, changeSize, decreaseQuantity, increaseQuantity, removeCardFromCart } from '../../store/cart/actions';


export const CartListItem = ({cards}) => {
    const dispatch = useDispatch();
    const colorsRef = useRef();
    const sizesRef = useRef();
    
    const handleRemoveCardFromCart = (cardId) => {
        dispatch(removeCardFromCart(cardId));
    }

    const handleIncreaseQuantity = (cardInfo) => {
        dispatch(increaseQuantity(cardInfo));
    }

    const handleDecreaseQuantity = (cardInfo) => {
        dispatch(decreaseQuantity(cardInfo));
    }

    const handleChangeSize = (cardId, size) => {
        dispatch(changeSize(cardId, size.split('-')[0]));
    }

    const handleChangeColor = (cardId, color) => {
        dispatch(changeColor(cardId, color));
    }

    useEffect(() => {
        debugger
        console.log(colorsRef, sizesRef);
    }, [])

    return (
        <>
        {cards?.map(card => (
            <div className="products-added-item" key={card.id}>
                <div className="products-added-item-img-wrp">
                    <img className="products-item-img" src={`https://picsum.photos/id/${card.id + 8}/262/306`} alt="product-item" height="306" width='262' />
                </div>
                {/* <img src="./img/.jpg/main_product_3.jpg" className="products-added-item-img" alt="products-item" height="306"> */}
                <div className="products-added-item-info">
                    <div className="products-added-item-txt">
                    <Link className="products-added-item-heading" to={`/product/${card.id}`}>
                        <span className="products-added-item-heading">{card.title}</span>
                    </Link>
                        <ul className="products-added-item-list-settings">
                            <li>Price: <span className="products-added-item-price">${card.price}.00</span></li>
                            <li>Color: 

                                <select ref={colorsRef} onChange={(event) => handleChangeColor(card.id, event.target.value)} className='products-added-item-sizes-list'>
                                    {(card.color) && <option className='none' value={card.color}>{card.color}</option>}
                                    <option value="Black">Black</option>
                                    <option value="Gray">Gray</option>
                                    <option value="Orange">Orange</option>
                                    <option value="Red">Red</option>
                                    <option value="White">White</option>
                                </select>
                                {/* <svg width="11" height="6" viewBox="0 0 11 6"  xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.00214 5.00214C4.83521 5.00247 4.67343 4.94433 4.54488 4.83782L0.258102 1.2655C0.112196 1.14422 0.0204417 0.969958 0.00302325 0.781035C-0.0143952 0.592112 0.0439493 0.404007 0.165221 0.258101C0.286493 0.112196 0.460759 0.0204417 0.649682 0.00302327C0.838605 -0.0143952 1.02671 0.043949 1.17262 0.165221L5.00214 3.36602L8.83167 0.279536C8.90475 0.220188 8.98884 0.175869 9.0791 0.149125C9.16937 0.122382 9.26403 0.113741 9.35764 0.1237C9.45126 0.133659 9.54198 0.162021 9.6246 0.207156C9.70722 0.252292 9.7801 0.313311 9.83906 0.386705C9.90449 0.460167 9.95405 0.546351 9.98462 0.639855C10.0152 0.733359 10.0261 0.83217 10.0167 0.930097C10.0073 1.02802 9.97784 1.12296 9.93005 1.20895C9.88227 1.29494 9.81723 1.37013 9.73904 1.42982L5.45225 4.88068C5.32002 4.97036 5.16154 5.01312 5.00214 5.00214Z" />
                                </svg>  */}
                            </li>
                            <li>Size:
{/*                                 
                                <button className=''>
                                    <svg width="11" height="6" viewBox="0 0 11 6"  xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.00214 5.00214C4.83521 5.00247 4.67343 4.94433 4.54488 4.83782L0.258102 1.2655C0.112196 1.14422 0.0204417 0.969958 0.00302325 0.781035C-0.0143952 0.592112 0.0439493 0.404007 0.165221 0.258101C0.286493 0.112196 0.460759 0.0204417 0.649682 0.00302327C0.838605 -0.0143952 1.02671 0.043949 1.17262 0.165221L5.00214 3.36602L8.83167 0.279536C8.90475 0.220188 8.98884 0.175869 9.0791 0.149125C9.16937 0.122382 9.26403 0.113741 9.35764 0.1237C9.45126 0.133659 9.54198 0.162021 9.6246 0.207156C9.70722 0.252292 9.7801 0.313311 9.83906 0.386705C9.90449 0.460167 9.95405 0.546351 9.98462 0.639855C10.0152 0.733359 10.0261 0.83217 10.0167 0.930097C10.0073 1.02802 9.97784 1.12296 9.93005 1.20895C9.88227 1.29494 9.81723 1.37013 9.73904 1.42982L5.45225 4.88068C5.32002 4.97036 5.16154 5.01312 5.00214 5.00214Z" />
                                    </svg> 
                                </button> */}
                        {/* s m l xl */}

                            <select ref={sizesRef} onChange={(event) => handleChangeSize(card.id, event.target.value)} className='products-added-item-sizes-list'>
                                {(card.size) && <option className='none' value={card.size}>{card.size}</option>}
                                <option value="S-size">S</option>
                                <option value="M-size">M</option>
                                <option value="L-size">L</option>
                                <option value="XL-size">XL</option>
                            </select>
                            </li>
                            <li><span>Quantity:</span>
                                
                                {card.quantity !== 1 ? 
                                    <button className="product-cart-quantity-btns" onClick={() => handleDecreaseQuantity(card)}>−</button>
                                    :    
                                    <button disabled className="disable product-cart-quantity-btns">−</button>
                                }
                                <span className="product-cart-quantity-counter">{card.quantity}</span>
                                <button className="product-cart-quantity-btns" onClick={() => handleIncreaseQuantity(card)}>+</button>
                            </li>
                        </ul>
                    </div>
                    <svg onClick={() => handleRemoveCardFromCart(card.id)} className="products-added-item-cross" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.2453 9L17.5302 2.71516C17.8285 2.41741 17.9962 2.01336 17.9966 1.59191C17.997 1.17045 17.8299 0.76611 17.5322 0.467833C17.2344 0.169555 16.8304 0.00177586 16.4089 0.00140366C15.9875 0.00103146 15.5831 0.168097 15.2848 0.465848L9 6.75069L2.71516 0.465848C2.41688 0.167571 2.01233 0 1.5905 0C1.16868 0 0.764125 0.167571 0.465848 0.465848C0.167571 0.764125 0 1.16868 0 1.5905C0 2.01233 0.167571 2.41688 0.465848 2.71516L6.75069 9L0.465848 15.2848C0.167571 15.5831 0 15.9877 0 16.4095C0 16.8313 0.167571 17.2359 0.465848 17.5342C0.764125 17.8324 1.16868 18 1.5905 18C2.01233 18 2.41688 17.8324 2.71516 17.5342L9 11.2493L15.2848 17.5342C15.5831 17.8324 15.9877 18 16.4095 18C16.8313 18 17.2359 17.8324 17.5342 17.5342C17.8324 17.2359 18 16.8313 18 16.4095C18 15.9877 17.8324 15.5831 17.5342 15.2848L11.2453 9Z" />
                    </svg>     
                </div>
            </div>
        ))}
        </>
    );
}