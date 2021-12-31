import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { requestRandomCard } from '../../store/cards/action';
import { getAdditionalCardsList, getCardsList, getSelectedCard } from '../../store/cards/selectors';
import { AdditionalProductsItem } from '../AdditionalProductsItem';

export const AdditionalProducts = () => {
    const dispatch = useDispatch();
    const additionalCardsList = useSelector(getAdditionalCardsList);
    const selectedCard = useSelector(getSelectedCard);
    const { pageId } = useParams();

    useEffect(() => {
        
        // отчищать список рандомных карточек!
        // if (additionalCardsList.length || !Object.keys(selectedCard).length) return;
        if (!Object.keys(selectedCard).length || additionalCardsList.length) return;
        // dispatch(requestRandomCard(selectedCard?.category)) 
        dispatch(requestRandomCard(selectedCard?.category?.[0]?.toUpperCase() + selectedCard?.category.slice(1)?.toLowerCase())) 
    }, [selectedCard])

    return (
        <>
        <section class="others-products">
            <span className='others-products-title'>You may also like</span>
            <AdditionalProductsItem cards={additionalCardsList} />
        </section>
        </>
    );
}