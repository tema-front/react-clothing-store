import { ADD_CARD, ADD_RANDOM_CARD, ADD_SELECTED_CARD } from "./action"
// import product_12009 from '../../img/.jpg/products_card/product_12009.jpg'
// import product_12019 from '../../img/.jpg/products_card/product_12019.jpg'
// import product_12029 from '../../img/.jpg/products_card/product_12029.jpg'
// import product_12039 from '../../img/.jpg/products_card/product_12039.jpg'
// import product_12049 from '../../img/.jpg/products_card/product_12049.jpg'
// import product_12059 from '../../img/.jpg/products_card/product_12059.jpg'
// https://picsum.photos/{width}/{heiht}?random=${cardInfo.id}
const initialState = {
    // cardsList: [
    //     // {page1: [{title: 'jacket', description: '', price: '52', category: '', brand: '', designer: '', size: '', id: product_12009}]},
    //     // [{title: 'jacket', description: '', price: '52', category: '', brand: '', designer: '', size: '', id: product_12009}],
    //     // {title: 'jacket', description: '', price: '52', category: '', brand: '', designer: '', size: '', id: product_12009},
    //     // {title: 'costume | throusers \u0026 jacket', description: '', price: '60', category: '', brand: '', designer: '', size: '', id: product_12019},
    //     // {title: 'hoodie \u0026 panama hat', description: '', price: '45', category: '', brand: '', designer: '', size: '', id: product_12029},
    //     // {title: 't-shirt \u0026 pants', description: '', price: '59', category: '', brand: '', designer: '', size: '', id: product_12039},
    //     // {title: 'blazer', description: '', price: '70', category: '', brand: '', designer: '', size: '', id: product_12049},
    //     // {title: 'shirt', description: '', price: '36', category: '', brand: '', designer: '', size: '', id: product_12059},
    // ]
    cardsList: {},
    cardsRandomList: [],
    cardSelected: {},



}

export const cardsReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        // case ADD_CARD: {
        //     return {
        //         ...state, 
        //         cardsList: {...state.cardsList, 
        //             [payload.pageId]: [...state.cardsList[payload.pageId] || [],
        //                 {title: payload.cardInfo.name, description: payload.cardInfo.body, id: payload.cardInfo.id, price: Math.floor(Math.random() * 100) + 21}
        //             ]
        //         }
        //     }
        // }

        case ADD_RANDOM_CARD: {
            debugger
            return {
                ...state, 
                cardsRandomList: [...state.cardsRandomList, payload.cardInfo]
            }
        }

        case ADD_SELECTED_CARD: {
            const newCardSelected = payload?.cardInfo
            return {
                ...state, 
                cardSelected: newCardSelected
            }
        }


    
        // FIREBASE

        case ADD_CARD: {
            return {
                ...state, 
                cardsList: {...state.cardsList, 
                    [payload.pageId]: [...state.cardsList[payload.pageId] || [], ...payload.cardInfo]
                }
            }
        }


        default: return state;
    }
}