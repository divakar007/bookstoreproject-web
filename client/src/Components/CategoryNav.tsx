import {Link } from "react-router-dom";
import React, {useContext} from "react";
import {CategoryItem} from './types';
import {Category} from "../contexts/CategoryContext";

function CategoryNav(){
    let presentSection = window.location.href.replaceAll('%20',' ').split('/').at(-1);
    const categories = useContext<CategoryItem[]>(Category);
    return (
        <div className="cat-nav-item">
            {
                categories.map((categoryItem) => <Link
                className={`nav-item ${presentSection === categoryItem.name ? 'selected-nav-item' : ''}`}
                to={'/categories/' + categoryItem.name}
                key={categoryItem.categoryId}
                >
                {categoryItem.name}
                </Link>
                )
            }
        </div>
    )
}

export default CategoryNav;