import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { emptyCart } from '../../store/cart/actions';

export const CartBtns = () => {
    const dispatch = useDispatch();

    const handleEmptyCart = () => {
        dispatch(emptyCart);
    }   

    return (
        <div className="products-added-btns">
            <button onClick={handleEmptyCart} className="products-added-btn products-btn-clear-cart">clear shopping cart</button>
            <Link className="products-added-btn products-btn-catalog" to={'/catalog/1'}>continue shopping</Link>
        </div>
    );
}