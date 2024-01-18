import '../assets/css/HomeBookSlide.css';
import Star from "./Star";
import {CategoryBookItem} from "./types";
import {useContext} from "react";
import {HomeBookItem} from "../contexts/HomeBookItemContext";

function HomeBookSlide(){
    const homeBookItemsList = useContext<CategoryBookItem[]>(HomeBookItem);
    return(
        <div className="right-body-middle">
        {homeBookItemsList.map((categoryBookItem) => (
            <div key={categoryBookItem.bookId} className="book-slide">
                <img src={require("../assets/images/"+categoryBookItem.bookId+".png")}  alt="book.title" className="book-image"/>
                <p>{categoryBookItem.author}</p>
                <div className="stars">
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                </div>
            </div>
            ))}
        </div>
    )
}

export default HomeBookSlide;