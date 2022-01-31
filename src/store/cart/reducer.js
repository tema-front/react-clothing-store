import { ADD_CARD_TO_CART, DECREASE_QUANTITY, EMPTY_CART, INCREASE_QUANTITY, REMOVE_CARD_FROM_CART } from "./actions";

const initialState = {
    cartList: []
}

export const cartReducer = (state = initialState, { type, payload}) => {
    switch (type) {
        case ADD_CARD_TO_CART: {
            const alreadyHave = state.cartList.find(card => card.id === payload.id)
            
            if (alreadyHave) return state

            return {
                ...state,
                cartList: [...state.cartList, {...payload, quantity: 1}]
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

        case INCREASE_QUANTITY: {
            const indexProduct = state.cartList.findIndex(card => card.id === payload.id);
            let newCartList = [...state.cartList]
            newCartList[indexProduct].quantity++
            return {
                ...state,
                cartList: newCartList
            }
        }
        case DECREASE_QUANTITY: {
            const indexProduct = state.cartList.findIndex(card => card.id === payload.id);
            let newCartList = [...state.cartList]
            newCartList[indexProduct].quantity--
            return {
                ...state,
                cartList: newCartList
            }
        }
    
        default: return state;
    }
}