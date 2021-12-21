export const getCardsList = (state) => state.stateCards.cardsList;

export const getHomeCardsList = (state) => state.stateCards.cardsList?.[1];
// export const getHomeCardsList = (state) => state.stateCards.cardsList?.[1]?.slice(0, 6);