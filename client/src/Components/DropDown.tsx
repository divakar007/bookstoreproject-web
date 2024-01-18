import {CategoryItem} from "./types";
import {Link} from "react-router-dom";
import React, {useContext} from "react";
import {Category} from "../contexts/CategoryContext";

function DropDown(){
    const categories = useContext<CategoryItem[]>(Category);
    return (
        <div className="dropdown-content">
            {
                categories.map((categoryItem) => {
                    let name = categoryItem.name;
                    return <Link to={'/categories/'+name} key={categoryItem.categoryId}>{categoryItem.name}</Link>;
                })
            }
        </div>
    )
}

export default DropDown;