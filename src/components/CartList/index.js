import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCartList } from "../../store/cart/selectors";
import { CartBtns } from "../CartBtns";
import { CartListItem } from "../CartListItem";

export const CartList = () => {
    const cardsListToCart = useSelector(getCartList);

    return (
        <section className="products-added">
            {!!cardsListToCart.length ? <CartListItem cards={cardsListToCart} /> : <div>Товаров нет</div>}
            
            <CartBtns />
        </section>
    );
}