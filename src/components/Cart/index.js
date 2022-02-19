import { useSelector, useDispatch } from "react-redux";
import { CartList } from "../CartList";
import { CartShippingAdress } from "../CartShippingArdess";
import { Header } from "../Header";
import cartIsEmpty from '../../img/.png/cart_is_empty.png'
import { Footer } from "../Footer";
import { Feedback } from "../Feedback";
import { SubproceedCheckout } from "../SubproceedCheckout";
import { getCartListLength } from "../../store/cart/selectors";
import { Link, useNavigate } from "react-router-dom";
import { cleanFilter } from "../../store/filter/actions";
import { cleanFiltredList } from "../../store/cards/actions";

export const Cart = () => {
    const cartListLength = useSelector(getCartListLength);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGoingCatalog = () => {
        navigate('/catalog/1');
        dispatch(cleanFilter);
        dispatch(cleanFiltredList);
    }

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
                <section className="content-cart-empty">
                    <img className="content-cart-empty-img" src={cartIsEmpty} alt='cart-is-empty' height='266'></img>
                    <h2 className="content-cart-empty-txt">Your Cart is Empty!</h2>
                    <button onClick={handleGoingCatalog} className="content-cart-empty-btn">Start Shopping</button>
                    {/* <Link to={'/catalog/1'} className="content-cart-empty-btn">Start Shopping</Link> */}
                </section>
            }
            <Feedback />
        </main>
        <Footer />
        </>
    );
}