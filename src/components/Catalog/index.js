import { onValue, ref, set } from "firebase/database";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { db } from "../../services/firebase";
import { allProductsLoaded, cardsFilter, cleanFiltredList, requestAllCardsDatas, requestCardsDatas } from "../../store/cards/actions";
import { getAllCatalogLoaded, getCardsList, getCardsListFiltred, getCardsListSearched, getSearchStatus } from "../../store/cards/selectors";
import { getFilters } from "../../store/filter/selectors";
import { CatalogSettings } from "../CatalogSettings";
import { Features } from "../Features";
import { Feedback } from "../Feedback";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { Pagination } from "../Pagination";
import nothingFoundImg from '../../img/.png/nothing-found.png'
import { ProductCard } from "../ProductCard";

export const Catalog = () => {
    const cardsList = useSelector(getCardsList);
    const catalogLoaded = useSelector(getAllCatalogLoaded);
    const filters = useSelector(getFilters);
    const cardsListFiltred = useSelector(getCardsListFiltred);
    const cardsListSearched = useSelector(getCardsListSearched);
    const nothingFound = useSelector(getSearchStatus);
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
        debugger
        //  сделать лучше это 

        // dispatch(cleanFiltredList);
        if ((!Object.keys(cardsListFiltred).length) && catalogLoaded && (Object.values(filters)[0] || Object.values(filters)[1] || Object.values(filters)[2])) {
            dispatch(cardsFilter(filters));
        }
    }, [catalogLoaded, filters])

    useEffect(() => {
        console.log(cardsListSearched.length);
    }, [cardsListSearched])

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
        debugger
        if (!pageId) navigate(`/catalog/1`);
    }, []);

    return (
        <>
        <Header isCatalog={true} title={'catalog'}/>
        <main className="content-catalog">
            <CatalogSettings />  
        <section className="catalog-products products">
            {((filters.category || filters.brand || filters.designer) && !Object.keys(cardsListSearched).length) ? <ProductCard cards={cardsListFiltred?.[pageId]} /> : 
                (Object.keys(cardsListSearched).length && !nothingFound) ? <ProductCard cards={cardsListSearched?.[pageId]} /> : 
                nothingFound ? 
                    <section className="nothing-found-wrp">
                        <h3 className="nothing-found-title">Oops!</h3>
                        <span className="nothing-found-txt">Nothing found. We couldn't find what you're looking for.</span>
                        <img className="nothing-found-img" src={nothingFoundImg} alt='SearchNotFound' height='452'></img>
                    </section> 
                : 
                <ProductCard cards={cardsList?.[pageId]} />
            }
            {/* <ProductCard cards={cardsList?.[pageId]} /> */}
            <Pagination pageId={pageId} />
        </section>
        <Features />
        <Feedback />

            
        {/* 
        <section className="catalog-products products">
            <div className="products-wrap">
                <div className="products-item">
                    <div className="products-item-preview">
                        <img className="products-item-img" src="./img/.jpg/main_product_1.jpg" alt="products-item" height="420">
                    </div>
                    <div className="products-item-info">
                        <span className="products-item-title">ellery x m'o capsule</span>
                        <p className="products-item-txt">Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.</p>
                        <span className="products-item-price">$52.00</span>
                    </div>
                    <div className="products-item-btn">
                        <svg width="32" height="29" viewBox="0 0 32 29" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26.2009 29C25.5532 28.9738 24.9415 28.6948 24.4972 28.2227C24.0529 27.7506 23.8114 27.1232 23.8245 26.475C23.8376 25.8269 24.1043 25.2097 24.5673 24.7559C25.0303 24.3022 25.6527 24.048 26.301 24.048C26.9493 24.048 27.5717 24.3022 28.0347 24.7559C28.4977 25.2097 28.7644 25.8269 28.7775 26.475C28.7906 27.1232 28.549 27.7506 28.1047 28.2227C27.6604 28.6948 27.0488 28.9738 26.401 29H26.2009ZM6.75293 26.32C6.75293 25.79 6.91011 25.2718 7.20459 24.8311C7.49907 24.3904 7.91764 24.0469 8.40735 23.844C8.89705 23.6412 9.43594 23.5881 9.95581 23.6915C10.4757 23.7949 10.9532 24.0502 11.328 24.425C11.7028 24.7998 11.9581 25.2773 12.0615 25.7972C12.1649 26.317 12.1118 26.8559 11.9089 27.3456C11.7061 27.8353 11.3626 28.2539 10.9219 28.5483C10.4812 28.8428 9.96304 29 9.43298 29C9.08087 29.0003 8.73212 28.9311 8.40674 28.7966C8.08136 28.662 7.78569 28.4646 7.53662 28.2158C7.28755 27.9669 7.09001 27.6713 6.9552 27.3461C6.82039 27.0208 6.75098 26.6721 6.75098 26.32H6.75293ZM10.553 20.686C10.2935 20.6868 10.0409 20.6024 9.83411 20.4457C9.62727 20.2891 9.47758 20.0689 9.40796 19.819L4.57495 2.36401H1.18201C0.868521 2.36401 0.567859 2.23947 0.346191 2.01781C0.124523 1.79614 0 1.49549 0 1.18201C0 0.868519 0.124523 0.567873 0.346191 0.346205C0.567859 0.124537 0.868521 5.81268e-06 1.18201 5.81268e-06H5.46301C5.7225 -0.00080736 5.97504 0.0837201 6.18176 0.240568C6.38848 0.397416 6.53784 0.617884 6.60693 0.868006L11.4399 18.323H24.6179L29.001 8.27501H14.401C14.2428 8.27961 14.0854 8.25242 13.9379 8.19507C13.7904 8.13771 13.6559 8.05134 13.5424 7.94108C13.4288 7.83082 13.3386 7.69891 13.277 7.55315C13.2154 7.40739 13.1836 7.25075 13.1836 7.0925C13.1836 6.93426 13.2154 6.77762 13.277 6.63186C13.3386 6.4861 13.4288 6.35419 13.5424 6.24393C13.6559 6.13367 13.7904 6.0473 13.9379 5.98994C14.0854 5.93259 14.2428 5.90541 14.401 5.91001H30.814C31.0097 5.90996 31.2022 5.95866 31.3744 6.05172C31.5465 6.14478 31.6928 6.27926 31.7999 6.44301C31.9078 6.60729 31.9734 6.79569 31.9908 6.99145C32.0083 7.18721 31.9771 7.38424 31.9 7.565L26.495 19.977C26.4026 20.1876 26.251 20.3668 26.0585 20.4927C25.866 20.6186 25.641 20.6858 25.411 20.686H10.553Z" />
                        </svg> 
                        <span className="products-item-btn-txt">Add to Cart</span>
                    </div>
                </div>
                <div className="products-item"> 
                    <div className="products-item-preview">
                        <img className="products-item-img" src="./img/.jpg/main_product_2.jpg" alt="products-item" height="420">
                    </div>
                    <div className="products-item-info">
                        <span className="products-item-title">ellery x m'o capsule</span>
                        <p className="products-item-txt">Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.</p>
                        <span className="products-item-price">$52.00</span>
                    </div>
                    <div className="products-item-btn">
                        <svg width="32" height="29" viewBox="0 0 32 29" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26.2009 29C25.5532 28.9738 24.9415 28.6948 24.4972 28.2227C24.0529 27.7506 23.8114 27.1232 23.8245 26.475C23.8376 25.8269 24.1043 25.2097 24.5673 24.7559C25.0303 24.3022 25.6527 24.048 26.301 24.048C26.9493 24.048 27.5717 24.3022 28.0347 24.7559C28.4977 25.2097 28.7644 25.8269 28.7775 26.475C28.7906 27.1232 28.549 27.7506 28.1047 28.2227C27.6604 28.6948 27.0488 28.9738 26.401 29H26.2009ZM6.75293 26.32C6.75293 25.79 6.91011 25.2718 7.20459 24.8311C7.49907 24.3904 7.91764 24.0469 8.40735 23.844C8.89705 23.6412 9.43594 23.5881 9.95581 23.6915C10.4757 23.7949 10.9532 24.0502 11.328 24.425C11.7028 24.7998 11.9581 25.2773 12.0615 25.7972C12.1649 26.317 12.1118 26.8559 11.9089 27.3456C11.7061 27.8353 11.3626 28.2539 10.9219 28.5483C10.4812 28.8428 9.96304 29 9.43298 29C9.08087 29.0003 8.73212 28.9311 8.40674 28.7966C8.08136 28.662 7.78569 28.4646 7.53662 28.2158C7.28755 27.9669 7.09001 27.6713 6.9552 27.3461C6.82039 27.0208 6.75098 26.6721 6.75098 26.32H6.75293ZM10.553 20.686C10.2935 20.6868 10.0409 20.6024 9.83411 20.4457C9.62727 20.2891 9.47758 20.0689 9.40796 19.819L4.57495 2.36401H1.18201C0.868521 2.36401 0.567859 2.23947 0.346191 2.01781C0.124523 1.79614 0 1.49549 0 1.18201C0 0.868519 0.124523 0.567873 0.346191 0.346205C0.567859 0.124537 0.868521 5.81268e-06 1.18201 5.81268e-06H5.46301C5.7225 -0.00080736 5.97504 0.0837201 6.18176 0.240568C6.38848 0.397416 6.53784 0.617884 6.60693 0.868006L11.4399 18.323H24.6179L29.001 8.27501H14.401C14.2428 8.27961 14.0854 8.25242 13.9379 8.19507C13.7904 8.13771 13.6559 8.05134 13.5424 7.94108C13.4288 7.83082 13.3386 7.69891 13.277 7.55315C13.2154 7.40739 13.1836 7.25075 13.1836 7.0925C13.1836 6.93426 13.2154 6.77762 13.277 6.63186C13.3386 6.4861 13.4288 6.35419 13.5424 6.24393C13.6559 6.13367 13.7904 6.0473 13.9379 5.98994C14.0854 5.93259 14.2428 5.90541 14.401 5.91001H30.814C31.0097 5.90996 31.2022 5.95866 31.3744 6.05172C31.5465 6.14478 31.6928 6.27926 31.7999 6.44301C31.9078 6.60729 31.9734 6.79569 31.9908 6.99145C32.0083 7.18721 31.9771 7.38424 31.9 7.565L26.495 19.977C26.4026 20.1876 26.251 20.3668 26.0585 20.4927C25.866 20.6186 25.641 20.6858 25.411 20.686H10.553Z" />
                        </svg> 
                        <span className="products-item-btn-txt">Add to Cart</span>
                    </div>
                </div>
                <div className="products-item">
                    <div className="products-item-preview">
                        <img className="products-item-img" src="./img/.jpg/main_product_3.jpg" alt="products-item" height="420">
                    </div>
                    <div className="products-item-info">
                        <span className="products-item-title">ellery x m'o capsule</span>
                        <p className="products-item-txt">Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.</p>
                        <span className="products-item-price">$52.00</span>
                    </div>
                    <div className="products-item-btn">
                        <svg width="32" height="29" viewBox="0 0 32 29" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26.2009 29C25.5532 28.9738 24.9415 28.6948 24.4972 28.2227C24.0529 27.7506 23.8114 27.1232 23.8245 26.475C23.8376 25.8269 24.1043 25.2097 24.5673 24.7559C25.0303 24.3022 25.6527 24.048 26.301 24.048C26.9493 24.048 27.5717 24.3022 28.0347 24.7559C28.4977 25.2097 28.7644 25.8269 28.7775 26.475C28.7906 27.1232 28.549 27.7506 28.1047 28.2227C27.6604 28.6948 27.0488 28.9738 26.401 29H26.2009ZM6.75293 26.32C6.75293 25.79 6.91011 25.2718 7.20459 24.8311C7.49907 24.3904 7.91764 24.0469 8.40735 23.844C8.89705 23.6412 9.43594 23.5881 9.95581 23.6915C10.4757 23.7949 10.9532 24.0502 11.328 24.425C11.7028 24.7998 11.9581 25.2773 12.0615 25.7972C12.1649 26.317 12.1118 26.8559 11.9089 27.3456C11.7061 27.8353 11.3626 28.2539 10.9219 28.5483C10.4812 28.8428 9.96304 29 9.43298 29C9.08087 29.0003 8.73212 28.9311 8.40674 28.7966C8.08136 28.662 7.78569 28.4646 7.53662 28.2158C7.28755 27.9669 7.09001 27.6713 6.9552 27.3461C6.82039 27.0208 6.75098 26.6721 6.75098 26.32H6.75293ZM10.553 20.686C10.2935 20.6868 10.0409 20.6024 9.83411 20.4457C9.62727 20.2891 9.47758 20.0689 9.40796 19.819L4.57495 2.36401H1.18201C0.868521 2.36401 0.567859 2.23947 0.346191 2.01781C0.124523 1.79614 0 1.49549 0 1.18201C0 0.868519 0.124523 0.567873 0.346191 0.346205C0.567859 0.124537 0.868521 5.81268e-06 1.18201 5.81268e-06H5.46301C5.7225 -0.00080736 5.97504 0.0837201 6.18176 0.240568C6.38848 0.397416 6.53784 0.617884 6.60693 0.868006L11.4399 18.323H24.6179L29.001 8.27501H14.401C14.2428 8.27961 14.0854 8.25242 13.9379 8.19507C13.7904 8.13771 13.6559 8.05134 13.5424 7.94108C13.4288 7.83082 13.3386 7.69891 13.277 7.55315C13.2154 7.40739 13.1836 7.25075 13.1836 7.0925C13.1836 6.93426 13.2154 6.77762 13.277 6.63186C13.3386 6.4861 13.4288 6.35419 13.5424 6.24393C13.6559 6.13367 13.7904 6.0473 13.9379 5.98994C14.0854 5.93259 14.2428 5.90541 14.401 5.91001H30.814C31.0097 5.90996 31.2022 5.95866 31.3744 6.05172C31.5465 6.14478 31.6928 6.27926 31.7999 6.44301C31.9078 6.60729 31.9734 6.79569 31.9908 6.99145C32.0083 7.18721 31.9771 7.38424 31.9 7.565L26.495 19.977C26.4026 20.1876 26.251 20.3668 26.0585 20.4927C25.866 20.6186 25.641 20.6858 25.411 20.686H10.553Z" />
                        </svg> 
                        <span className="products-item-btn-txt">Add to Cart</span>
                    </div>
                </div>
                <div className="products-item">
                    <div className="products-item-preview">
                        <img className="products-item-img" src="./img/.jpg/main_product_4.jpg" alt="products-item" height="420">
                    </div>
                    <div className="products-item-info">
                        <span className="products-item-title">ellery x m'o capsule</span>
                        <p className="products-item-txt">Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.</p>
                        <span className="products-item-price">$52.00</span>
                    </div>
                    <div className="products-item-btn">
                        <svg width="32" height="29" viewBox="0 0 32 29" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26.2009 29C25.5532 28.9738 24.9415 28.6948 24.4972 28.2227C24.0529 27.7506 23.8114 27.1232 23.8245 26.475C23.8376 25.8269 24.1043 25.2097 24.5673 24.7559C25.0303 24.3022 25.6527 24.048 26.301 24.048C26.9493 24.048 27.5717 24.3022 28.0347 24.7559C28.4977 25.2097 28.7644 25.8269 28.7775 26.475C28.7906 27.1232 28.549 27.7506 28.1047 28.2227C27.6604 28.6948 27.0488 28.9738 26.401 29H26.2009ZM6.75293 26.32C6.75293 25.79 6.91011 25.2718 7.20459 24.8311C7.49907 24.3904 7.91764 24.0469 8.40735 23.844C8.89705 23.6412 9.43594 23.5881 9.95581 23.6915C10.4757 23.7949 10.9532 24.0502 11.328 24.425C11.7028 24.7998 11.9581 25.2773 12.0615 25.7972C12.1649 26.317 12.1118 26.8559 11.9089 27.3456C11.7061 27.8353 11.3626 28.2539 10.9219 28.5483C10.4812 28.8428 9.96304 29 9.43298 29C9.08087 29.0003 8.73212 28.9311 8.40674 28.7966C8.08136 28.662 7.78569 28.4646 7.53662 28.2158C7.28755 27.9669 7.09001 27.6713 6.9552 27.3461C6.82039 27.0208 6.75098 26.6721 6.75098 26.32H6.75293ZM10.553 20.686C10.2935 20.6868 10.0409 20.6024 9.83411 20.4457C9.62727 20.2891 9.47758 20.0689 9.40796 19.819L4.57495 2.36401H1.18201C0.868521 2.36401 0.567859 2.23947 0.346191 2.01781C0.124523 1.79614 0 1.49549 0 1.18201C0 0.868519 0.124523 0.567873 0.346191 0.346205C0.567859 0.124537 0.868521 5.81268e-06 1.18201 5.81268e-06H5.46301C5.7225 -0.00080736 5.97504 0.0837201 6.18176 0.240568C6.38848 0.397416 6.53784 0.617884 6.60693 0.868006L11.4399 18.323H24.6179L29.001 8.27501H14.401C14.2428 8.27961 14.0854 8.25242 13.9379 8.19507C13.7904 8.13771 13.6559 8.05134 13.5424 7.94108C13.4288 7.83082 13.3386 7.69891 13.277 7.55315C13.2154 7.40739 13.1836 7.25075 13.1836 7.0925C13.1836 6.93426 13.2154 6.77762 13.277 6.63186C13.3386 6.4861 13.4288 6.35419 13.5424 6.24393C13.6559 6.13367 13.7904 6.0473 13.9379 5.98994C14.0854 5.93259 14.2428 5.90541 14.401 5.91001H30.814C31.0097 5.90996 31.2022 5.95866 31.3744 6.05172C31.5465 6.14478 31.6928 6.27926 31.7999 6.44301C31.9078 6.60729 31.9734 6.79569 31.9908 6.99145C32.0083 7.18721 31.9771 7.38424 31.9 7.565L26.495 19.977C26.4026 20.1876 26.251 20.3668 26.0585 20.4927C25.866 20.6186 25.641 20.6858 25.411 20.686H10.553Z" />
                        </svg> 
                        <span className="products-item-btn-txt">Add to Cart</span>
                    </div>
                </div>
                <div className="products-item">
                    <div className="products-item-preview">
                        <img className="products-item-img" src="./img/.jpg/main_product_5.jpg" alt="products-item" height="420">
                    </div>
                    <div className="products-item-info">
                        <span className="products-item-title">ellery x m'o capsule</span>
                        <p className="products-item-txt">Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.</p>
                        <span className="products-item-price">$52.00</span>
                    </div>
                    <div className="products-item-btn">
                        <svg width="32" height="29" viewBox="0 0 32 29" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26.2009 29C25.5532 28.9738 24.9415 28.6948 24.4972 28.2227C24.0529 27.7506 23.8114 27.1232 23.8245 26.475C23.8376 25.8269 24.1043 25.2097 24.5673 24.7559C25.0303 24.3022 25.6527 24.048 26.301 24.048C26.9493 24.048 27.5717 24.3022 28.0347 24.7559C28.4977 25.2097 28.7644 25.8269 28.7775 26.475C28.7906 27.1232 28.549 27.7506 28.1047 28.2227C27.6604 28.6948 27.0488 28.9738 26.401 29H26.2009ZM6.75293 26.32C6.75293 25.79 6.91011 25.2718 7.20459 24.8311C7.49907 24.3904 7.91764 24.0469 8.40735 23.844C8.89705 23.6412 9.43594 23.5881 9.95581 23.6915C10.4757 23.7949 10.9532 24.0502 11.328 24.425C11.7028 24.7998 11.9581 25.2773 12.0615 25.7972C12.1649 26.317 12.1118 26.8559 11.9089 27.3456C11.7061 27.8353 11.3626 28.2539 10.9219 28.5483C10.4812 28.8428 9.96304 29 9.43298 29C9.08087 29.0003 8.73212 28.9311 8.40674 28.7966C8.08136 28.662 7.78569 28.4646 7.53662 28.2158C7.28755 27.9669 7.09001 27.6713 6.9552 27.3461C6.82039 27.0208 6.75098 26.6721 6.75098 26.32H6.75293ZM10.553 20.686C10.2935 20.6868 10.0409 20.6024 9.83411 20.4457C9.62727 20.2891 9.47758 20.0689 9.40796 19.819L4.57495 2.36401H1.18201C0.868521 2.36401 0.567859 2.23947 0.346191 2.01781C0.124523 1.79614 0 1.49549 0 1.18201C0 0.868519 0.124523 0.567873 0.346191 0.346205C0.567859 0.124537 0.868521 5.81268e-06 1.18201 5.81268e-06H5.46301C5.7225 -0.00080736 5.97504 0.0837201 6.18176 0.240568C6.38848 0.397416 6.53784 0.617884 6.60693 0.868006L11.4399 18.323H24.6179L29.001 8.27501H14.401C14.2428 8.27961 14.0854 8.25242 13.9379 8.19507C13.7904 8.13771 13.6559 8.05134 13.5424 7.94108C13.4288 7.83082 13.3386 7.69891 13.277 7.55315C13.2154 7.40739 13.1836 7.25075 13.1836 7.0925C13.1836 6.93426 13.2154 6.77762 13.277 6.63186C13.3386 6.4861 13.4288 6.35419 13.5424 6.24393C13.6559 6.13367 13.7904 6.0473 13.9379 5.98994C14.0854 5.93259 14.2428 5.90541 14.401 5.91001H30.814C31.0097 5.90996 31.2022 5.95866 31.3744 6.05172C31.5465 6.14478 31.6928 6.27926 31.7999 6.44301C31.9078 6.60729 31.9734 6.79569 31.9908 6.99145C32.0083 7.18721 31.9771 7.38424 31.9 7.565L26.495 19.977C26.4026 20.1876 26.251 20.3668 26.0585 20.4927C25.866 20.6186 25.641 20.6858 25.411 20.686H10.553Z" />
                        </svg> 
                        <span className="products-item-btn-txt">Add to Cart</span>
                    </div>
                </div>
                <div className="products-item">
                    <div className="products-item-preview">
                        <img className="products-item-img" src="./img/.jpg/main_product_6.jpg" alt="products-item" height="420">
                    </div>
                    <div className="products-item-info">
                        <span className="products-item-title">ellery x m'o capsule</span>
                        <p className="products-item-txt">Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.</p>
                        <span className="products-item-price">$52.00</span>
                    </div>
                    <div className="products-item-btn">
                        <svg width="32" height="29" viewBox="0 0 32 29" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26.2009 29C25.5532 28.9738 24.9415 28.6948 24.4972 28.2227C24.0529 27.7506 23.8114 27.1232 23.8245 26.475C23.8376 25.8269 24.1043 25.2097 24.5673 24.7559C25.0303 24.3022 25.6527 24.048 26.301 24.048C26.9493 24.048 27.5717 24.3022 28.0347 24.7559C28.4977 25.2097 28.7644 25.8269 28.7775 26.475C28.7906 27.1232 28.549 27.7506 28.1047 28.2227C27.6604 28.6948 27.0488 28.9738 26.401 29H26.2009ZM6.75293 26.32C6.75293 25.79 6.91011 25.2718 7.20459 24.8311C7.49907 24.3904 7.91764 24.0469 8.40735 23.844C8.89705 23.6412 9.43594 23.5881 9.95581 23.6915C10.4757 23.7949 10.9532 24.0502 11.328 24.425C11.7028 24.7998 11.9581 25.2773 12.0615 25.7972C12.1649 26.317 12.1118 26.8559 11.9089 27.3456C11.7061 27.8353 11.3626 28.2539 10.9219 28.5483C10.4812 28.8428 9.96304 29 9.43298 29C9.08087 29.0003 8.73212 28.9311 8.40674 28.7966C8.08136 28.662 7.78569 28.4646 7.53662 28.2158C7.28755 27.9669 7.09001 27.6713 6.9552 27.3461C6.82039 27.0208 6.75098 26.6721 6.75098 26.32H6.75293ZM10.553 20.686C10.2935 20.6868 10.0409 20.6024 9.83411 20.4457C9.62727 20.2891 9.47758 20.0689 9.40796 19.819L4.57495 2.36401H1.18201C0.868521 2.36401 0.567859 2.23947 0.346191 2.01781C0.124523 1.79614 0 1.49549 0 1.18201C0 0.868519 0.124523 0.567873 0.346191 0.346205C0.567859 0.124537 0.868521 5.81268e-06 1.18201 5.81268e-06H5.46301C5.7225 -0.00080736 5.97504 0.0837201 6.18176 0.240568C6.38848 0.397416 6.53784 0.617884 6.60693 0.868006L11.4399 18.323H24.6179L29.001 8.27501H14.401C14.2428 8.27961 14.0854 8.25242 13.9379 8.19507C13.7904 8.13771 13.6559 8.05134 13.5424 7.94108C13.4288 7.83082 13.3386 7.69891 13.277 7.55315C13.2154 7.40739 13.1836 7.25075 13.1836 7.0925C13.1836 6.93426 13.2154 6.77762 13.277 6.63186C13.3386 6.4861 13.4288 6.35419 13.5424 6.24393C13.6559 6.13367 13.7904 6.0473 13.9379 5.98994C14.0854 5.93259 14.2428 5.90541 14.401 5.91001H30.814C31.0097 5.90996 31.2022 5.95866 31.3744 6.05172C31.5465 6.14478 31.6928 6.27926 31.7999 6.44301C31.9078 6.60729 31.9734 6.79569 31.9908 6.99145C32.0083 7.18721 31.9771 7.38424 31.9 7.565L26.495 19.977C26.4026 20.1876 26.251 20.3668 26.0585 20.4927C25.866 20.6186 25.641 20.6858 25.411 20.686H10.553Z" />
                        </svg> 
                        <span className="products-item-btn-txt">Add to Cart</span>
                    </div>
                </div>
                <div className="products-item">
                    <div className="products-item-preview">
                        <img className="products-item-img" src="./img/.jpg/main_product_1.jpg" alt="products-item" height="420">
                    </div>
                    <div className="products-item-info">
                        <span className="products-item-title">ellery x m'o capsule</span>
                        <p className="products-item-txt">Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.</p>
                        <span className="products-item-price">$52.00</span>
                    </div>
                    <div className="products-item-btn">
                        <svg width="32" height="29" viewBox="0 0 32 29" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26.2009 29C25.5532 28.9738 24.9415 28.6948 24.4972 28.2227C24.0529 27.7506 23.8114 27.1232 23.8245 26.475C23.8376 25.8269 24.1043 25.2097 24.5673 24.7559C25.0303 24.3022 25.6527 24.048 26.301 24.048C26.9493 24.048 27.5717 24.3022 28.0347 24.7559C28.4977 25.2097 28.7644 25.8269 28.7775 26.475C28.7906 27.1232 28.549 27.7506 28.1047 28.2227C27.6604 28.6948 27.0488 28.9738 26.401 29H26.2009ZM6.75293 26.32C6.75293 25.79 6.91011 25.2718 7.20459 24.8311C7.49907 24.3904 7.91764 24.0469 8.40735 23.844C8.89705 23.6412 9.43594 23.5881 9.95581 23.6915C10.4757 23.7949 10.9532 24.0502 11.328 24.425C11.7028 24.7998 11.9581 25.2773 12.0615 25.7972C12.1649 26.317 12.1118 26.8559 11.9089 27.3456C11.7061 27.8353 11.3626 28.2539 10.9219 28.5483C10.4812 28.8428 9.96304 29 9.43298 29C9.08087 29.0003 8.73212 28.9311 8.40674 28.7966C8.08136 28.662 7.78569 28.4646 7.53662 28.2158C7.28755 27.9669 7.09001 27.6713 6.9552 27.3461C6.82039 27.0208 6.75098 26.6721 6.75098 26.32H6.75293ZM10.553 20.686C10.2935 20.6868 10.0409 20.6024 9.83411 20.4457C9.62727 20.2891 9.47758 20.0689 9.40796 19.819L4.57495 2.36401H1.18201C0.868521 2.36401 0.567859 2.23947 0.346191 2.01781C0.124523 1.79614 0 1.49549 0 1.18201C0 0.868519 0.124523 0.567873 0.346191 0.346205C0.567859 0.124537 0.868521 5.81268e-06 1.18201 5.81268e-06H5.46301C5.7225 -0.00080736 5.97504 0.0837201 6.18176 0.240568C6.38848 0.397416 6.53784 0.617884 6.60693 0.868006L11.4399 18.323H24.6179L29.001 8.27501H14.401C14.2428 8.27961 14.0854 8.25242 13.9379 8.19507C13.7904 8.13771 13.6559 8.05134 13.5424 7.94108C13.4288 7.83082 13.3386 7.69891 13.277 7.55315C13.2154 7.40739 13.1836 7.25075 13.1836 7.0925C13.1836 6.93426 13.2154 6.77762 13.277 6.63186C13.3386 6.4861 13.4288 6.35419 13.5424 6.24393C13.6559 6.13367 13.7904 6.0473 13.9379 5.98994C14.0854 5.93259 14.2428 5.90541 14.401 5.91001H30.814C31.0097 5.90996 31.2022 5.95866 31.3744 6.05172C31.5465 6.14478 31.6928 6.27926 31.7999 6.44301C31.9078 6.60729 31.9734 6.79569 31.9908 6.99145C32.0083 7.18721 31.9771 7.38424 31.9 7.565L26.495 19.977C26.4026 20.1876 26.251 20.3668 26.0585 20.4927C25.866 20.6186 25.641 20.6858 25.411 20.686H10.553Z" />
                        </svg> 
                        <span className="products-item-btn-txt">Add to Cart</span>
                    </div>
                </div>
                <div className="products-item"> 
                    <div className="products-item-preview">
                        <img className="products-item-img" src="./img/.jpg/main_product_2.jpg" alt="products-item" height="420">
                    </div>
                    <div className="products-item-info">
                        <span className="products-item-title">ellery x m'o capsule</span>
                        <p className="products-item-txt">Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.</p>
                        <span className="products-item-price">$52.00</span>
                    </div>
                    <div className="products-item-btn">
                        <svg width="32" height="29" viewBox="0 0 32 29" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26.2009 29C25.5532 28.9738 24.9415 28.6948 24.4972 28.2227C24.0529 27.7506 23.8114 27.1232 23.8245 26.475C23.8376 25.8269 24.1043 25.2097 24.5673 24.7559C25.0303 24.3022 25.6527 24.048 26.301 24.048C26.9493 24.048 27.5717 24.3022 28.0347 24.7559C28.4977 25.2097 28.7644 25.8269 28.7775 26.475C28.7906 27.1232 28.549 27.7506 28.1047 28.2227C27.6604 28.6948 27.0488 28.9738 26.401 29H26.2009ZM6.75293 26.32C6.75293 25.79 6.91011 25.2718 7.20459 24.8311C7.49907 24.3904 7.91764 24.0469 8.40735 23.844C8.89705 23.6412 9.43594 23.5881 9.95581 23.6915C10.4757 23.7949 10.9532 24.0502 11.328 24.425C11.7028 24.7998 11.9581 25.2773 12.0615 25.7972C12.1649 26.317 12.1118 26.8559 11.9089 27.3456C11.7061 27.8353 11.3626 28.2539 10.9219 28.5483C10.4812 28.8428 9.96304 29 9.43298 29C9.08087 29.0003 8.73212 28.9311 8.40674 28.7966C8.08136 28.662 7.78569 28.4646 7.53662 28.2158C7.28755 27.9669 7.09001 27.6713 6.9552 27.3461C6.82039 27.0208 6.75098 26.6721 6.75098 26.32H6.75293ZM10.553 20.686C10.2935 20.6868 10.0409 20.6024 9.83411 20.4457C9.62727 20.2891 9.47758 20.0689 9.40796 19.819L4.57495 2.36401H1.18201C0.868521 2.36401 0.567859 2.23947 0.346191 2.01781C0.124523 1.79614 0 1.49549 0 1.18201C0 0.868519 0.124523 0.567873 0.346191 0.346205C0.567859 0.124537 0.868521 5.81268e-06 1.18201 5.81268e-06H5.46301C5.7225 -0.00080736 5.97504 0.0837201 6.18176 0.240568C6.38848 0.397416 6.53784 0.617884 6.60693 0.868006L11.4399 18.323H24.6179L29.001 8.27501H14.401C14.2428 8.27961 14.0854 8.25242 13.9379 8.19507C13.7904 8.13771 13.6559 8.05134 13.5424 7.94108C13.4288 7.83082 13.3386 7.69891 13.277 7.55315C13.2154 7.40739 13.1836 7.25075 13.1836 7.0925C13.1836 6.93426 13.2154 6.77762 13.277 6.63186C13.3386 6.4861 13.4288 6.35419 13.5424 6.24393C13.6559 6.13367 13.7904 6.0473 13.9379 5.98994C14.0854 5.93259 14.2428 5.90541 14.401 5.91001H30.814C31.0097 5.90996 31.2022 5.95866 31.3744 6.05172C31.5465 6.14478 31.6928 6.27926 31.7999 6.44301C31.9078 6.60729 31.9734 6.79569 31.9908 6.99145C32.0083 7.18721 31.9771 7.38424 31.9 7.565L26.495 19.977C26.4026 20.1876 26.251 20.3668 26.0585 20.4927C25.866 20.6186 25.641 20.6858 25.411 20.686H10.553Z" />
                        </svg> 
                        <span className="products-item-btn-txt">Add to Cart</span>
                    </div>
                </div>
                <div className="products-item">
                    <div className="products-item-preview">
                        <img className="products-item-img" src="./img/.jpg/main_product_3.jpg" alt="products-item" height="420">
                    </div>
                    <div className="products-item-info">
                        <span className="products-item-title">ellery x m'o capsule</span>
                        <p className="products-item-txt">Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.</p>
                        <span className="products-item-price">$52.00</span>
                    </div>
                    <div className="products-item-btn">
                        <svg width="32" height="29" viewBox="0 0 32 29" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26.2009 29C25.5532 28.9738 24.9415 28.6948 24.4972 28.2227C24.0529 27.7506 23.8114 27.1232 23.8245 26.475C23.8376 25.8269 24.1043 25.2097 24.5673 24.7559C25.0303 24.3022 25.6527 24.048 26.301 24.048C26.9493 24.048 27.5717 24.3022 28.0347 24.7559C28.4977 25.2097 28.7644 25.8269 28.7775 26.475C28.7906 27.1232 28.549 27.7506 28.1047 28.2227C27.6604 28.6948 27.0488 28.9738 26.401 29H26.2009ZM6.75293 26.32C6.75293 25.79 6.91011 25.2718 7.20459 24.8311C7.49907 24.3904 7.91764 24.0469 8.40735 23.844C8.89705 23.6412 9.43594 23.5881 9.95581 23.6915C10.4757 23.7949 10.9532 24.0502 11.328 24.425C11.7028 24.7998 11.9581 25.2773 12.0615 25.7972C12.1649 26.317 12.1118 26.8559 11.9089 27.3456C11.7061 27.8353 11.3626 28.2539 10.9219 28.5483C10.4812 28.8428 9.96304 29 9.43298 29C9.08087 29.0003 8.73212 28.9311 8.40674 28.7966C8.08136 28.662 7.78569 28.4646 7.53662 28.2158C7.28755 27.9669 7.09001 27.6713 6.9552 27.3461C6.82039 27.0208 6.75098 26.6721 6.75098 26.32H6.75293ZM10.553 20.686C10.2935 20.6868 10.0409 20.6024 9.83411 20.4457C9.62727 20.2891 9.47758 20.0689 9.40796 19.819L4.57495 2.36401H1.18201C0.868521 2.36401 0.567859 2.23947 0.346191 2.01781C0.124523 1.79614 0 1.49549 0 1.18201C0 0.868519 0.124523 0.567873 0.346191 0.346205C0.567859 0.124537 0.868521 5.81268e-06 1.18201 5.81268e-06H5.46301C5.7225 -0.00080736 5.97504 0.0837201 6.18176 0.240568C6.38848 0.397416 6.53784 0.617884 6.60693 0.868006L11.4399 18.323H24.6179L29.001 8.27501H14.401C14.2428 8.27961 14.0854 8.25242 13.9379 8.19507C13.7904 8.13771 13.6559 8.05134 13.5424 7.94108C13.4288 7.83082 13.3386 7.69891 13.277 7.55315C13.2154 7.40739 13.1836 7.25075 13.1836 7.0925C13.1836 6.93426 13.2154 6.77762 13.277 6.63186C13.3386 6.4861 13.4288 6.35419 13.5424 6.24393C13.6559 6.13367 13.7904 6.0473 13.9379 5.98994C14.0854 5.93259 14.2428 5.90541 14.401 5.91001H30.814C31.0097 5.90996 31.2022 5.95866 31.3744 6.05172C31.5465 6.14478 31.6928 6.27926 31.7999 6.44301C31.9078 6.60729 31.9734 6.79569 31.9908 6.99145C32.0083 7.18721 31.9771 7.38424 31.9 7.565L26.495 19.977C26.4026 20.1876 26.251 20.3668 26.0585 20.4927C25.866 20.6186 25.641 20.6858 25.411 20.686H10.553Z" />
                        </svg> 
                        <span className="products-item-btn-txt">Add to Cart</span>
                    </div>
                </div>


                <div className="products-item">
                    <div className="products-item-preview">
                        <img className="products-item-img" src="./img/.jpg/main_product_3.jpg" alt="products-item" height="420">
                    </div>
                    <div className="products-item-info">
                        <span className="products-item-title">ellery x m'o capsule</span>
                        <p className="products-item-txt">Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.</p>
                        <span className="products-item-price">$52.00</span>
                    </div>
                    <div className="products-item-btn">
                        <svg width="32" height="29" viewBox="0 0 32 29" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26.2009 29C25.5532 28.9738 24.9415 28.6948 24.4972 28.2227C24.0529 27.7506 23.8114 27.1232 23.8245 26.475C23.8376 25.8269 24.1043 25.2097 24.5673 24.7559C25.0303 24.3022 25.6527 24.048 26.301 24.048C26.9493 24.048 27.5717 24.3022 28.0347 24.7559C28.4977 25.2097 28.7644 25.8269 28.7775 26.475C28.7906 27.1232 28.549 27.7506 28.1047 28.2227C27.6604 28.6948 27.0488 28.9738 26.401 29H26.2009ZM6.75293 26.32C6.75293 25.79 6.91011 25.2718 7.20459 24.8311C7.49907 24.3904 7.91764 24.0469 8.40735 23.844C8.89705 23.6412 9.43594 23.5881 9.95581 23.6915C10.4757 23.7949 10.9532 24.0502 11.328 24.425C11.7028 24.7998 11.9581 25.2773 12.0615 25.7972C12.1649 26.317 12.1118 26.8559 11.9089 27.3456C11.7061 27.8353 11.3626 28.2539 10.9219 28.5483C10.4812 28.8428 9.96304 29 9.43298 29C9.08087 29.0003 8.73212 28.9311 8.40674 28.7966C8.08136 28.662 7.78569 28.4646 7.53662 28.2158C7.28755 27.9669 7.09001 27.6713 6.9552 27.3461C6.82039 27.0208 6.75098 26.6721 6.75098 26.32H6.75293ZM10.553 20.686C10.2935 20.6868 10.0409 20.6024 9.83411 20.4457C9.62727 20.2891 9.47758 20.0689 9.40796 19.819L4.57495 2.36401H1.18201C0.868521 2.36401 0.567859 2.23947 0.346191 2.01781C0.124523 1.79614 0 1.49549 0 1.18201C0 0.868519 0.124523 0.567873 0.346191 0.346205C0.567859 0.124537 0.868521 5.81268e-06 1.18201 5.81268e-06H5.46301C5.7225 -0.00080736 5.97504 0.0837201 6.18176 0.240568C6.38848 0.397416 6.53784 0.617884 6.60693 0.868006L11.4399 18.323H24.6179L29.001 8.27501H14.401C14.2428 8.27961 14.0854 8.25242 13.9379 8.19507C13.7904 8.13771 13.6559 8.05134 13.5424 7.94108C13.4288 7.83082 13.3386 7.69891 13.277 7.55315C13.2154 7.40739 13.1836 7.25075 13.1836 7.0925C13.1836 6.93426 13.2154 6.77762 13.277 6.63186C13.3386 6.4861 13.4288 6.35419 13.5424 6.24393C13.6559 6.13367 13.7904 6.0473 13.9379 5.98994C14.0854 5.93259 14.2428 5.90541 14.401 5.91001H30.814C31.0097 5.90996 31.2022 5.95866 31.3744 6.05172C31.5465 6.14478 31.6928 6.27926 31.7999 6.44301C31.9078 6.60729 31.9734 6.79569 31.9908 6.99145C32.0083 7.18721 31.9771 7.38424 31.9 7.565L26.495 19.977C26.4026 20.1876 26.251 20.3668 26.0585 20.4927C25.866 20.6186 25.641 20.6858 25.411 20.686H10.553Z" />
                        </svg> 
                        <span className="products-item-btn-txt">Add to Cart</span>
                    </div>
                </div>
                <div className="products-item">
                    <div className="products-item-preview">
                        <img className="products-item-img" src="./img/.jpg/main_product_3.jpg" alt="products-item" height="420">
                    </div>
                    <div className="products-item-info">
                        <span className="products-item-title">ellery x m'o capsule</span>
                        <p className="products-item-txt">Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.</p>
                        <span className="products-item-price">$52.00</span>
                    </div>
                    <div className="products-item-btn">
                        <svg width="32" height="29" viewBox="0 0 32 29" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26.2009 29C25.5532 28.9738 24.9415 28.6948 24.4972 28.2227C24.0529 27.7506 23.8114 27.1232 23.8245 26.475C23.8376 25.8269 24.1043 25.2097 24.5673 24.7559C25.0303 24.3022 25.6527 24.048 26.301 24.048C26.9493 24.048 27.5717 24.3022 28.0347 24.7559C28.4977 25.2097 28.7644 25.8269 28.7775 26.475C28.7906 27.1232 28.549 27.7506 28.1047 28.2227C27.6604 28.6948 27.0488 28.9738 26.401 29H26.2009ZM6.75293 26.32C6.75293 25.79 6.91011 25.2718 7.20459 24.8311C7.49907 24.3904 7.91764 24.0469 8.40735 23.844C8.89705 23.6412 9.43594 23.5881 9.95581 23.6915C10.4757 23.7949 10.9532 24.0502 11.328 24.425C11.7028 24.7998 11.9581 25.2773 12.0615 25.7972C12.1649 26.317 12.1118 26.8559 11.9089 27.3456C11.7061 27.8353 11.3626 28.2539 10.9219 28.5483C10.4812 28.8428 9.96304 29 9.43298 29C9.08087 29.0003 8.73212 28.9311 8.40674 28.7966C8.08136 28.662 7.78569 28.4646 7.53662 28.2158C7.28755 27.9669 7.09001 27.6713 6.9552 27.3461C6.82039 27.0208 6.75098 26.6721 6.75098 26.32H6.75293ZM10.553 20.686C10.2935 20.6868 10.0409 20.6024 9.83411 20.4457C9.62727 20.2891 9.47758 20.0689 9.40796 19.819L4.57495 2.36401H1.18201C0.868521 2.36401 0.567859 2.23947 0.346191 2.01781C0.124523 1.79614 0 1.49549 0 1.18201C0 0.868519 0.124523 0.567873 0.346191 0.346205C0.567859 0.124537 0.868521 5.81268e-06 1.18201 5.81268e-06H5.46301C5.7225 -0.00080736 5.97504 0.0837201 6.18176 0.240568C6.38848 0.397416 6.53784 0.617884 6.60693 0.868006L11.4399 18.323H24.6179L29.001 8.27501H14.401C14.2428 8.27961 14.0854 8.25242 13.9379 8.19507C13.7904 8.13771 13.6559 8.05134 13.5424 7.94108C13.4288 7.83082 13.3386 7.69891 13.277 7.55315C13.2154 7.40739 13.1836 7.25075 13.1836 7.0925C13.1836 6.93426 13.2154 6.77762 13.277 6.63186C13.3386 6.4861 13.4288 6.35419 13.5424 6.24393C13.6559 6.13367 13.7904 6.0473 13.9379 5.98994C14.0854 5.93259 14.2428 5.90541 14.401 5.91001H30.814C31.0097 5.90996 31.2022 5.95866 31.3744 6.05172C31.5465 6.14478 31.6928 6.27926 31.7999 6.44301C31.9078 6.60729 31.9734 6.79569 31.9908 6.99145C32.0083 7.18721 31.9771 7.38424 31.9 7.565L26.495 19.977C26.4026 20.1876 26.251 20.3668 26.0585 20.4927C25.866 20.6186 25.641 20.6858 25.411 20.686H10.553Z" />
                        </svg> 
                        <span className="products-item-btn-txt">Add to Cart</span>
                    </div>
                </div>
                <div className="products-item">
                    <div className="products-item-preview">
                        <img className="products-item-img" src="./img/.jpg/main_product_3.jpg" alt="products-item" height="420">
                    </div>
                    <div className="products-item-info">
                        <span className="products-item-title">ellery x m'o capsule</span>
                        <p className="products-item-txt">Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.</p>
                        <span className="products-item-price">$52.00</span>
                    </div>
                    <div className="products-item-btn">
                        <svg width="32" height="29" viewBox="0 0 32 29" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26.2009 29C25.5532 28.9738 24.9415 28.6948 24.4972 28.2227C24.0529 27.7506 23.8114 27.1232 23.8245 26.475C23.8376 25.8269 24.1043 25.2097 24.5673 24.7559C25.0303 24.3022 25.6527 24.048 26.301 24.048C26.9493 24.048 27.5717 24.3022 28.0347 24.7559C28.4977 25.2097 28.7644 25.8269 28.7775 26.475C28.7906 27.1232 28.549 27.7506 28.1047 28.2227C27.6604 28.6948 27.0488 28.9738 26.401 29H26.2009ZM6.75293 26.32C6.75293 25.79 6.91011 25.2718 7.20459 24.8311C7.49907 24.3904 7.91764 24.0469 8.40735 23.844C8.89705 23.6412 9.43594 23.5881 9.95581 23.6915C10.4757 23.7949 10.9532 24.0502 11.328 24.425C11.7028 24.7998 11.9581 25.2773 12.0615 25.7972C12.1649 26.317 12.1118 26.8559 11.9089 27.3456C11.7061 27.8353 11.3626 28.2539 10.9219 28.5483C10.4812 28.8428 9.96304 29 9.43298 29C9.08087 29.0003 8.73212 28.9311 8.40674 28.7966C8.08136 28.662 7.78569 28.4646 7.53662 28.2158C7.28755 27.9669 7.09001 27.6713 6.9552 27.3461C6.82039 27.0208 6.75098 26.6721 6.75098 26.32H6.75293ZM10.553 20.686C10.2935 20.6868 10.0409 20.6024 9.83411 20.4457C9.62727 20.2891 9.47758 20.0689 9.40796 19.819L4.57495 2.36401H1.18201C0.868521 2.36401 0.567859 2.23947 0.346191 2.01781C0.124523 1.79614 0 1.49549 0 1.18201C0 0.868519 0.124523 0.567873 0.346191 0.346205C0.567859 0.124537 0.868521 5.81268e-06 1.18201 5.81268e-06H5.46301C5.7225 -0.00080736 5.97504 0.0837201 6.18176 0.240568C6.38848 0.397416 6.53784 0.617884 6.60693 0.868006L11.4399 18.323H24.6179L29.001 8.27501H14.401C14.2428 8.27961 14.0854 8.25242 13.9379 8.19507C13.7904 8.13771 13.6559 8.05134 13.5424 7.94108C13.4288 7.83082 13.3386 7.69891 13.277 7.55315C13.2154 7.40739 13.1836 7.25075 13.1836 7.0925C13.1836 6.93426 13.2154 6.77762 13.277 6.63186C13.3386 6.4861 13.4288 6.35419 13.5424 6.24393C13.6559 6.13367 13.7904 6.0473 13.9379 5.98994C14.0854 5.93259 14.2428 5.90541 14.401 5.91001H30.814C31.0097 5.90996 31.2022 5.95866 31.3744 6.05172C31.5465 6.14478 31.6928 6.27926 31.7999 6.44301C31.9078 6.60729 31.9734 6.79569 31.9908 6.99145C32.0083 7.18721 31.9771 7.38424 31.9 7.565L26.495 19.977C26.4026 20.1876 26.251 20.3668 26.0585 20.4927C25.866 20.6186 25.641 20.6858 25.411 20.686H10.553Z" />
                        </svg> 
                        <span className="products-item-btn-txt">Add to Cart</span>
                    </div>
                </div>
            </div>
            <div className="products-pagination-wrp">
                <div className="products-pagination">
                    <button className="products-pagination-btns">
                        <svg width="9" height="14" viewBox="0 0 9 14" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.99512 2L3.99512 7L8.99512 12L7.99512 14L0.995117 7L7.99512 0L8.99512 2Z" />
                        </svg>
                    </button>
                    <ul className="products-pagination-numbers-list">
                        <li className="products-pagination-numbers-list-item">1</li>
                        <li className="products-pagination-numbers-list-item">2</li>
                        <li className="products-pagination-numbers-list-item">3</li>
                        <li className="products-pagination-numbers-list-item">4</li>
                        <li className="products-pagination-numbers-list-item">5</li>
                        <li className="products-pagination-numbers-list-item">6</li>
                        <li>.....</li>
                        <li className="products-pagination-numbers-list-item-last">20</li>
                    </ul>
                    <button className="products-pagination-btns">
                        <svg width="9" height="14" viewBox="0 0 9 14" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.994995 12L5.995 7L0.994995 2L1.995 0L8.995 7L1.995 14L0.994995 12Z" />
                        </svg>                            
                    </button>
                </div>
            </div>
        </section>
        <section className="features">
            <div className="features-wrap">
                <div className="features-item">
                    <svg width="46" height="32" viewBox="0 0 46 32" className="features-item-img" xmlns="http://www.w3.org/2000/svg">
                        <path d="M30.2873 27.2429H14.8103C14.6031 28.5509 13.936 29.742 12.929 30.6021C11.922 31.4621 10.6411 31.9346 9.31682 31.9346C7.99252 31.9346 6.71166 31.4621 5.70464 30.6021C4.69762 29.742 4.03052 28.5509 3.82332 27.2429H1.88631C1.39149 27.2397 0.918139 27.0404 0.570025 26.6887C0.221911 26.337 0.0274507 25.8618 0.0293142 25.3669V1.87695C0.0271852 1.38195 0.221516 0.906335 0.569658 0.554443C0.917801 0.202551 1.39131 0.00317363 1.88631 0H27.4373C27.9322 0.00317353 28.4056 0.202522 28.7536 0.554443C29.1016 0.906364 29.2957 1.38204 29.2933 1.87695V3.78198H36.4143C36.4947 3.78164 36.5747 3.79208 36.6523 3.81299C38.9523 4.01299 40.1093 5.2129 41.3293 7.2749L44.8883 13.3689C44.9732 13.5136 45.018 13.6782 45.0183 13.8459V26.304C45.0194 26.5515 44.9221 26.7892 44.7479 26.9651C44.5737 27.141 44.3369 27.2406 44.0893 27.2419H41.2753C41.0681 28.5499 40.401 29.741 39.394 30.6011C38.387 31.4611 37.1061 31.9336 35.7818 31.9336C34.4575 31.9336 33.1767 31.4611 32.1696 30.6011C31.1626 29.741 30.4955 28.5499 30.2883 27.2419L30.2873 27.2429ZM32.0653 26.304C32.0732 27.0369 32.2977 27.7511 32.7107 28.3567C33.1236 28.9623 33.7065 29.4322 34.3859 29.7073C35.0653 29.9824 35.811 30.0503 36.5289 29.9026C37.2469 29.7548 37.9051 29.398 38.4207 28.877C38.9363 28.3559 39.2862 27.6941 39.4265 26.9746C39.5667 26.2551 39.491 25.5103 39.2088 24.8337C38.9267 24.1572 38.4507 23.5794 37.8408 23.1729C37.2309 22.7663 36.5143 22.5491 35.7813 22.5488C34.791 22.5552 33.8436 22.9543 33.1469 23.6582C32.4503 24.3621 32.0613 25.3136 32.0653 26.304ZM5.60134 26.304C5.60923 27.0369 5.83376 27.7511 6.24669 28.3567C6.65962 28.9623 7.2425 29.4322 7.92192 29.7073C8.60135 29.9824 9.34697 30.0503 10.0649 29.9026C10.7829 29.7548 11.4411 29.398 11.9567 28.877C12.4723 28.3559 12.8222 27.6941 12.9625 26.9746C13.1027 26.2551 13.027 25.5103 12.7448 24.8337C12.4627 24.1572 11.9867 23.5794 11.3768 23.1729C10.7669 22.7663 10.0503 22.5491 9.31731 22.5488C8.32679 22.5549 7.37915 22.9537 6.6823 23.6577C5.98545 24.3617 5.59634 25.3134 5.60033 26.304H5.60134ZM41.2733 25.366H43.1593V19.7478H40.4233C40.3007 19.7473 40.1794 19.7227 40.0664 19.6753C39.9533 19.6279 39.8507 19.5585 39.7644 19.4714C39.6781 19.3843 39.6099 19.281 39.5635 19.1675C39.5172 19.054 39.4937 18.9324 39.4943 18.8098V16.9629C39.494 16.2423 39.7696 15.5488 40.2643 15.0249H33.8853C33.8081 15.0248 33.7312 15.015 33.6563 14.9958C32.9516 14.933 32.2961 14.6081 31.8194 14.0852C31.3428 13.5623 31.0798 12.8794 31.0823 12.1719V7.47192C31.0817 7.34927 31.1052 7.22758 31.1515 7.11401C31.1978 7.00044 31.2661 6.89725 31.3523 6.81006C31.4386 6.72286 31.5412 6.6535 31.6543 6.60596C31.7674 6.55841 31.8887 6.53361 32.0113 6.53296H38.4943C38.15 6.21428 37.7426 5.97123 37.2986 5.81982C36.8545 5.66842 36.3836 5.61187 35.9163 5.65381H29.2933V25.3618H30.2873C30.4945 24.0538 31.1616 22.8627 32.1687 22.0027C33.1757 21.1426 34.4565 20.6702 35.7808 20.6702C37.1051 20.6702 38.386 21.1426 39.393 22.0027C40.4 22.8627 41.0671 24.0538 41.2743 25.3618L41.2733 25.366ZM14.8093 25.366H27.4363V1.87598H1.88631V25.366H3.82332C4.03052 24.058 4.69762 22.8666 5.70464 22.0066C6.71166 21.1465 7.99252 20.6741 9.31682 20.6741C10.6411 20.6741 11.922 21.1465 12.929 22.0066C13.936 22.8666 14.6031 24.058 14.8103 25.366H14.8093ZM41.3513 16.9658V17.875H43.1593V16.0278H42.2803C42.0335 16.0294 41.7973 16.1288 41.6234 16.304C41.4495 16.4792 41.352 16.716 41.3523 16.9629L41.3513 16.9658ZM32.9383 12.1738C32.9372 12.4263 33.0363 12.6691 33.2139 12.8486C33.3914 13.0282 33.6328 13.13 33.8853 13.1318C33.9492 13.1316 34.0129 13.1384 34.0753 13.1519H42.6003L39.8343 8.41602H32.9343L32.9383 12.1738ZM33.0313 26.3059C33.0284 25.5734 33.3162 24.8695 33.8316 24.3489C34.3469 23.8283 35.0478 23.5333 35.7803 23.5288C36.0291 23.5288 36.2677 23.6278 36.4436 23.8037C36.6195 23.9796 36.7183 24.218 36.7183 24.4668C36.7183 24.7156 36.6195 24.9542 36.4436 25.1301C36.2677 25.306 36.0291 25.4048 35.7803 25.4048C35.602 25.4032 35.4272 25.4548 35.2782 25.5527C35.1291 25.6507 35.0125 25.7905 34.9432 25.9548C34.8738 26.1191 34.8548 26.3005 34.8887 26.4756C34.9225 26.6507 35.0076 26.8118 35.1331 26.9385C35.2586 27.0651 35.419 27.1516 35.5938 27.187C35.7686 27.2224 35.9499 27.2051 36.1149 27.1372C36.2798 27.0693 36.4208 26.9538 36.5201 26.8057C36.6193 26.6575 36.6723 26.4833 36.6723 26.3049C36.6723 26.0587 36.7701 25.8226 36.9443 25.6484C37.1184 25.4743 37.3546 25.3765 37.6008 25.3765C37.8471 25.3765 38.0832 25.4743 38.2574 25.6484C38.4315 25.8226 38.5293 26.0587 38.5293 26.3049C38.5293 27.0343 38.2396 27.7338 37.7239 28.2495C37.2081 28.7652 36.5087 29.0549 35.7793 29.0549C35.05 29.0549 34.3505 28.7652 33.8348 28.2495C33.319 27.7338 33.0293 27.0343 33.0293 26.3049L33.0313 26.3059ZM6.56731 26.3059C6.56438 25.5734 6.8522 24.8695 7.36757 24.3489C7.88294 23.8283 8.58378 23.5333 9.31633 23.5288C9.5651 23.5288 9.80369 23.6278 9.9796 23.8037C10.1555 23.9796 10.2543 24.218 10.2543 24.4668C10.2543 24.7156 10.1555 24.9542 9.9796 25.1301C9.80369 25.306 9.5651 25.4048 9.31633 25.4048C9.138 25.4032 8.96319 25.4548 8.81413 25.5527C8.66508 25.6507 8.54849 25.7905 8.47914 25.9548C8.4098 26.1191 8.39082 26.3005 8.42464 26.4756C8.45846 26.6507 8.54354 26.8118 8.66908 26.9385C8.79463 27.0651 8.95498 27.1516 9.12978 27.187C9.30458 27.2224 9.48595 27.2051 9.65087 27.1372C9.81579 27.0693 9.95683 26.9538 10.0561 26.8057C10.1553 26.6575 10.2083 26.4833 10.2083 26.3049C10.2083 26.0587 10.3061 25.8226 10.4803 25.6484C10.6544 25.4743 10.8906 25.3765 11.1368 25.3765C11.3831 25.3765 11.6193 25.4743 11.7934 25.6484C11.9675 25.8226 12.0653 26.0587 12.0653 26.3049C12.0653 27.0343 11.7756 27.7338 11.2599 28.2495C10.7441 28.7652 10.0447 29.0549 9.31532 29.0549C8.58598 29.0549 7.8865 28.7652 7.37078 28.2495C6.85505 27.7338 6.56532 27.0343 6.56532 26.3049L6.56731 26.3059ZM4.70934 5.65991C4.46056 5.65991 4.22198 5.56116 4.04607 5.38525C3.87016 5.20934 3.77132 4.9707 3.77132 4.72192C3.77132 4.47315 3.87016 4.2345 4.04607 4.05859C4.22198 3.88268 4.46056 3.78394 4.70934 3.78394H24.6093C24.8581 3.78394 25.0967 3.88268 25.2726 4.05859C25.4485 4.2345 25.5473 4.47315 25.5473 4.72192C25.5473 4.9707 25.4485 5.20934 25.2726 5.38525C25.0967 5.56116 24.8581 5.65991 24.6093 5.65991H4.70934Z" />
                    </svg>                        
                    <span className="features-item-title">Free Delivery</span>
                    <p className="features-item-txt">Worldwide delivery on all. Authorit tively morph next-generation innov tion with extensive models.</p>
                </div>
                <div className="features-item">
                    <svg width="40" height="40" viewBox="0 0 40 40" className="features-item-img" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.994 37.0239L16.523 39.9238L14.235 36.0039L9.995 37.5159L9.17297 33.0359L4.67999 32.991L5.41199 28.491L1.20398 26.8909L3.414 22.925L0 19.96L3.41199 16.9929L1.20203 13.0278L5.41101 11.428L4.67798 6.93286L9.172 6.88892L9.99402 2.40894L14.234 3.91992L16.522 0L19.993 2.8999L23.464 0L25.753 3.9209L29.993 2.40894L30.814 6.88989L35.308 6.93481L34.576 11.4299L38.784 13.03L36.574 16.9958L39.986 19.9609L36.574 22.928L38.783 26.894L34.574 28.4939L35.307 32.988L30.812 33.033L29.991 37.5139L25.753 36.0029L23.464 39.9229L19.994 37.0239ZM21.2 35.541L22.961 37.012L24.122 35.022L24.914 33.666L26.382 34.189L28.533 34.957L28.95 32.6838L29.235 31.1289L30.796 31.113L33.078 31.092L32.706 28.8098L32.452 27.25L33.911 26.696L36.045 25.8828L34.925 23.873L34.159 22.498L35.342 21.4709L37.076 19.9609L35.343 18.4609L34.16 17.4319L34.926 16.0559L36.047 14.0449L33.913 13.2339L32.454 12.6809L32.709 11.1208L33.081 8.83984L30.799 8.81689L29.239 8.80103L28.954 7.24683L28.538 4.97388L26.386 5.74097L24.918 6.26392L24.125 4.90698L22.963 2.91699L21.201 4.38794L19.996 5.39282L18.791 4.38794L17.03 2.91699L15.869 4.90601L15.077 6.26294L13.608 5.73999L11.458 4.97192L11.04 7.24585L10.755 8.80005L9.19501 8.81592L6.914 8.83789L7.28601 11.1199L7.53998 12.678L6.08099 13.2329L3.94598 14.0439L5.06702 16.0549L5.83301 17.4299L4.65002 18.459L2.91602 19.967L4.64899 21.4739L5.83197 22.5029L5.06598 23.8779L3.94501 25.8879L6.078 26.698L7.53802 27.2529L7.28302 28.812L6.91199 31.0959L9.19299 31.1189L10.753 31.135L11.038 32.6899L11.455 34.9619L13.607 34.1948L15.076 33.6719L15.868 35.0288L17.03 37.019L18.791 35.5479L19.996 34.543L21.2 35.541ZM21.318 23.02C21.318 20.093 22.883 18.4648 24.777 18.4648C26.783 18.4648 28.077 20.0279 28.077 22.7949C28.077 25.8539 26.492 27.3718 24.662 27.3718C22.883 27.3718 21.338 25.922 21.318 23.02ZM22.839 22.9319C22.816 24.7829 23.521 26.1899 24.711 26.1899C25.988 26.1899 26.561 24.8049 26.561 22.8899C26.561 21.1249 26.054 19.6528 24.711 19.6528C23.5 19.6488 22.839 21.1029 22.839 22.9309V22.9319ZM15.194 27.332L23.609 12.613H24.842L16.427 27.332H15.194ZM11.979 16.99C11.979 14.09 13.542 12.458 15.437 12.458C17.437 12.458 18.763 14.022 18.763 16.79C18.763 19.848 17.177 21.365 15.327 21.365C13.544 21.365 12 19.915 11.979 16.991V16.99ZM13.521 16.9238C13.477 18.7748 14.162 20.1809 15.371 20.1829C16.648 20.1829 17.221 18.7988 17.221 16.8828C17.221 15.1168 16.714 13.645 15.371 13.645C14.162 13.642 13.521 15.092 13.521 16.925V16.9238Z" />
                    </svg>                        
                    <span className="features-item-title">Sales & Discount</span>
                    <p className="features-item-txt">Worldwide delivery on all. Authorit tively morph next-generation innov tion with extensive models.</p>
                </div>
                <div className="features-item">
                    <svg width="48" height="35" viewBox="0 0 48 35" className="features-item-img" xmlns="http://www.w3.org/2000/svg">
                        <path d="M42.3938 8.53564C41.1774 8.52335 40.0058 8.99349 39.1351 9.84302C38.2644 10.6925 37.7655 11.8522 37.7479 13.0686C37.751 13.7086 37.892 14.3405 38.1612 14.9211C38.4304 15.5018 38.8215 16.0176 39.3079 16.4336L33.4479 18.4888L25.1089 8.80566C26.0042 8.50693 26.784 7.93646 27.3396 7.17358C27.8953 6.41071 28.1992 5.49331 28.2089 4.54956C28.1837 3.33432 27.6832 2.17743 26.8149 1.3269C25.9465 0.476377 24.7794 0 23.5639 0C22.3484 0 21.1813 0.476377 20.3129 1.3269C19.4446 2.17743 18.9441 3.33432 18.9189 4.54956C18.9285 5.48395 19.2261 6.39274 19.771 7.15186C20.316 7.91097 21.0817 8.48368 21.9639 8.79175L13.6119 18.4917L7.75396 16.4368C8.24003 16.0206 8.63074 15.5045 8.89959 14.9238C9.16843 14.3432 9.30908 13.7116 9.31194 13.0718C9.33497 12.195 9.10937 11.3296 8.6613 10.5757C8.21324 9.82172 7.56095 9.2099 6.77983 8.81104C5.99872 8.41217 5.12072 8.2424 4.24724 8.32153C3.37376 8.40067 2.54051 8.72555 1.8438 9.2583C1.14709 9.79105 0.61538 10.5101 0.310108 11.3323C0.00483695 12.1545 -0.0615238 13.0462 0.118702 13.9045C0.298928 14.7629 0.718349 15.5526 1.32854 16.1826C1.93873 16.8126 2.7148 17.2571 3.56694 17.4646V29.7556C3.5743 29.8376 3.59101 29.9184 3.61687 29.9966C3.58394 30.1233 3.56721 30.2538 3.56694 30.3848C3.56694 34.7968 21.4859 34.9268 23.5289 34.9268C25.5719 34.9268 43.4909 34.7978 43.4909 30.3848C43.4902 30.2539 43.4733 30.1234 43.4408 29.9966C43.4685 29.9189 43.4853 29.8379 43.4909 29.7556V17.4646C44.5898 17.2244 45.5595 16.5828 46.2103 15.6653C46.861 14.7478 47.1458 13.6204 47.0091 12.5039C46.8724 11.3874 46.3239 10.3621 45.471 9.62866C44.6181 8.89526 43.5223 8.50653 42.3979 8.53857L42.3938 8.53564ZM21.1749 4.55176C21.1633 4.07755 21.2934 3.61062 21.5485 3.21069C21.8036 2.81076 22.172 2.49591 22.6069 2.3064C23.0417 2.11688 23.5232 2.06132 23.9898 2.14673C24.4564 2.23214 24.887 2.45463 25.2265 2.78589C25.566 3.11715 25.7991 3.542 25.8959 4.00635C25.9928 4.4707 25.9491 4.95345 25.7703 5.39282C25.5916 5.8322 25.2859 6.20831 24.8924 6.47314C24.4988 6.73798 24.0353 6.8795 23.561 6.87964C22.9362 6.88605 22.3343 6.64481 21.8871 6.2085C21.44 5.77218 21.1838 5.17647 21.1749 4.55176ZM13.5849 20.8276C13.8019 20.9026 14.0362 20.9113 14.2581 20.8525C14.48 20.7938 14.6794 20.6701 14.8309 20.4976L23.5309 10.3977L32.2309 20.4976C32.3821 20.6702 32.5813 20.7938 32.803 20.8528C33.0248 20.9117 33.2589 20.9033 33.4759 20.8286L41.2339 18.1038V28.0408C36.3489 25.9188 25.1249 25.8406 23.5339 25.8406C21.9429 25.8406 10.7149 25.9198 5.83391 28.0408V18.1038L13.5849 20.8276ZM23.5279 32.7166C14.8279 32.7166 9.27888 31.7057 6.97087 30.8547C6.6198 30.7373 6.28407 30.578 5.97087 30.3806C6.69287 29.8596 9.03194 29.1487 12.9369 28.6487C19.9723 27.844 27.0765 27.844 34.1119 28.6487C38.0119 29.1487 40.357 29.8596 41.077 30.3806C40.7663 30.5794 40.4321 30.7388 40.082 30.8547C37.78 31.7037 32.2359 32.7166 23.5279 32.7166ZM2.28093 13.0686C2.2698 12.5945 2.40025 12.1279 2.65557 11.7283C2.91089 11.3286 3.27952 11.0139 3.71441 10.8247C4.14929 10.6355 4.63063 10.5801 5.0971 10.6658C5.56356 10.7514 5.99399 10.9743 6.3333 11.3057C6.67261 11.637 6.90543 12.0618 7.00212 12.5261C7.09882 12.9904 7.05498 13.4731 6.87615 13.9124C6.69732 14.3516 6.39159 14.7277 5.9981 14.9924C5.6046 15.2572 5.14118 15.3986 4.66692 15.3987C4.04176 15.4054 3.43941 15.1638 2.99212 14.7271C2.54482 14.2903 2.28911 13.6937 2.28093 13.0686ZM42.3938 15.3987C41.9359 15.3875 41.4914 15.2414 41.116 14.9788C40.7406 14.7162 40.451 14.3487 40.2834 13.9224C40.1158 13.496 40.0776 13.0297 40.1738 12.5818C40.2699 12.1339 40.496 11.7241 40.8238 11.4041C41.1516 11.084 41.5664 10.8677 42.0165 10.7822C42.4666 10.6968 42.9319 10.7459 43.3542 10.9236C43.7765 11.1013 44.137 11.3997 44.3906 11.7812C44.6442 12.1628 44.7796 12.6105 44.78 13.0686C44.7713 13.6935 44.5153 14.2895 44.068 14.7261C43.6208 15.1626 43.0188 15.4041 42.3938 15.3977V15.3987Z" />
                    </svg>                        
                    <span className="features-item-title">Quality assurance</span>
                    <p className="features-item-txt">Worldwide delivery on all. Authorit tively morph next-generation innov tion with extensive models.</p>
                </div>
            </div>
        </section>
        <section className="feedback feedback-catalog">
            <div className="feedback-wrap">
                <div className="feedback-wrap-info">
                    <div className="feedback-preview-avatar"></div>
                    <div className="feedback-preview-comment">
                        <p className="feedback-info-txt">&laquo;Vestibulum quis porttitor dui! Quisque viverra nunc&nbsp;mi, 
                            <span className="txt-italics">a&nbsp;pulvinar purus condimentum&raquo;</span>
                        </p>
                    </div>
                </div>
                <div className="subscribing">
                    <span className="subscribing-title">subscribe</span>
                    <span className="subscribing-subtitle">for our newletter and promotion</span>
                    <div className="subscribing-wrap">
                        <form action="#" className="subscribing-form">
                            <input className="subscribing-input-email" type="email" placeholder="Enter Your Email" required>
                            <input className="subscribing-btn" type="submit" value="Subscribe">
                        </form>
                    </div>
                </div>
            </div>
        </section> */}
            <Footer />
        </main>

        </>
    );
}