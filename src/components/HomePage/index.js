import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Categories } from "../Categories";
import { Header } from "../Header";
import { ProductCard } from "../ProductCard";
import { Features } from "../Features";


import { Feedback } from "../Feedback";
import { Footer } from "../Footer";
import { getCardsList, getHomeCardsList } from "../../store/cards/selectors";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { requstCardsDatas } from "../../store/cards/action";

export const HomePage = () => {
    // const homeCardsList = useSelector(getHomeCardsList);
    const cardsList = useSelector(getCardsList);

    const dispatch = useDispatch();

    useEffect(() => {
        debugger
        if (cardsList?.[1]) return;
        dispatch(requstCardsDatas(1));
    }, [])

    return (
        <>
        <Header isHomePage={true}/>
        <main className="content-home">
            <Categories />
            <section className="products">
                <div className="products-info">
                    <span className="products-title">Fetured Items</span>
                    <p className="products-txt">Shop for items based on what we featured in this week</p>
                </div>
                <ProductCard cards={cardsList?.[1]?.slice(0, 6)}/>
            <div className="products-btn-wrap">
                <Link to={'/catalog/1'} className="products-btn">Browse&nbsp;All&nbsp;Product</Link>
            </div>
            </section>
            <Features />
            <Feedback />
        </main>
        <Footer />
        </>
    );
}