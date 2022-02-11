export const ADD_CARD_TO_CART = 'CART::ADD_CARD_TO_CART';
export const REMOVE_CARD_FROM_CART = 'CART::REMOVE_CARD_FROM_CART';
export const EMPTY_CART = 'CART::EMRTY_CART';
export const INCREASE_QUANTITY = 'CART::INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'CART::DECREASE_QUANTITY';
export const CHANGE_SIZE = 'CART::CHANGE_SIZE';
export const CHANGE_COLOR = 'CART::CHANGE_COLOR';

export const addCardToCart = (cardInfo, color, size, quantity) => ({
    type: ADD_CARD_TO_CART,
    payload: {
        cardInfo: cardInfo,
        color: color,
        size: size,
        quantity: quantity
    }
})

export const emptyCart = {
    type: EMPTY_CART
}

export const removeCardFromCart = (cardId) => ({
    type: REMOVE_CARD_FROM_CART,
    payload: cardId
})

export const increaseQuantity = (cardInfo) => ({
    type: INCREASE_QUANTITY,
    payload: cardInfo
})

export const decreaseQuantity = (cardInfo) => ({
    type: DECREASE_QUANTITY,
    payload: cardInfo
})

export const changeSize = (cardId, size) => ({
    type: CHANGE_SIZE,
    payload: {
        cardId: cardId,
        size: size
    }
})

export const changeColor = (cardId, color) => ({
    type: CHANGE_COLOR,
    payload: {
        cardId: cardId,
        color: color
    }
})