import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { cleanRandomList, requestRandomCard } from '../../store/cards/action';
import { getAdditionalCardsList, getCardsList, getSelectedCard } from '../../store/cards/selectors';
import { AdditionalProductsItem } from '../AdditionalProductsItem';

export const AdditionalProducts = () => {
    const dispatch = useDispatch();
    const additionalCardsList = useSelector(getAdditionalCardsList);
    const selectedCard = useSelector(getSelectedCard);
    const [requestExist, setRequestExist] = useState(false)
    const [currentSelectedCardId, setCurrentSelectedCardId] = useState(0);
    const [mainSelectedCard, setMainSelectedCard] = useState(0);
    const { productId } = useParams();

    useEffect(() => {

        // отчищать список рандомных карточек!
        // при открытии карточки из рандома, закрывающуюся карточку заменять местами с открывающейся
        // if (additionalCardsList.length || !Object.keys(selectedCard).length) return;
        // additionalCardsList?.forEach(item => {
            //     if (item.id === +productId) return
            //     else dispatch(clearRandomList())
            // })
        console.log(additionalCardsList);
        if (!Object.keys(selectedCard).length || additionalCardsList.length || requestExist) return;
        // if (!mainSelectedCard) setMainSelectedCard(selectedCard.id);
        setRequestExist(true)
        // dispatch(requestRandomCard(selectedCard?.category)) 
        dispatch(requestRandomCard(selectedCard?.category?.toLowerCase()));
    }, [selectedCard])


    useEffect(() => {
        debugger
        if (Object.keys(selectedCard).length && !mainSelectedCard) setMainSelectedCard(selectedCard.id);


    }, [selectedCard])


    useEffect(() => {
        debugger
        if (!mainSelectedCard) return;
        if (!additionalCardsList.length) return

        const additionalCard = additionalCardsList.find(card => card.id === +productId);
        if (additionalCard || (+productId === mainSelectedCard)) return
        setMainSelectedCard(+productId);
        dispatch(cleanRandomList())
        dispatch(requestRandomCard(selectedCard?.category?.toLowerCase()));
    }, [mainSelectedCard, additionalCardsList])



    // useEffect(() => {
    //     debugger
    //     // 1 2 3 
    //     // 10 15 20
    //     setCurrentSelectedCardId(0)
    //     if ((currentSelectedCardId !== 0) || (currentSelectedCardId !== selectedCard.id)) return;
    //     if (Object.keys(selectedCard).length && currentSelectedCardId) {
    //         console.log(currentSelectedCardId);
    //         setCurrentSelectedCardId(prev => {
    //             const additionalCard = additionalCardsList.find(card => card.id === selectedCard.id);
    //             if (!additionalCard && (selectedCard.id !== currentSelectedCardId)) {
    //                 dispatch(cleanRandomList());
    //                 return selectedCard.id;
    //             } else {
    //                 return prev;
    //             }
    //         })
    //     } else {
    //         setCurrentSelectedCardId(selectedCard.id)
    //     }
    // }, [selectedCard, currentSelectedCardId])

    useEffect(() => {
        debugger
        if (additionalCardsList.length) setRequestExist(false);
        // if (!additionalCardsList.length) dispatch(requestRandomCard(selectedCard?.category?.toLowerCase()));
    }, [additionalCardsList])


    return (
        <>
        <section class="others-products">
            <span className='others-products-title'>You may also like</span>
            <AdditionalProductsItem cards={additionalCardsList} />
        </section>
        </>
    );
}