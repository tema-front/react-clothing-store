import { useSelector } from "react-redux";
import { CartList } from "../CartList";
import { CartShippingAdress } from "../CartShippingArdess";
import { Header } from "../Header";
import cartIsEmpty from '../../img/.png/cart_is_empty.png'
import { Footer } from "../Footer";
import { Feedback } from "../Feedback";
import { SubproceedCheckout } from "../SubproceedCheckout";
import { getCartListLength } from "../../store/cart/selectors";
import { Link } from "react-router-dom";

export const Cart = () => {
    const cartListLength = useSelector(getCartListLength);

    return (
        <>
        <Header isCatalog={true} title={'shopping cart'}/>
        <main className="content-cart">
            {!!cartListLength ? 
                <div className="content-cart-wrp">
                    <CartList />
                    <section className="products-delivery">
                        <CartShippingAdress />
                        <SubproceedCheckout />
                    </section>
                </div>
                :
                <div className="content-cart-empty">
                    <img className="content-cart-empty-img" src={cartIsEmpty} alt='cart-is-empty' height='266'></img>
                    <span className="content-cart-empty-txt">Your Cart is Empty!</span>
                    <Link to={'/catalog/1'} className="content-cart-empty-btn">Start Shopping</Link>
                </div>
            }
            <Feedback />
        </main>
        <Footer />
        </>
    );
}