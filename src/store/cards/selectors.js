export const getCardsList = (state) => state.stateCards.cardsList;
export const getCardsListFiltred = (state) => state.stateCards.cardsListFiltred;

export const getCardsListSearched = (state) => state.stateCards.cardsListSearched;

export const getAdditionalCardsList = (state) => state.stateCards.cardsRandomList;
export const getSelectedCard = (state) => state.stateCards.cardSelected;
export const getSelectedCardCategory = (state) => state.stateCards.cardSelected?.category;
export const getAllCatalogLoaded = (state) => state.stateCards.allCatalogLoaded;
export const getSearchStatus = (state) => state.stateCards.nothingFound;
export const getSearchLinearProgress = (state) => state.stateCards.searchLinearProgress;


// export const getSelectedCard = (productId, cardsList) => (state) => {
//     
//     return 
// }

export const getHomeCardsList = (state) => state.stateCards.cardsList?.[1];

// export const getRandomCard = (state) => {
//     const randomCardList = state.stateCards.cardsList
// }
// export const getHomeCardsList = (state) => state.stateCards.cardsList?.[1]?.slice(0, 6);