import { ADD_BRAND, ADD_CATEGORY, ADD_DESIGNER, CLEAN_FILTER } from "./actions"

const initialState = {
    filters: {
        category: '',
        brand: '',
        designer: ''
    }
}

export const filterReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_CATEGORY: {
            return {
                ...state, 
                filters: {...state.filters, category: payload}
            }
            
        }

        case ADD_BRAND: {
            return {
                ...state,
                filters: {...state.filters, brand: payload}
            }
        }

        case ADD_DESIGNER: {
            return {
                ...state,
                filters: {...state.filters, designer: payload}
            }
        }

        case CLEAN_FILTER: {
            return {
                ...state,
                filters: {
                    category: '',
                    brand: '',
                    designer: ''
                }
            }
        }

        default: return state;
    }
}