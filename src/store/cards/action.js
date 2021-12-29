import { onValue, ref, set } from "firebase/database";
import { db } from "../../services/firebase";

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

export const addSelectedCard = (cardInfo) => ({
    type: ADD_SELECTED_CARD,
    payload: {
        cardInfo
    }
})

// export const requestCardsDatas = (pageId) => async (dispatch, getState) => {
//     debugger
//     let cardsStart = 12 * pageId - 12 + 1
//     if (pageId === 1) cardsStart = 1;
//     for (let id = cardsStart; id < cardsStart + 12; id++) {

//         try {
//             const request = await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`);
//             if (!request.ok) {
//                 throw new Error('Error request.ok');
//             }
//             const result = await request.json()
//             dispatch(addCard(result, pageId))
//         } catch(error) {
//             console.log(error);
//             // dispatch()
//         }
//     }
// }

// export const requestRandomCard = () => async (dispatch) => {
//     debugger
//     for (let i = 1; i <= 3; i++) {
//         const randomCardId = Math.floor(Math.random() * (240 - 1) + 1);
//         try {
//             const request = await fetch(`https://jsonplaceholder.typicode.com/comments/${randomCardId}`);
//             if (!request.ok) {
//                 throw new Error('Error request.ok');
//             }
//             const result = await request.json()
//             dispatch(addRandomCard(result))
//         } catch(error) {
//             console.log(error);
//             // dispatch()
//         }
//     }
// }

// export const requestSelectedCard = (cardId) => async (dispatch) => {
//     try {
//         const request = await fetch(`https://jsonplaceholder.typicode.com/comments/${cardId}`);
//         if (!request.ok) {
//             throw new Error('Error request.ok');
//         }
//         const result = await request.json()
//         dispatch(addSelectedCard(result))
//     } catch(error) {
//         console.log(error);
//         // dispatch()
//     }
// }



// FIREBASE

export const requestCardsDatas = (pageId) => async (dispatch, getState) => {
    try {
        debugger
        const catalogDbRef = ref(db, `catalog/page${pageId}`);
        await onValue(catalogDbRef, (snapshot) => {
            debugger
            const datas = snapshot.val();
            const datasArr = Object.values(datas || {})
            dispatch(addCard(datasArr, pageId))
        })
    } catch(error) {
        console.log(error);
        // dispatch()
    }
}

export const requestSelectedCard = (cardId) => async (dispatch) => {
    debugger
    const pageId = Math.ceil(cardId / 12);
    const cardSerialNumber = cardId - (Math.floor(cardId / 12) * 12);
    if (cardId <= 12) cardSerialNumber = cardId;
    try {
        debugger
        const selectedProductDbRef = ref(db, `catalog/page${pageId}/${cardSerialNumber}`);
        await onValue(selectedProductDbRef, (snapshot) => {
            debugger
            const datasSelectedCard = snapshot.val();
            dispatch(addSelectedCard(datasSelectedCard))
        })
    } catch(error) {
        console.log(error);
        // dispatch()
    }
}

export const requestRandomCard = (selectedCardCategory) => async (dispatch) => {
    for (let i = 1; i <= 3; i++) {
            let i = 0
            debugger
            const randomPageId =  Math.floor(Math.random() * (5 - 1) + 1);
            const randomCardId = Math.floor(Math.random() * (4 - 1) + 1);
    
                const additionalProductDbRef = ref(db, `catalog/category${selectedCardCategory}/page${randomPageId}/${randomCardId}`);
                onValue(additionalProductDbRef, (snapshot) => {
                    debugger
                    const datasAdditionalCard = snapshot.val();
                    // if (datasAdditionalCard?.category === selectedCardCategory && i !== 3) {
                        dispatch(addRandomCard(datasAdditionalCard));
                        // i++;
                    // } else {
                        // requestRandomCard(selectedCardCategory);
                    // }
                })

    }

}