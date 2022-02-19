import { CircularProgress } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { cleanRandomList, requestRandomCard } from '../../store/cards/actions';
import { getAdditionalCardsList, getSelectedCard } from '../../store/cards/selectors';
import { AdditionalProductsItem } from '../AdditionalProductsItem';

export const AdditionalProducts = () => {
    const dispatch = useDispatch();
    const additionalCardsList = useSelector(getAdditionalCardsList);
    const selectedCard = useSelector(getSelectedCard);
    const [requestExist, setRequestExist] = useState(false);
    const [mainSelectedCard, setMainSelectedCard] = useState(0);
    const { productId } = useParams();

    useEffect(() => {
        if (!Object.keys(selectedCard || {}).length || additionalCardsList.length || requestExist) return;
        setRequestExist(true);
        dispatch(requestRandomCard(selectedCard?.category?.toLowerCase()));
    }, [selectedCard])


    useEffect(() => {
        if (Object.keys(selectedCard || {}).length && !mainSelectedCard) setMainSelectedCard(selectedCard.id);
    }, [selectedCard])


    useEffect(() => {
        if (!mainSelectedCard) return;
        if (!additionalCardsList.length) return

        const additionalCard = additionalCardsList.find(card => card.id === +productId);
        if (additionalCard || (+productId === mainSelectedCard)) return
        setMainSelectedCard(+productId);
        dispatch(cleanRandomList())
        dispatch(requestRandomCard(selectedCard?.category?.toLowerCase()));
    }, [mainSelectedCard, additionalCardsList])


    useEffect(() => {
        if (additionalCardsList.length) setRequestExist(false);
    }, [additionalCardsList])


    return (
        <>
        <section className="others-products">
            <h3 className='others-products-title'>You may also like</h3>
            {!additionalCardsList.length && <div className="circular-progress-wrp"><CircularProgress color="secondary" size={100} className="circular-progress" /></div>}
            <AdditionalProductsItem cards={additionalCardsList} />
        </section>
        </>
    );
}