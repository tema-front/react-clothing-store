import { onValue, ref, set } from "firebase/database";
import { db } from "../../services/firebase";

export const ADD_CARD = 'CARDS::ADD_CARD';
export const ADD_FILTRED_CARD = 'CARDS::ADD_FILTRED_CARD';
export const CLEAN_FILTRED_LIST = 'CARDS::CLEAN_FILTRED_LIST';
export const ADD_RANDOM_CARD = 'CARDS::ADD_RANDOM_CARD';
export const ADD_SELECTED_CARD = 'CARDS::ADD_SELECTED_CARD';
export const CLEAN_RANDOM_LIST = 'CARDS::CLEAN_RANDOM_LIST';
export const ALL_PRODUCTS_LOADED = 'CARDS::ALL_PRODUCTS_LOADED';

const addCard = (cardInfo, pageId) => ({
    type: ADD_CARD,
    payload: {
        cardInfo,
        pageId
    }
})

const addFiltredCard = (cardInfo, pageId) => ({
    type: ADD_FILTRED_CARD,
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

export const cleanRandomList = () => ({
    type: CLEAN_RANDOM_LIST
})

export const cleanFiltredList = {
    type: CLEAN_FILTRED_LIST,
}

export const allProductsLoaded = {
    type: ALL_PRODUCTS_LOADED
}


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

export const cardsFilter = () => (dispatch, getState) => {

        
    const cardsList = Object.values(getState().stateCards.cardsList);
    let filtredList = []
    const { category, brand, designer } = getState().stateFilter.filters;
    for (let i = 0; i < 20; i++) {
        cardsList[i].forEach(card => {
            // if (card.category === category) {
            if (card.category.includes(category) && card.brand.includes(brand) && card.designer.includes(designer)) {
                filtredList = [...filtredList, card]
            }

        })
    }
    for (let i = 1; i <= Math.ceil(filtredList.length / 12); i++) {
        for (let j = 0; j < 12; j++) {
            if (!(filtredList[(i - 1) * 12 + j])) return
            dispatch(addFiltredCard(filtredList[(i - 1) * 12 + j], i));
        }
    }
}

export const requestAllCardsDatas = () => async (dispatch, getState) => {
    try {
        const catalogDbRef = ref(db, `catalog/`);
        await onValue(catalogDbRef, (snapshot) => {
            const datas = snapshot.val();
            // const datasArr = Object.values(datas || {})
            for (let i = 1; i <= 20; i++) {
                dispatch(addCard(Object.values(datas[`page${i}`]), i));
                // dispatch(addCard(Object.values(datasArr[i - 1]), i));
                if (i === 20) dispatch(allProductsLoaded);
            }
        })
    } catch(error) {
        console.log(error);
        // dispatch()
    }
}


// export const requestAllCardsDatas = () => async (dispatch, getState) => {
//     try {
//         const catalogDbRef = ref(db, `catalog/page${pageId}`);
//         await onValue(catalogDbRef, (snapshot) => {
            
//             const datas = snapshot.val();
//             const datasArr = Object.values(datas || {})
//             dispatch(addCard(datasArr, pageId))
//         })
//     } catch(error) {
//         console.log(error);
//         // dispatch()
//     }
// }

export const requestSelectedCard = (cardId) => async (dispatch) => {
    
    const pageId = Math.ceil(cardId / 12);
    let cardSerialNumber = cardId - (Math.floor(cardId / 12) * 12);
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
            // const randomCardId = Math.floor(Math.random() * (4 - 1) + 1);
    
                const additionalProductDbRef = ref(db, `categories/${selectedCardCategory}/`);
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