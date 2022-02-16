import { ADD_CARD_TO_CART, CHANGE_COLOR, CHANGE_SIZE, DECREASE_QUANTITY, EMPTY_CART, INCREASE_QUANTITY, RECIEVE_DELIVERY_PRICE, REMOVE_CARD_FROM_CART, RESET_DELIVERY_PRICE, RESIEVE_DELIVERY_PRICE } from "./actions";

const initialState = {
    cartList: [],
    deliveryPrice: 0
}

export const cartReducer = (state = initialState, { type, payload}) => {
    switch (type) {
        case ADD_CARD_TO_CART: {
            if (state.cartList.find(card => card.id === payload.cardInfo.id)) return state

            return {
                ...state,
                cartList: [...state.cartList, {...payload.cardInfo, color: payload.color || 'Black', size: payload.size || 'S', quantity: payload.quantity || 1}]
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

        case CHANGE_SIZE: {
            const indexProduct = state.cartList.findIndex(card => card.id === payload.cardId);
            let newCartList = [...state.cartList]
            newCartList[indexProduct].size = payload.size
            return {
                ...state,
                cartList: newCartList
            }
        }

        case CHANGE_COLOR: {
            // попробовать не присваивать новый массив, а изменять основной
            const indexProduct = state.cartList.findIndex(card => card.id === payload.cardId);
            let newCartList = [...state.cartList]
            newCartList[indexProduct].color = payload.color
            return {
                ...state,
                cartList: newCartList
            }
        }

        case RECIEVE_DELIVERY_PRICE: {
            return {
                ...state,
                deliveryPrice: Math.ceil(Math.random() * 35) + 15
            }
        }

        case RESET_DELIVERY_PRICE: {
            return {
                ...state,
                deliveryPrice: 0
            }
        }
    
        default: return state;
    }
}