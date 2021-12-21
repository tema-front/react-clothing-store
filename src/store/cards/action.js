export const ADD_CARD = 'CARDS::ADD_CARD';

const addCard = (cardInfo, pageId) => ({
    type: ADD_CARD,
    payload: {
        cardInfo,
        pageId
    }
})

export const requstCardsDatas = (pageId) => async (dispatch, getState) => {
    debugger
    let cardsStart = 12 * pageId - 12 + 1
    if (pageId === 1) cardsStart = 1;
    for (let id = cardsStart; id < cardsStart + 12; id++) {

        try {
            const request = await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`);
            if (!request.ok) {
                throw new Error('Error request.ok');
            }
            const result = await request.json()
            dispatch(addCard(result, pageId))
        } catch(error) {
            console.log(error);
            // dispatch()
        }
    }
}