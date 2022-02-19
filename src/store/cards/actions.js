import { onValue, ref } from "firebase/database";
import { db } from "../../services/firebase";

export const ADD_CARD = 'CARDS::ADD_CARD';
export const ADD_FILTRED_CARD = 'CARDS::ADD_FILTRED_CARD';
export const ADD_SEARCHED_CARD = 'CARDS::ADD_SEARCHED_CARD';
export const CLEAN_FILTRED_LIST = 'CARDS::CLEAN_FILTRED_LIST';
export const CLEAN_SEARCHED_LIST = 'CARDS::CLEAN_SEARCHED_LIST';
export const ADD_RANDOM_CARD = 'CARDS::ADD_RANDOM_CARD';
export const ADD_SELECTED_CARD = 'CARDS::ADD_SELECTED_CARD';
export const CLEAN_RANDOM_LIST = 'CARDS::CLEAN_RANDOM_LIST';
export const ALL_PRODUCTS_LOADED = 'CARDS::ALL_PRODUCTS_LOADED';
export const SEARCH_RESULT_TRUE = 'CARDS::SEARCH_RESULT_TRUE';
export const NOTHING_FOUND = 'CARDS::NOTHING_FOUND';
export const SEARCH_DELAY_START = 'CARDS::SEARCH_DELAY_START';
export const SEARCH_DELAY_END = 'CARDS::SEARCH_DELAY_END';

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

const addSearchedCard = (cardInfo, pageId) => ({
    type: ADD_SEARCHED_CARD,
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

export const cleanSearchedList = {
    type: CLEAN_SEARCHED_LIST,
}

export const allProductsLoaded = {
    type: ALL_PRODUCTS_LOADED
}

export const nothingFound = {
    type: NOTHING_FOUND
}

export const searchResultTrue = {
    type: SEARCH_RESULT_TRUE
}


export const searchDelayStart = {
    type: SEARCH_DELAY_START
}

export const searchDelayEnd = {
    type: SEARCH_DELAY_END
}

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
    }
}

export const cardsFilter = () => (dispatch, getState) => {

    const cardsList = Object.values(getState().stateCards.cardsList);
    let filtredList = []
    const { category, brand, designer } = getState().stateFilter.filters;
    
    for (let i = 0; i < 20; i++) {
        cardsList[i].forEach(card => {
            let rexExp = new RegExp(`\\b${category}\\b`)
            if ((category || brand || designer) && 
                (card.category.match(rexExp)) && (card.brand.includes(brand)) && (card.designer.includes(designer))
            ) {
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

export const cardsSearch = (searchValue) => (dispatch, getState) => {
    dispatch(cleanSearchedList);
    const cardsList = Object.values(getState().stateCards.cardsList);
    let searchedList = [];
    for (let i = 0; i < 20; i++) {
        cardsList[i].forEach(card => {
            if (
                ((card.description.replace(/\r?\n/g, " ").toLowerCase()).includes(searchValue.toLowerCase())) || 
                ((card.title.replace(/\r?\n/g, " ").toLowerCase()).includes(searchValue.toLowerCase())) ||
                ((card.category.toLowerCase()).includes(searchValue.toLowerCase())) ||
                ((card.brand.toLowerCase()).includes(searchValue.toLowerCase())) ||
                ((card.designer.toLowerCase()).includes(searchValue.toLowerCase()))
                ) {
                searchedList = [...searchedList, card];
            }
        })
    }

    if (!searchedList.length) {
        dispatch(nothingFound)
    } else {
        dispatch(searchResultTrue)
    }

    for (let i = 1; i <= Math.ceil(searchedList.length / 12); i++) {
        for (let j = 0; j < 12; j++) {
            if (!(searchedList[(i - 1) * 12 + j])) return
            dispatch(addSearchedCard(searchedList[(i - 1) * 12 + j], i));
        }
    }
}

export const requestAllCardsDatas = () => async (dispatch, getState) => {
    try {
        const catalogDbRef = ref(db, `catalog/`);
        await onValue(catalogDbRef, (snapshot) => {
            const datas = snapshot.val();
            for (let i = 1; i <= 20; i++) {
                dispatch(addCard(Object.values(datas[`page${i}`]), i));
                if (i === 20) dispatch(allProductsLoaded);
            }
        })
    } catch(error) {
        console.log(error);
    }
}


export const requestSelectedCard = (cardId) => async (dispatch) => {
    const pageId = Math.ceil(cardId / 12);
    let cardSerialNumber = cardId - (Math.floor(cardId / 12) * 12);
    if (cardId <= 12) cardSerialNumber = cardId;
    try {
        const selectedProductDbRef = ref(db, `catalog/page${pageId}/${cardSerialNumber || 12}`);
        await onValue(selectedProductDbRef, (snapshot) => {
            const datasSelectedCard = snapshot.val();
            dispatch(addSelectedCard(datasSelectedCard))
        })
    } catch(error) {
        console.log(error);
    }
}

export const requestRandomCard = (selectedCardCategory) => async (dispatch) => {
    const additionalProductDbRef = ref(db, `categories/${selectedCardCategory}/`);
    onValue(additionalProductDbRef, (snapshot) => {
        let additionalCardsList = [];
        let datasAdditionalCard = snapshot.val();

        while (additionalCardsList.length < 3) {
            let randomPageId =  (Math.floor(Math.random() * (Object.keys(datasAdditionalCard).length - 1) + 1));
            randomPageId = `page${randomPageId}`
            let newRandomProductId = (Math.floor(Math.random() * (datasAdditionalCard[randomPageId].length - 1) + 1));
            if (additionalCardsList.includes(newRandomProductId)) continue;
            additionalCardsList.push(newRandomProductId);
            dispatch(addRandomCard(datasAdditionalCard[randomPageId][newRandomProductId]));
        }
    })
}