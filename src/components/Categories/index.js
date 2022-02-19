import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addCategory, cleanFilter } from "../../store/filter/actions";
import { getFilters } from "../../store/filter/selectors";
import { cleanFiltredList } from "../../store/cards/actions";

export const Categories = () => {
    const filters = useSelector(getFilters);
    const dispatch = useDispatch();
    const [categories] = useState([
        {subtitle: '30% off', title: 'for women', id: 'category-women'},
        {subtitle: 'hot deal', title: 'for men', id: 'category-men'},
        {subtitle: 'new arrivals', title: 'for kids', id: 'category-kids'},
        {subtitle: `luxirous\u00A0\u0026\u00A0trendy`, title: 'accessories', id: 'category-accesories'}
    ]);

    const handleAddCategory = (category) => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0; 
        if (category.split(' ')[1] === filters.category || category === filters.category) return;
        dispatch(cleanFiltredList);
        dispatch(cleanFilter);
        if (!category.split(' ')[1]) {
            dispatch(addCategory(category));
            return;
        }
        dispatch(addCategory(category.split(' ')[1]))
    }


    return (
        <section className="categories">
            {categories?.map(category => 
                <Link to={'/catalog/1'} onClick={() => handleAddCategory(category.title)} className="category-item" key={category.id}>
                    <span className="category-item-subtitle">{category.subtitle}</span>
                    <h3 className="category-item-title">{category.title}</h3>
                </Link>
            )}
        </section>
    );
}