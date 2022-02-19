import { useRef } from 'react';
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

    return (
        <>
        {cards?.map(card => (
            <div className="products-added-item" key={card.id}>
                <div className="products-added-item-img-wrp">
                    <img className="products-item-img" src={`https://picsum.photos/id/${card.id + 8}/262/306`} alt="product-item" height="306" width='262' />
                </div>
                <div className="products-added-item-info">
                    <div className="products-added-item-txt">
                    <Link className="products-added-item-heading" to={`/product/${card.id}`}>
                        <h2 className="products-added-item-heading">{card.title}</h2>
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
                            </li>
                            <li>Size:
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