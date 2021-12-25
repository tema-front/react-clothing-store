import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { requestCardsDatas } from "../../store/cards/action";
import { getCardsList, getSelectedCard } from "../../store/cards/selectors";
import { AdditionalProducts } from "../AdditionalProducts";
import { Feedback } from "../Feedback";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { SelectedProductInfo } from "../SelectedProductInfo";
import { requestSelectedCard } from '../../store/cards/action';

import { SliderSelectedProduct } from "../SliderSelectedProduct";

export const PageSelectedProduct = () => {
    const dispatch = useDispatch();
    let cardInfoProp = useLocation()?.state?.cardInfo;
    const [card, setCard] = useState({});
    const { productId } = useParams();
    const selectedCard = useSelector(getSelectedCard);
    const cardsList = useSelector(getCardsList)?.[Math.ceil(+productId / 12)];
    // const selectedCard = useSelector(getSelectedCard(+productId, cardsList))
    
    useEffect(() => {
        debugger
        if (cardInfoProp) {
            setCard(cardInfoProp)
        } else if (!Object.keys(card).length) {
            dispatch(requestSelectedCard(+productId));
            setCard(selectedCard);
        }
        // debugger
        // console.log(productId);
        // if (cardInfo || cardsList) return
        // dispatch(requestCardsDatas(Math.ceil(+productId / 12)));
        // cardInfo = cardsList?.productId;
        
    }, [cardInfoProp, selectedCard])

    return (
        <>
        <Header isCatalog={true} title={'card.category will be here'}/>
        <main class="content-product">
            {/* <SliderSelectedProduct cardId={cardsList?.[+productId - 1]?.id}/>
            <SelectedProductInfo cardInfo={cardsList?.[+productId - 1]} />
            <AdditionalProducts cardInfo={cardsList?.[+productId - 1]} /> */}
            <SliderSelectedProduct cardId={card?.id}/>
            <SelectedProductInfo cardInfo={card} />
            <AdditionalProducts cardInfo={card} />
            <Feedback />
        </main>
        <Footer />
        </>
    );
}