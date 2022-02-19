import { useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress" 
import { useSelector } from "react-redux";
import { Categories } from "../Categories";
import { Header } from "../Header";
import { ProductCard } from "../ProductCard";
import { Features } from "../Features";
import { Feedback } from "../Feedback";
import { Footer } from "../Footer";
import { getCardsList } from "../../store/cards/selectors";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cleanFiltredList, requestCardsDatas } from "../../store/cards/actions";
import { cleanFilter } from "../../store/filter/actions";

export const HomePage = () => {
    const cardsList = useSelector(getCardsList);
    const dispatch = useDispatch();

    useEffect(() => {
        if (cardsList?.[1]?.length === 12) return;
        dispatch(requestCardsDatas(1));
    }, [])


    const goTopPage = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        dispatch(cleanFiltredList);
        dispatch(cleanFilter);  
    }

    return (
        <>
        <Header isHomePage={true}/>
        <main className="content-home">
            <Categories />
            <section className="products">
                <div className="products-info">
                    <h2 className="products-title">Fetured Items</h2>
                    <p className="products-txt">Shop for items based on what we featured in this week</p>
                </div>
                {!cardsList?.[1] && <div className="circular-progress-wrp"><CircularProgress color="secondary" size={100} className="circular-progress" /></div>}
                <ProductCard cards={cardsList?.[1]?.slice(0, 6)}/>
            <div className="products-btn-wrap">
                <Link to={'/catalog/1'} className="products-btn" onClick={goTopPage}>Browse&nbsp;All&nbsp;Product</Link>
            </div>
            </section>
            <Features />
            <Feedback />
        </main>
        <Footer />
        </>
    );
}