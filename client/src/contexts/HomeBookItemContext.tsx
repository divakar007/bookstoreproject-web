import {createContext, ReactNode, useEffect, useState} from "react";
import {CategoryBookItem} from "../Components/types";
import axios from "axios";

export const HomeBookItem = createContext<CategoryBookItem[] | []>([]);   // creates a context called Category
HomeBookItem.displayName = 'HomeBookItem'

interface homeBookItemContextProp{
    children:ReactNode;
}

function HomeBookItemContext ({ children }:homeBookItemContextProp)  {

    const [homeBookList, setBooks]  = useState([]);
    useEffect(() => {
        axios.get('/categories/1002/suggested-books')
            .then((result) => setBooks(result.data ))
            .catch(console.error);
    }, []);
    return (
        <HomeBookItem.Provider value ={homeBookList}>
            {children}
        </HomeBookItem.Provider>
    );
}
export default HomeBookItemContext;