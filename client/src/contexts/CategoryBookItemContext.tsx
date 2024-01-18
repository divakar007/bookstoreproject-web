import {createContext, ReactNode, useEffect, useState} from "react";
import {CategoryBookItem} from "../Components/types";
import axios from "axios";

export const categoryBookItem = createContext<CategoryBookItem[] | []>([]);   // creates a context called Category
categoryBookItem.displayName = 'CategoryBookItem'

interface categoryBookItemContextProp{
    children:ReactNode;
    categoryName:string;
}

function CategoryBookItemContext ({ children , categoryName}:categoryBookItemContextProp)  {

    const [categoryBookItemList, setBooks]  = useState([]);
    useEffect(() => {
        axios.get('/categories/name/'+categoryName+'/books')
            .then((result) => setBooks(result.data ))
            .catch(console.error);
    }, [categoryName]);

    return (
        <categoryBookItem.Provider value ={categoryBookItemList}>
            {children}
        </categoryBookItem.Provider>
    );
}
export default CategoryBookItemContext;