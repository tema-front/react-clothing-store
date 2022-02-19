import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { addSelectedCard } from "../../store/cards/actions";
import { getSelectedCard } from "../../store/cards/selectors";
import { AdditionalProducts } from "../AdditionalProducts";
import { Feedback } from "../Feedback";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { SelectedProductInfo } from "../SelectedProductInfo";
import { requestSelectedCard } from '../../store/cards/actions';

import { SliderSelectedProduct } from "../SliderSelectedProduct";

export const PageSelectedProduct = () => {
    const dispatch = useDispatch();
    let cardInfoProp = useLocation()?.state?.cardInfo;
    const [card, setCard] = useState({});
    const { productId } = useParams();
    const navigate = useNavigate()
    const selectedCard = useSelector(getSelectedCard);
    
    useEffect(() => {
        if (cardInfoProp) {
            setCard(cardInfoProp);
            dispatch(addSelectedCard(cardInfoProp))
        } else {
            dispatch(requestSelectedCard(+productId));
            setCard(selectedCard);
        }
    }, [cardInfoProp, selectedCard])

    useEffect(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, [])

    useEffect(() => {
        if (productId <= 240) return;
        navigate('/notfound')
    }, [productId])

    return (
        <>
        <Header isCatalog={true} title={card.brand}/>
        <main className="content-product">
            <SliderSelectedProduct cardId={card?.id}/>
            <SelectedProductInfo cardInfo={card} />
            <AdditionalProducts />
            <Feedback />
        </main>
        <Footer />
        </>
    );
}