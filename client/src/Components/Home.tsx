import '../assets/css/Home.css'
import HomeBookSlide from "./HomeBookSlide";
import axios from "axios";
import {Link} from "react-router-dom";
import HomeBookItemContext from "../contexts/HomeBookItemContext";

function Home(){
    //axios.defaults.baseURL = 'http://webdev.cs.vt.edu:8080/DivakaraBookstoreReactOrder/api/'
    //axios.defaults.baseURL='http://localhost:8080/DivakaraBookstoreReactOrder/api/'

    return (
        <div className="body-container">
            <div className="left-body">
                <div className="offer-percentage"><p>50% OFF</p></div>
                <div className="shop-now">
                    <Link className="primary-button buttons" to={'/categories/New Releases'} >SHOP NOW</Link>
                </div>
            </div>
            <div className="right-body">
                <div className="right-body-top"><p>NEW RELEASES <i className="fa-solid fa-fire-flame-curved red"></i> </p></div>
                <HomeBookItemContext>
                    <HomeBookSlide/>
                </HomeBookItemContext>
                <div className="right-body-bottom">
                    'LOVE BLOOMS BETWEEN THE LINES OF A GOOD BOOK'
                </div>
            </div>
        </div>
    )
}

export default Home;