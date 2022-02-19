import LinearProgress from "@material-ui/core/LinearProgress" 
import { onValue, ref, set } from "firebase/database";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { db } from "../../services/firebase";
import { allProductsLoaded, cardsFilter, cleanFiltredList, requestAllCardsDatas, requestCardsDatas } from "../../store/cards/actions";
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
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (pageId > 20) {
            navigate('/notfound')
            return
        }
        if ((cardsList?.[+pageId]) || !pageId) return;
        dispatch(requestCardsDatas(+pageId));
    }, [pageId])

    // useEffect(() => {
    //     debugger
    //     console.log(params);
    //     console.log(Object.values(params));
    //     console.log(Object.keys(params));

    //     console.log(filters);
    //     console.log(Object.values(filters));
    //     console.log(Object.keys(filters));
    //     for (let i = 0; i < Object.keys(filters).length; i++) {
    //         if (!filters[Object.keys(filters)[i]] && (Object.keys(params)[i] !== Object.keys(filters)[i])) {
    //             console.log(123);
    //         }
    //     }

    // }, [])

    useEffect(() => {
        if (Object.keys(cardsList).length === 20 && !catalogLoaded) dispatch(allProductsLoaded);
    }, [cardsList])

    useEffect(() => {
        if ((Object.values(filters)[0] || Object.values(filters)[1] || Object.values(filters)[2]) && !catalogLoaded) {
            dispatch(requestAllCardsDatas());
        }
        // !Object.keys(selectedCard).length
    }, [filters])


    // const handleCardsFilter = useCallback(() => {
    //     debugger
    //     if ((Object.values(filters)[0] || Object.values(filters)[1] || Object.values(filters)[2]) && catalogLoaded) {
    //         dispatch(cardsFilter(filters));
    //     }
    // }, [catalogLoaded, filters])

    useEffect(() => {
        //  сделать лучше это 

        // dispatch(cleanFiltredList);
        if ((!Object.keys(cardsListFiltred).length) && catalogLoaded && (Object.values(filters)[0] || Object.values(filters)[1] || Object.values(filters)[2])) {
            dispatch(cardsFilter(filters));
        }
    }, [catalogLoaded, filters])

    useEffect(() => {
        // создание карточек в firebase
        // for (let page = 1; page <= 20; page++) {
        //     let cardsStart = 12 * page - 12 + 1

        //     for (let id = cardsStart; id < cardsStart + 12; id++) {
        
        //         try {
        //             const request = await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`);
        //             if (!request.ok) {
        //                 throw new Error('Error request.ok');
        //             }
                    
        //             const result = await request.json()
        //             // dispatch(addCard(result, pageId))
        //             // 1 - 12   13 - 12    25 - 24      37 - 36      49 -48
        //             set(ref(db, `catalog/page${page}/${id - cardsStart + 1}`), {
        //                 title: result.name,
        //                 description: result.body,
        //                 id: result.id,
        //                 price: Math.floor(Math.random() * 100) + 21,
        //                 category: ['men', 'women', 'kids', 'accessories'][Math.floor(Math.random() * 4)],
        //                 brand: ['Royal Fashion', 'EcoLime', 'UnionClothing'][Math.floor(Math.random() * 3)],
        //                 designer: ['Coco Chanel', 'Christian Dior'][Math.floor(Math.random() * 2)]
        //             })
        
        //         } catch(error) {
        //             // dispatch()
        //         }
        //     }
        // }
        
        // const database = ref(db, `catalog/page1}`);
        // onValue(database, (snapshot) => {
            
        //     const datasAdditionalCard = snapshot.val();
            // if (datasAdditionalCard?.category === selectedCardCategory && i !== 3) {
                // i++;
            // } else {
                // requestRandomCard(selectedCardCategory);
            // }
        // })


        // создание категорий на firebase
        // let numberCard = 1;
        // let newPageId = 1;
        // for (let i = 1; i <= 20; i ++) {
        //     const pagesDatabase = ref(db, `catalog/page${i}/`);
        //     onValue(pagesDatabase, (snapshot) => {
                
        //         const datasPage = snapshot.val();
        //         datasPage?.forEach(card => {
        //             if (numberCard === 13) {
        //                 newPageId++;
        //                 numberCard = 1;
        //             }
        //             if (card.category === 'accessories') {
        //                 set(ref(db, `categories/accessories/page${newPageId}/${numberCard}`), {
        //                     title: card.title,
        //                     description: card.description,
        //                     id: card.id,
        //                     price: card.price,
        //                     category: card.category,
        //                     brand: card.brand,
        //                     designer: card.designer
        //                 })
        //                 numberCard++;
        //             }
        //         })
        //     })
        // }
        if (!pageId) navigate(`/catalog/1`);
    }, []);

    return (
        <>
        <Header isCatalog={true} title={'catalog'}/>
        <main className="content-catalog">
            <CatalogSettings />  
            <section className="catalog-products products">
                {searchLinearProgress && <LinearProgress className="search-linear-progress" color="secondary" />}
                {((filters.category || filters.brand || filters.designer) && !Object.keys(cardsListSearched).length) ? 
                    <>
                        {!cardsListFiltred?.[pageId] && <div className="circular-progress-wrp"><CircularProgress color="secondary" size={100} className="circular-progress" /></div>}
                        <ProductCard cards={cardsListFiltred?.[pageId]} />
                    </> : 
                    (Object.keys(cardsListSearched).length && !nothingFound) ? 
                        <>
                            {!cardsListSearched?.[pageId] && <div className="circular-progress-wrp"><CircularProgress color="secondary" size={100} className="circular-progress" /></div>}
                            <ProductCard cards={cardsListSearched?.[pageId]} /> 
                        </>
                        : 
                    nothingFound ? 
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

                {/* <ProductCard cards={cardsList?.[pageId]} /> */}
                <Pagination pageId={pageId} />
            </section>
            <Features />
            <Feedback />
            <Footer />
        </main>

        </>
    );
}