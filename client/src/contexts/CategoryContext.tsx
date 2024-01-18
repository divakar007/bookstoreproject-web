import {CategoryItem} from "../Components/types";
import {createContext, ReactNode, useEffect, useState} from "react";
import axios from "axios";


export const Category = createContext<CategoryItem[] | []>([]);   // creates a context called Category
Category.displayName = 'CategoryContext';
interface categoryContextProp{
    children:ReactNode;
}
function CategoryContext ({ children }:categoryContextProp)  {
    const [categories, setCategories]  = useState([]);
    useEffect(() => {
        axios.get('categories')
            .then((result) => setCategories(result.data ))
            .catch(console.error);
    }, []);
    return (
        <Category.Provider value ={categories}>{children}</Category.Provider>
    );
}
export default CategoryContext;
