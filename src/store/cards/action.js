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
//     
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
//     
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
        
        const catalogDbRef = ref(db, `catalog/page${pageId}`);
        await onValue(catalogDbRef, (snapshot) => {
            
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
    
    const pageId = Math.ceil(cardId / 12);
    const cardSerialNumber = cardId - (Math.floor(cardId / 12) * 12);
    if (cardId <= 12) cardSerialNumber = cardId;
    try {
        
        const selectedProductDbRef = ref(db, `catalog/page${pageId}/${cardSerialNumber}`);
        await onValue(selectedProductDbRef, (snapshot) => {
            
            const datasSelectedCard = snapshot.val();
            dispatch(addSelectedCard(datasSelectedCard))
        })
    } catch(error) {
        console.log(error);
        // dispatch()
    }
}

export const requestRandomCard = (selectedCardCategory) => async (dispatch) => {
    // for (let i = 1; i <= 3; i++) {
            const randomCardId = Math.floor(Math.random() * (4 - 1) + 1);
    
                const additionalProductDbRef = ref(db, `catalog/category${selectedCardCategory}/`);
                // const additionalProductDbRef = ref(db, `catalog/category${selectedCardCategory}/page${randomPageId}/${randomCardId}`);
                onValue(additionalProductDbRef, (snapshot) => {
                    
                    let datasAdditionalCard = snapshot.val();
                    let randomProductId = null;
                    for (let i = 1; i <= 3; i++) {
                        let randomPageId =  (Math.floor(Math.random() * (Object.keys(datasAdditionalCard).length - 1) + 1));
                        randomPageId = `page${randomPageId}`
                        let newRandomProductId = (Math.floor(Math.random() * (datasAdditionalCard[randomPageId].length - 2) + 1));
                        if (newRandomProductId === randomProductId) {
                            i--;
                            continue;
                        }
                        randomProductId = newRandomProductId
                        console.log(datasAdditionalCard[randomPageId]);
                        dispatch(addRandomCard(datasAdditionalCard[randomPageId][randomProductId]));
                    }
                    // if (datasAdditionalCard?.category === selectedCardCategory && i !== 3) {
                        // let randomPageId =  (Math.floor(Math.random() * (Object.keys(datasAdditionalCard).length - 1) + 1));
                        // randomPageId = `page${randomPageId}`
                        // // const randomPageId =  (Math.floor(Math.random() * (datasAdditionalCard.length - 1) + 1));
                        // const randomProductId = (Math.floor(Math.random() * (datasAdditionalCard[randomPageId].length - 2) + 1));
                        // console.log(datasAdditionalCard[randomPageId]);
                        // dispatch(addRandomCard(datasAdditionalCard[randomPageId][randomProductId]));
                        // i++;
                    // } else {
                        // requestRandomCard(selectedCardCategory);
                    // }
                })

    // }

}