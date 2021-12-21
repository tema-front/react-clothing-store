export const ADD_CARD_TO_CART = 'CART::ADD_CARD_TO_CART';
export const REMOVE_CARD_FROM_CART = 'CART::REMOVE_CARD_FROM_CART';
export const EMPTY_CART = 'CART::EMRTY_CART';

export const addCardToCart = (cardInfo) => ({
    type: ADD_CARD_TO_CART,
    payload: cardInfo
})

export const emptyCart = {
    type: EMPTY_CART
}

export const removeCardFromCart = (cardId) => ({
    type: REMOVE_CARD_FROM_CART,
    payload: cardId
})