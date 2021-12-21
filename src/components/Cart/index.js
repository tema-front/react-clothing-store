import { CartList } from "../CartList";
import { Header } from "../Header";

export const Cart = () => {
    return (
        <>
        <Header isCatalog={true} title={'shopping cart'}/>
        <main className="content-cart">
        <div className="content-cart-wrp">
            <CartList />
        </div>
        </main>
        </>
    );
}