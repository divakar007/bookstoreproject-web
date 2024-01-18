import React, {useContext} from 'react';
import '../assets/css/AppHeader.css';
import {Link} from "react-router-dom";
import DropDown from "./DropDown";
import {CartStore} from "../contexts/AddToCartConext";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function AppHeader(){
    const { cart } = useContext(CartStore);

    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className="header">
            <div className="title-bar" >
                <div className="title-logo">
                    <Link className="header-anchor"  to={'/'}>
                            <img className="title-logo-img" src={require("../assets/images/logo.png")} alt="logo"/>
                    </Link>
                </div>

                <div className="title">
                    <Link className="header-anchor" to={'/'}>
                        <span>DIVAKARA BOOK STORE</span>
                    </Link>
                </div>

                <div className="header-icons">
                    <button className="headerbtn"><i className="fa-solid fa-heart fa-2xl"></i></button>
                    <button className="headerbtn">
                            <Link className="cartButton" to="/cartPage">
                                <FontAwesomeIcon icon={faCartShopping} className="icon fa-2xl" />
                            </Link>
                            <Link to="/cartPage" className="counter-link">
                                <div className="counter">{totalQuantity}</div>
                            </Link>
                    </button>
                </div>
            </div>
            <div className="navigation-bar">
                <div className="left-navigation">
                    <div className="dropdown">
                        <button className="buttons dropbtn">
                            <i className="fa-solid fa-bars fa-2xl " ></i>
                        </button>
                        <DropDown/>
                    </div>
                    <div className="search-bar-container">
                        <input className="search-bar" type="text" placeholder="search books"/>
                            <button className="search-icon">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                    </div>
                </div>
                <div className="right-navigation">
                    <Link to={'/'}>
                        <button className="buttons">HOME</button>
                    </Link>
                    <Link to={'/error'}>
                        <button className="buttons">LOGIN</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default AppHeader;