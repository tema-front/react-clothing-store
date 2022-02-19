import { ADD_CARD, ADD_FILTRED_CARD, ADD_RANDOM_CARD, ADD_SEARCHED_CARD, ADD_SELECTED_CARD, ALL_PRODUCTS_LOADED, CLEAN_FILTRED_LIST, CLEAN_RANDOM_LIST, CLEAN_SEARCHED_LIST, NOTHING_FOUND, SEARCH_DELAY_END, SEARCH_DELAY_START, SEARCH_RESULT_TRUE } from "./actions"

const initialState = {
    allCatalogLoaded: false,
    nothingFound: false,
    searchLinearProgress: false,
    cardsList: {},
    cardsRandomList: [],
    cardSelected: {},
    cardsListFiltred: {},
    cardsListSearched: {}

}

export const cardsReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ADD_RANDOM_CARD: {
            return {
                ...state, 
                cardsRandomList: [...state.cardsRandomList, payload.cardInfo]
            }
        }

        case ADD_SELECTED_CARD: {
            return {
                ...state, 
                cardSelected: payload?.cardInfo
            }
        }

        case CLEAN_RANDOM_LIST: {
            return {
                ...state,
                cardsRandomList: []
            }
        }

        case CLEAN_FILTRED_LIST: {
            
            return {
                ...state, 
                cardsListFiltred: {}
            }
        }

        case CLEAN_SEARCHED_LIST: {
            
            return {
                ...state, 
                cardsListSearched: {}
            }
        }

        case NOTHING_FOUND: {
            return {
                ...state, 
                nothingFound: true
            }
        }

        case SEARCH_RESULT_TRUE: {
            return {
                ...state, 
                nothingFound: false
            }
        }

        case SEARCH_DELAY_START: {
            return {
                ...state, 
                searchLinearProgress: true
            }
        }

        case SEARCH_DELAY_END: {
            return {
                ...state, 
                searchLinearProgress: false
            }
        }

        case ADD_CARD: {
            if (state.cardsList[payload.pageId]) return state;
            return {
                ...state, 
                cardsList: {...state.cardsList, 
                    [payload.pageId]: [...state.cardsList[payload.pageId] || [], ...payload.cardInfo]
                }
            }
        }

        case ADD_FILTRED_CARD: {
            return {
                ...state, 
                cardsListFiltred: {...state.cardsListFiltred, 
                    [payload.pageId]: [...state.cardsListFiltred[payload.pageId] || [], payload.cardInfo]
                }
            }
        }

        case ADD_SEARCHED_CARD: {
            return {
                ...state, 
                cardsListSearched: {...state.cardsListSearched, 
                    [payload.pageId]: [...state.cardsListSearched[payload.pageId] || [], payload.cardInfo]
                }
            }
        }

        case ALL_PRODUCTS_LOADED: {
            return {
                ...state,
                allCatalogLoaded: true
            }
        }


        default: return state;
    }
}