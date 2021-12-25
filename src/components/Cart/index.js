import { CartList } from "../CartList";
import { CartShippingAdress } from "../CartShippingArdess";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { Feedback } from "../Feedback";
import { SubproceedCheckout } from "../SubproceedCheckout";

export const Cart = () => {
    return (
        <>
        <Header isCatalog={true} title={'shopping cart'}/>
        <main className="content-cart">
            <div className="content-cart-wrp">
                <CartList />
                <section className="products-delivery">
                    <CartShippingAdress />
                    <SubproceedCheckout />
                </section>
            </div>
            <Feedback />
        </main>
        <Footer />
        </>
    );
}