import { useState } from 'react';
import {useSelector} from 'react-redux'
import { getCartPrice, getDeliveryPrice } from "../../store/cart/selectors";
import { CheckoutWindow } from '../CheckoutWindow';

export const SubproceedCheckout = () => {
    const cartPrice = useSelector(getCartPrice);
    const deliveryPrice = useSelector(getDeliveryPrice);
    const [visibilityCheckoutWindow, setVisibilityCheckoutWindow] = useState(false);

    const handleProceedCheckout = () => {
        if (!deliveryPrice) return
        setVisibilityCheckoutWindow(true);
    }

    const handleCloseCheckoutWindow = () => {
        setVisibilityCheckoutWindow(false);
    }

    return (
        <>
        <div className="products-making-order">
            <div className="products-making-order-txt">
                <span className="products-making-order-subtotal">sub total <span className="products-making-order-subtotal-price">${cartPrice}</span></span>
                {!!deliveryPrice && <span className="products-making-order-delivery">delivery<span className="products-making-order-delivery-price">${deliveryPrice}</span></span>}
                <span className="products-making-order-grandtotal">grand total<span className="products-making-order-grandtotal-price">${cartPrice + deliveryPrice}</span></span>
            </div>
            <hr className="products-making-order-trait" />
            <button onClick={handleProceedCheckout} id='checkoutwindow' className="products-making-order-btn">proceed to&nbsp;checkout</button>
        </div>
        {visibilityCheckoutWindow && <CheckoutWindow onCloseCheckoutWindow={handleCloseCheckoutWindow} />}
        </>
    );
}