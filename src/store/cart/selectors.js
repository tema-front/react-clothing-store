export const getCartList = (state) => state.stateCart.cartList;
export const getCartPrice = (state) => {
    debugger
    if (state.stateCart.cartList.length) {
        let price = 0
        for (let key in state.stateCart.cartList) {
            price = price + state.stateCart.cartList[key].price;
        }
        return price;
        console.log(state.stateCart.cartList); 
    }

    return 0;
}
