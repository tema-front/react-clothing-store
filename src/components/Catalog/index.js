import LinearProgress from "@material-ui/core/LinearProgress" 
import { useEffect, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { allProductsLoaded, cardsFilter, requestAllCardsDatas, requestCardsDatas } from "../../store/cards/actions";
import { getAllCatalogLoaded, getCardsList, getCardsListFiltred, getCardsListSearched, getSearchLinearProgress, getSearchStatus } from "../../store/cards/selectors";
import { getFilters } from "../../store/filter/selectors";
import { CatalogSettings } from "../CatalogSettings";
import { Features } from "../Features";
import { Feedback } from "../Feedback";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { Pagination } from "../Pagination";
import nothingFoundImg from '../../img/.png/nothing-found.png'
import { ProductCard } from "../ProductCard";
import { CircularProgress } from "@material-ui/core";

export const Catalog = () => {
    const cardsList = useSelector(getCardsList);
    const catalogLoaded = useSelector(getAllCatalogLoaded);
    const filters = useSelector(getFilters);
    const cardsListFiltred = useSelector(getCardsListFiltred);
    const cardsListSearched = useSelector(getCardsListSearched);
    const nothingFound = useSelector(getSearchStatus);
    const searchLinearProgress = useSelector(getSearchLinearProgress);
    const dispatch = useDispatch();
    const { pageId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (pageId > 20) {
            navigate('/notfound')
            return
        }
        if ((cardsList?.[+pageId]) || !pageId) return;
        dispatch(requestCardsDatas(+pageId));
    }, [pageId])

    useEffect(() => {
        if (Object.keys(cardsList).length === 20 && !catalogLoaded) dispatch(allProductsLoaded);
    }, [cardsList])

    useEffect(() => {
        if ((Object.values(filters)[0] || Object.values(filters)[1] || Object.values(filters)[2]) && !catalogLoaded) {
            dispatch(requestAllCardsDatas());
        }
    }, [filters])

    useEffect(() => {
        if ((!Object.keys(cardsListFiltred).length) && catalogLoaded && (Object.values(filters)[0] || Object.values(filters)[1] || Object.values(filters)[2])) {
            dispatch(cardsFilter(filters));
        }
    }, [catalogLoaded, filters])

    useEffect(() => {
        if (!pageId) navigate(`/catalog/1`);
    }, []);

    return (
        <>
        <Header isCatalog={true} title={'catalog'}/>
        <main className="content-catalog">
            <CatalogSettings />  
            <section className="catalog-products products">
                {searchLinearProgress && <LinearProgress className="search-linear-progress" color="secondary" />}
                {((filters.category || filters.brand || filters.designer) && !Object.keys(cardsListSearched).length) 
                    ? 
                    <>
                    {!cardsListFiltred?.[pageId] && <div className="circular-progress-wrp"><CircularProgress color="secondary" size={100} className="circular-progress" /></div>}
                    <ProductCard cards={cardsListFiltred?.[pageId]} />
                    </> 
                    : 
                    (Object.keys(cardsListSearched).length && !nothingFound) 
                        ? 
                        <>
                        {!cardsListSearched?.[pageId] && <div className="circular-progress-wrp"><CircularProgress color="secondary" size={100} className="circular-progress" /></div>}
                        <ProductCard cards={cardsListSearched?.[pageId]} /> 
                        </>
                        : 
                        nothingFound 
                            ? 
                            <section className="nothing-found-wrp">
                                <h3 className="nothing-found-title">Oops!</h3>
                                <span className="nothing-found-txt">Nothing found. We couldn't find what you're looking for.</span>
                                <img className="nothing-found-img" src={nothingFoundImg} alt='SearchNotFound' height='452'></img>
                            </section> 
                            :
                            <>
                            {!cardsList?.[pageId] && <div className="circular-progress-wrp"><CircularProgress color="secondary" size={100} className="circular-progress" /></div>}
                            <ProductCard cards={cardsList?.[pageId]} />
                            </> 
                }
                <Pagination pageId={pageId} />
            </section>
            <Features />
            <Feedback />
            <Footer />
        </main>
        </>
    );
}