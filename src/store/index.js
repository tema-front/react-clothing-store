import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import { cardsReducer } from './cards/reducer'
import { cartReducer } from './cart/reducer'

const rootReducer = combineReducers({
    stateCards: cardsReducer,
    stateCart: cartReducer
})

const composeEnhancert = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const Store = createStore(
    rootReducer,
    composeEnhancert(applyMiddleware(thunk))
)