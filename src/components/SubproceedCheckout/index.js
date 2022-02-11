import {useSelector} from 'react-redux'
import { getCartPrice } from "../../store/cart/selectors";

export const SubproceedCheckout = () => {
    const cartPrice = useSelector(getCartPrice);

    const handleMakingOrder = () => {
        alert(123);
    }

    return (
        <div className="products-making-order">
            <div className="products-making-order-txt">
                <span className="products-making-order-subtotal">sub total <span className="products-making-order-subtotal-price">${cartPrice}</span></span>
                <span className="products-making-order-grandtotal">grand total<span className="products-making-order-grandtotal-price">${cartPrice}</span></span>
            </div>
            <hr className="products-making-order-trait" />
            <button onClick={handleMakingOrder} className="products-making-order-btn">proceed to&nbsp;checkout</button>
        </div>
    );
}