import React, {useContext, useEffect} from "react";
import "../assets/css/CartTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons/faMinusCircle";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import { CartStore } from "../contexts/AddToCartConext";
import { CategoryBookItem } from "./types";
import { CartTypes } from "../reducers/CartReducer";

function CartTable() {
    const { cart, dispatch } = useContext(CartStore);

    useEffect(() => {
        localStorage.setItem('cart',JSON.stringify(cart))
    }, [cart]);

    const addBookToCart = (bookItem: CategoryBookItem) => {
        dispatch({ type: CartTypes.ADD, item: bookItem, id: bookItem.bookId });
    };

    const removeBookFromCart = (bookItem: CategoryBookItem) => {
        dispatch({ type: CartTypes.REMOVE, item: bookItem, id: bookItem.bookId });
    };
    const deleteBookFromCart = (bookItem: CategoryBookItem) => {
        dispatch({ type: CartTypes.DELETE, item: bookItem, id: bookItem.bookId });
    };

    const clearCart = () => {
        dispatch({ type: CartTypes.CLEAR });
        window.location.href = "#";
    };
    const continueShopping = () => {
        window.history.back();
    }
    if (cart.length !== 0) {
        return (
            <div className="cart-table">
                <ul className="cart2">
                    <li className="table-heading">
                        <div className="heading-book">Book</div>
                        <div className="heading-book"></div>
                        <div className="heading-price">Price</div>
                        <div className="heading-price">Quantity</div>
                        <div className="heading-subtotal">Amount</div>
                    </li>
                    {cart.map((shoppingCartItem) => (
                        <li key={shoppingCartItem.id}>
                            <div className="cart-book-image">
                                <img
                                    src={require(`../assets/images/${shoppingCartItem.book.bookId}.png`)}
                                    alt={shoppingCartItem.book.title}
                                />
                                <div>
                                    <button className="delete-button" onClick={() => deleteBookFromCart(shoppingCartItem.book)}> Remove </button>
                                </div>
                            </div>
                            <div className="cart-book-title">{shoppingCartItem.book.title}</div>
                            <div className="cart-book-price">${shoppingCartItem.book.price/100}</div>
                            <div className="cart-book-quantity">
                                <button
                                    className="icon-button inc-button"
                                    onClick={() => addBookToCart(shoppingCartItem.book)}
                                >
                                    <FontAwesomeIcon icon={faPlusCircle} />
                                </button>
                                <span className="quantity">{shoppingCartItem.quantity}</span>
                                <button
                                    className="icon-button dec-button"
                                    onClick={() => removeBookFromCart(shoppingCartItem.book)}
                                >
                                    <FontAwesomeIcon icon={faMinusCircle} />
                                </button>
                            </div>
                            <div className="cart-book-subtotal">
                                ${(shoppingCartItem.book.price/100 * shoppingCartItem.quantity).toFixed(2)}
                            </div>
                        </li>
                    ))}
                    <li className="line-sep"></li>
                </ul>
                <div>
                    <button onClick={clearCart} className="clear-cart-button" >Clear cart</button>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                {/*Your cart is empty. <Link to="/Categories">Continue shopping</Link>*/}
                <img className="empty-cart" src={require("../assets/images/emptycart.png")} alt="emptycart"/>
                {cart.length === 0 && (
                    <div className={"align-center"}>
                        <button onClick={continueShopping} className="buttons secondary-button ">Continue shopping</button>
                    </div>
                )}
            </div>
        );
    }
}

export default CartTable;
