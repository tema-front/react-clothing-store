import { useEffect, useState } from "react";
import { Categories } from "../Categories";
import { Header } from "../Header";
import { ProductCard } from "../ProductCard";
import { Features } from "../Features";

import product_12009 from '../../img/.jpg/products_card/product_12009.jpg'
import product_12019 from '../../img/.jpg/products_card/product_12019.jpg'
import product_12029 from '../../img/.jpg/products_card/product_12029.jpg'
import product_12039 from '../../img/.jpg/products_card/product_12039.jpg'
import product_12049 from '../../img/.jpg/products_card/product_12049.jpg'
import product_12059 from '../../img/.jpg/products_card/product_12059.jpg'
import { Feedback } from "../Feedback";
import { Footer } from "../Footer";

export const HomePage = () => {
    const [homeProductsCard, setHomeProductsCard] = useState([
        {title: 'jacket', description: '', price: '52', category: '', brand: '', designer: '', size: '', id: product_12009},
        {title: 'costume | throusers \u0026 jacket', description: '', price: '60', category: '', brand: '', designer: '', size: '', id: product_12019},
        {title: 'hoodie \u0026 panama hat', description: '', price: '45', category: '', brand: '', designer: '', size: '', id: product_12029},
        {title: 't-shirt \u0026 pants', description: '', price: '59', category: '', brand: '', designer: '', size: '', id: product_12039},
        {title: 'blazer', description: '', price: '70', category: '', brand: '', designer: '', size: '', id: product_12049},
        {title: 'shirt', description: '', price: '36', category: '', brand: '', designer: '', size: '', id: product_12059},
    ])

    return (
        <>
        <Header itsHomePage={true}/>
        <main className="content-home">
            <Categories />
            <section className="products">
                <div className="products-info">
                    <span className="products-title">Fetured Items</span>
                    <p className="products-txt">Shop for items based on what we featured in this week</p>
                </div>
            <div className="products-wrap">
                <ProductCard cards={homeProductsCard}/>
            </div>
            <div className="products-btn-wrap">
                <a href="./catalog.html" className="products-btn">Browse&nbsp;All&nbsp;Product</a>
            </div>
            </section>
            <Features />
            <Feedback />
            <Footer />
        </main>
        </>
    );
}