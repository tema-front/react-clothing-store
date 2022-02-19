import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { addSelectedCard, requestCardsDatas } from "../../store/cards/actions";
import { getCardsList, getSelectedCard } from "../../store/cards/selectors";
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
    const cardsList = useSelector(getCardsList)?.[Math.ceil(+productId / 12)];
    // const selectedCard = useSelector(getSelectedCard(+productId, cardsList))
    
    useEffect(() => {
        debugger
        if (cardInfoProp) {
            setCard(cardInfoProp);
            dispatch(addSelectedCard(cardInfoProp))
        // } else if (!Object.keys(card).length) {
        } else {
            dispatch(requestSelectedCard(+productId));
            setCard(selectedCard);
        }
        // 
        // if (cardInfo || cardsList) return
        // dispatch(requestCardsDatas(Math.ceil(+productId / 12)));
        // cardInfo = cardsList?.productId;
        
    }, [cardInfoProp, selectedCard])

    useEffect(() => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }, [])

    useEffect(() => {
        if (productId <= 240) return;
        navigate('/notfound')
    }, [productId])

    return (
        <>
        <Header isCatalog={true} title={card.brand}/>
        <main className="content-product">
            {/* <SliderSelectedProduct cardId={cardsList?.[+productId - 1]?.id}/>
            <SelectedProductInfo cardInfo={cardsList?.[+productId - 1]} />
            <AdditionalProducts cardInfo={cardsList?.[+productId - 1]} /> */}
            <SliderSelectedProduct cardId={card?.id}/>
            <SelectedProductInfo cardInfo={card} />
            <AdditionalProducts />
            <Feedback />
        </main>
        <Footer />
        </>
    );
}