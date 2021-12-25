export const ADD_CARD = 'CARDS::ADD_CARD';
export const ADD_RANDOM_CARD = 'CARDS::ADD_RANDOM_CARD';
export const ADD_SELECTED_CARD = 'CARDS::ADD_SELECTED_CARD';

const addCard = (cardInfo, pageId) => ({
    type: ADD_CARD,
    payload: {
        cardInfo,
        pageId
    }
})

const addRandomCard = (cardInfo) => ({
    type: ADD_RANDOM_CARD,
    payload: {
        cardInfo
    }
})

const addSelectedCard = (cardInfo) => ({
    type: ADD_SELECTED_CARD,
    payload: {
        cardInfo
    }
})

export const requestCardsDatas = (pageId) => async (dispatch, getState) => {
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

export const requestRandomCard = () => async (dispatch) => {
    debugger
    for (let i = 1; i <= 3; i++) {
        const randomCardId = Math.floor(Math.random() * (240 - 1) + 1);
        try {
            const request = await fetch(`https://jsonplaceholder.typicode.com/comments/${randomCardId}`);
            if (!request.ok) {
                throw new Error('Error request.ok');
            }
            const result = await request.json()
            dispatch(addRandomCard(result))
        } catch(error) {
            console.log(error);
            // dispatch()
        }
    }
}

export const requestSelectedCard = (cardId) => async (dispatch) => {
    debugger
    try {
        const request = await fetch(`https://jsonplaceholder.typicode.com/comments/${cardId}`);
        if (!request.ok) {
            throw new Error('Error request.ok');
        }
        const result = await request.json()
        dispatch(addSelectedCard(result))
    } catch(error) {
        console.log(error);
        // dispatch()
    }
}
