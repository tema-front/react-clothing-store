import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import { cardsReducer } from './cards/reducer'
import { cartReducer } from './cart/reducer'
import { filterReducer } from './filter/reducer';
import { profileReducer } from './profile/reducer';

const rootReducer = combineReducers({
    stateCards: cardsReducer,
    stateCart: cartReducer,
    stateProfile: profileReducer,
    stateFilter: filterReducer
})

const composeEnhancert = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const Store = createStore(
    rootReducer,
    composeEnhancert(applyMiddleware(thunk))
)