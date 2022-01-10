export const getCartList = (state) => state.stateCart.cartList;
export const getCartListLength = (state) => state.stateCart.cartList?.length;
export const getCartPrice = (state) => {
    debugger
    if (state.stateCart.cartList.length) {
        let price = 0
        for (let key in state.stateCart.cartList) {
            price = price + (state.stateCart.cartList[key].price * state.stateCart.cartList[key].quantity);
        }
        return price;
    }

    return 0;
}
