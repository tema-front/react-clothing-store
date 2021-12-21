import { ADD_CARD_TO_CART, EMPTY_CART, REMOVE_CARD_FROM_CART } from "./actions";

const initialState = {
    cartList: []
}

export const cartReducer = (state = initialState, { type, payload}) => {
    switch (type) {
        case ADD_CARD_TO_CART: {
            return {
                ...state,
                cartList: [...state.cartList, payload]
            }
        }

        case EMPTY_CART: {
            const emptyCart = []
            return {
                ...state,
                cartList: emptyCart
            }
        }

        case REMOVE_CARD_FROM_CART: {
            const newCatList = state.cartList.filter(card => card.id !== payload) || [];
            return {
                ...state,
                cartList: newCatList
            }
        }
    
        default: return state;
    }
}