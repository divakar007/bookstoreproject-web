import '../assets/css/Categories.css'
import CategoryBookSlide from "./CategoryBookSlide";
import React from "react";
import CategoryNav from "./CategoryNav";
import axios from "axios";
import {useParams} from "react-router-dom";
import CategoryBookItemContext from "../contexts/CategoryBookItemContext";

function Categories(props: { name: string | undefined;}){

    //axios.defaults.baseURL='http://localhost:8080/DivakaraBookstoreReactOrder/api/'
    //axios.defaults.baseURL = 'http://webdev.cs.vt.edu:8080/DivakaraBookstoreReactOrder/api/'

    const {paramName:paraName} = useParams<{paramName:string}>();
    let categoryName =props.name||paraName
    if (categoryName === undefined){
        categoryName = "";
    }

    return (
        <div className="cat-body-container">
            <CategoryNav/>
            <CategoryBookItemContext categoryName={categoryName}>
                <CategoryBookSlide/>
            </CategoryBookItemContext>
        </div>
    )
}

export default Categories;