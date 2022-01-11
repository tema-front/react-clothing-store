import { useState } from "react";
import { Link } from "react-router-dom";

export const Categories = () => {
    const [categories, setCategories] = useState([
        {subtitle: '30% off', title: 'for women', id: 'category-women'},
        {subtitle: 'hot deal', title: 'for men', id: 'category-men'},
        {subtitle: 'new arrivals', title: 'for kids', id: 'category-kids'},
        {subtitle: `luxirous\u00A0\u0026\u00A0trendy`, title: 'accesories', id: 'category-accesories'}
    ]);

    const openProductsCategory = (id) => {
        // alert(id)
    }



    return (
        <section className="categories">
            {categories?.map(category => 
                <Link to={'/catalog/1'} className="category-item" key={category.id} onClick={() => openProductsCategory(category.id)}>
                    <span className="category-item-subtitle">{category.subtitle}</span>
                    <span className="category-item-title">{category.title}</span>
                </Link>
            )}
            {/* <div className="category-item">
                <span className="category-item-subtitle">30% off</span>
                <span className="category-item-title">for women</span>
            </div>
            <div className="category-item">
                <span className="category-item-subtitle">hot deal</span>
                <span className="category-item-title">for men</span>
            </div>
            <div className="category-item">
                <span className="category-item-subtitle">new arrivals</span>
                <span className="category-item-title">for kids</span>
            </div>
            <div className="category-item">
                <span className="category-item-subtitle">luxirous &amp;&nbsp;trendy</span>
                <span className="category-item-title">accesories</span>
            </div> */}
        </section>
    );
}