import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { requestRandomCard } from '../../store/cards/action';
import { getAdditionalCardsList, getCardsList } from '../../store/cards/selectors';
import { AdditionalProductsItem } from '../AdditionalProductsItem';

export const AdditionalProducts = () => {
    const dispatch = useDispatch();
    const additionalCardsList = useSelector(getAdditionalCardsList);

    useEffect(() => {
        if (additionalCardsList.length) return;
       dispatch(requestRandomCard()) 
    }, [])

    return (
        <>
        <section class="others-products">
            <span className='others-products-title'>You may also like</span>
            <AdditionalProductsItem cards={additionalCardsList} />
        </section>
        </>
    );
}