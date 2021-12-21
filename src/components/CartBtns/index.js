import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { emptyCart } from '../../store/cart/actions';

export const CartBtns = () => {
    const dispatch = useDispatch();

    const handleEmptyCart = () => {
        dispatch(emptyCart)
    }   

    return (
        <div className="products-added-btns">
            <button onClick={handleEmptyCart} className="products-added-btn products-btn-clear-cart">clear shopping cart</button>
            <Link to={'/catalog/1'}>
                <button className="products-added-btn products-btn-catalog">continue shopping</button>
            </Link>
        </div>
    );
}