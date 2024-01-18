import '../assets/css/categoryBookSlide.css'
import {CategoryBookItem} from "./types";
import React, {useContext} from "react";
import {categoryBookItem} from "../contexts/CategoryBookItemContext";
import {CartTypes} from "../reducers/CartReducer";
import {CartStore} from "../contexts/AddToCartConext";

function trimString(text:String, maxLength:number) {
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength) + '...';
}

function CategoryBookSlide(){
    const categoryBookItems = useContext<CategoryBookItem[]>(categoryBookItem);
    const  {dispatch} = useContext(CartStore);
    const addBookToCart = (book:CategoryBookItem) => {
        dispatch({ type: CartTypes.ADD, id: book.bookId, item:book });
    };
    return (
        <div className="cat-body-bottom">
            {categoryBookItems.map((book) => (
                <div className="cat-book-slide" key={book.bookId}>
                    <div className="image-container">
                        <img className="cat-book-image" src={require("../assets/images/"+book.bookId+".png")} alt="book"/>
                        {book.isPublic ? (<button className="corner-button"><i className="fa-solid fa-book"></i></button>
                            ) : <></>
                        }
                    </div>
                    <p className="cat-book-name book-text">{trimString(book.title,20)}</p>
                    <p className="cat-book-author book-text">{book.author}</p>
                    <div className="book-slide-bottom">
                        <p className="cat-book-price book-text">${(book.price / 100).toFixed(2) }</p>
                        <button className="cat-book-button buttons" onClick={() => addBookToCart(book)}>Add to cart</button>
                    </div>
                </div>
            ))
            }
        </div>
    )
}

export default CategoryBookSlide;