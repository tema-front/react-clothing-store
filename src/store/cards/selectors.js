export const getCardsList = (state) => state.stateCards.cardsList;
export const getAdditionalCardsList = (state) => state.stateCards.cardsRandomList;
export const getSelectedCard = (state) => state.stateCards.cardSelected;

// export const getSelectedCard = (productId, cardsList) => (state) => {
//     debugger
//     return 
// }

export const getHomeCardsList = (state) => state.stateCards.cardsList?.[1];

// export const getRandomCard = (state) => {
//     const randomCardList = state.stateCards.cardsList
// }
// export const getHomeCardsList = (state) => state.stateCards.cardsList?.[1]?.slice(0, 6);