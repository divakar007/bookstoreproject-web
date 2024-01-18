
import  "../assets/css/checkout.css"
import { isCreditCard, isMobilePhone, isvalidEmail } from './utils';
import {CategoryBookItem, CustomerForm, months, OrderDetails,  years} from "./types";
import {CartStore} from "../contexts/AddToCartConext";
import React, {ChangeEvent, FormEvent, useContext, useState} from "react";
import { useNavigate} from "react-router-dom";
import {CartTypes} from "../reducers/CartReducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import {faMinusCircle} from "@fortawesome/free-solid-svg-icons/faMinusCircle";
import axios from "axios";
import orderDetailContext, {OrderDetailsStore} from "../contexts/OrderDetailContext";

function CheckoutPage() {

    const getBookImageUrl = function (book: CategoryBookItem): string {
        try {
            return require('../assets/images/' + book.bookId + ".png");
        } catch (_) {
            return require('../assets/images/error.png');
        }
    };

    /*
     * This will be used by the month and year expiration of a credit card
     *  NOTE: For example yearFrom(0) == <current_year>
    */
    function yearFrom(index: number) {
        return new Date().getFullYear() + index;
    }

    const {cart, dispatch} = useContext(CartStore);
    const navigate = useNavigate();


    let totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    let totalAmount = cart.reduce((totalAmount, item) => totalAmount + item.quantity * item.book.price, 0);
    let tax = ((totalAmount / 100) * 6 / 100);
    let TotalAmountAfterTax = (totalAmount / 100) + ((totalAmount / 100) * 6 / 100);

    const [nameError, setNameError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [creditError, setCreditError] = useState("");

    // TO DO error states for the rest of the input elements

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        email: "",
        ccNumber: "",
        ccExpiryMonth: 0,
        ccExpiryYear: 0
    });

    const [checkoutStatus, setCheckoutStatus] = useState("");

    function isValidForm() {

        //TO DO code that returns true is the customer form is valid, false otherwise
        if (formData.name && formData.email && formData.address && formData.phone && formData.ccNumber) {

            return !nameError && !addressError && !emailError && !phoneError && !creditError;
        }
        if(!formData.name) {
            setNameError("Name must be at least 4 characters long!");
        }
        if(!formData.email) {
            setEmailError("Enter a valid Eamil address.");
        }
        if(!formData.ccNumber) {
            setCreditError("Enter a valid credit card number.");
        }
        if(!formData.phone){
            setPhoneError("Enter a valid phone number.");
        }
        if(!formData.address){
            setAddressError("Address must be at least 4 characters long!");
        }
        return false;
    }

    // TO DO placeOrder function comes here. Needed for project 9 (not 8)

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {

        const {name, value} = event.target;

        switch (name) {
            case 'name':
                setFormData((prevFormData) => ({...prevFormData, [name]: value}));
                if (value.length < 4 || value.length > 45) {
                    setNameError("Name must be at least 4 characters long!");
                } else {
                    setNameError("");
                }
                break;

            case 'address':

                setFormData((prevFormData) => ({...prevFormData, [name]: value}));
                if (value.length < 4 || value.length > 45) {
                    setAddressError("Name must be at least 4 characters long!");
                } else {
                    setAddressError("");
                }
                break;

            case 'phone':

                setFormData((prevFormData) => ({...prevFormData, [name]: value}));

                if (!isMobilePhone(value)) {
                    setPhoneError("Please enter valid phone number.");
                } else {
                    setPhoneError("");
                }
                break;

            case 'email':

                //TO DO for email validation
                setFormData((prevFormData) => ({...prevFormData, [name]: value}));
                if (!isvalidEmail(value)) {
                    setEmailError("Please enter valid Email.");
                } else {
                    setEmailError("");
                }
                break;

            case 'ccNumber':
                setFormData((prevFormData) => ({...prevFormData, [name]: value}));
                if (!isCreditCard(value)) {
                    setCreditError("Please enter valid credit card number.");
                } else {
                    setCreditError("");
                }
                break;

            case 'ccExpiryMonth':
                setFormData((prevFormData) => ({...prevFormData, [name]: parseInt(value, 10)}));
                break;
            case 'ccExpiryYear':
                setFormData((prevFormData) => ({...prevFormData, [name]: parseInt(value, 10)}));
                break;
            default:
                break;
        }
    }
    const {orderDetails,orderDetailsDispatch} = useContext(OrderDetailsStore);
    async function submitOrder(event:FormEvent) {
        event.preventDefault();
        console.log("Submit order");
        const isFormCorrect =  isValidForm();
        console.log(isFormCorrect);
        if (!isFormCorrect) {
            setCheckoutStatus("ERROR");
        } else {
            setCheckoutStatus("PENDING");
            const orders = await placeOrder({
                name: formData.name,
                address: formData.address,
                phone: formData.phone,
                email: formData.email,
                ccNumber: formData.ccNumber,
                ccExpiryMonth: formData.ccExpiryMonth,
                ccExpiryYear: yearFrom(formData.ccExpiryYear),
            })
            if(orders) {
                setCheckoutStatus("OK");
                navigate('/confirmation');}
            else{
                console.log("Error placing order");
            }
        }
    }
    const placeOrder =  async (customerForm: CustomerForm) =>  {
        const order = { customerForm: customerForm, cart:{itemArray:cart} };
        const orders = JSON.stringify(order);
        const url = 'orders';
        const orderDetails: OrderDetails = await axios.post(url, orders,
            {headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((response) => {
                dispatch({type: CartTypes.CLEAR});
                navigate("/confirmation")
                console.log(response);
                return response.data;
            })
            .catch((error)=>setCheckoutStatus("ERROR"));
        orderDetailsDispatch({type:"UPDATE",orderDetails:orderDetails});
        console.log("order deatils: ", orderDetails);
        return orderDetails;
    }

    function continueShopping() {
        navigate(-2);
    }

    if (cart.length !== 0) {
        return (
            <section className="checkout-cart-table-view">
                <div className="checkout-page-body">
                    <div>
                        <form
                            className="checkout-form"
                            onSubmit={(event) => submitOrder(event)}
                            method="post"
                        >
                            <table>
                                <tbody>
                                <tr>
                                    <td className="label-column">
                                        <label htmlFor="fname">Name</label>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            size={40}
                                            name="name"
                                            id="fname"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}> {nameError && <div className="error"> {nameError}</div>}</td>
                                </tr>
                                <tr>
                                    <td className="label-column">
                                        <label htmlFor="faddress">Address</label>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            size={40}
                                            name="address"
                                            id="faddress"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}> {addressError && <div className="error"> {addressError}</div>}</td>
                                </tr>
                                <tr>
                                    <td className="label-column">
                                        <label htmlFor="femail">Email</label>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            size={40}
                                            name="email"
                                            id="femail"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}> {emailError && <div className="error"> {emailError}</div>}</td>
                                </tr>
                                <tr>
                                    <td className="label-column">
                                        <label htmlFor="fphone">Phone</label>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            size={40}
                                            name="phone"
                                            id="fphone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}> {phoneError && <div className="error"> {phoneError}</div>}</td>
                                </tr>

                                {/*  TO DO add the form elements for phone, address, email, and Credit card*/}
                                {/* Together with the error display*/}
                                <tr>
                                    <td className="label-column">
                                        <label htmlFor="fcredit">Card</label>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            size={40}
                                            name="ccNumber"
                                            id="fcredit"
                                            value={formData.ccNumber}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}> {creditError && <div className="error"> {creditError}</div>}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="fccExpiryMonthAndYear">Exp Date</label>
                                    </td>
                                    <td>
                                        <select style={{color: 'black'}} name="ccExpiryMonth"
                                                value={formData.ccExpiryMonth}
                                                onChange={handleInputChange}
                                                id={"fccExpiryMonthAndYear"}>
                                            {months.map((month, i) => (
                                                <option key={i} value={i + 1}>
                                                    {month}
                                                </option>
                                            ))}
                                        </select>
                                        &nbsp;
                                        <select style={{color: 'black'}} name="ccExpiryYear"
                                                value={formData.ccExpiryYear}
                                                onChange={handleInputChange}
                                                >
                                            {years.map((year, i) => (
                                                <option key={i} value={i + 1}>
                                                    {yearFrom(i)}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <div className={"checkout-summary"}>
                                <table>
                                    <thead>
                                    <tr>
                                        <td colSpan={2}>
                                            <b> Checkout Summary </b>
                                        </td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <b>Total Items :</b>
                                        </td>
                                        <td>
                                            <b>{totalQuantity}</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>Surcharge (6%) :</b>
                                        </td>
                                        <td>
                                            <b>${tax.toFixed(2)}</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><b>Total Price :</b></td>
                                        <td>
                                            <b>${TotalAmountAfterTax.toFixed(2)}</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <button className={"buttons"}> complete purchase</button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>


                    {/* TO DO the checkout box with the total cost, tax) */}
                    {/* and the Complete Purchase button comes here*/}


                    <div>
                        {/*The following code displays different string based on the */}
                        {/*value of the checkoutStatus*/}
                        {/*Note the ternary operator*/}
                        {
                            checkoutStatus !== '' ?
                                <>
                                    <section className="checkoutStatusBox">
                                        {(checkoutStatus === 'ERROR') ?
                                            <div>
                                                Error: Please fix the problems above and try again.
                                            </div> : (checkoutStatus === 'PENDING' ?
                                                <div>
                                                    Processing...
                                                </div> : (checkoutStatus === 'OK' ?
                                                    <div>
                                                        Order placed...
                                                    </div> :
                                                    <div>
                                                        An unexpected error occurred, please try again.
                                                    </div>))}
                                    </section>
                                </>
                                : <></>}
                    </div>
                </div>

                <div>
                    {/*This displays the information about the items in the cart*/}
                    <ul className="checkout-cart-info">
                        {
                            cart?.map((item, i) => (
                                <div className="checkout-cart-book-item" key={item.id}>
                                    <div className="checkout-cart-book-image" key={i}>
                                        <img src={getBookImageUrl(item.book)} alt="title"
                                             className="checkout-cart-info-img"
                                             width="20%"
                                             height="20%"
                                        />
                                    </div>
                                    <div className="checkout-cart-book-info">
                                        <div className="checkout-cart-book-title">{item.book.title}</div>

                                        <div className="checkout-cart-book-subtotal">
                                            <b>{(item.book.price * item.quantity / 100).toFixed(2)}</b>
                                        </div>
                                        <div className="checkout-cart-book-quantity">
                                            <button className="checkout-icon-button inc-button" onClick={() => {
                                                dispatch({type: CartTypes.ADD, book: item.book, id: item.book.bookId});
                                            }}>
                                                <i className="fas fa-plus-circle"></i>
                                            </button>
                                            <button className="checkout-num-button">{item.quantity}</button>
                                            <button className="checkout-icon-button dec-button"
                                                    onClick={() => {
                                                        dispatch({
                                                            type: CartTypes.REMOVE,
                                                            book: item.book,
                                                            id: item.book.bookId
                                                        });
                                                    }}
                                            >
                                                <i className="fas fa-minus-circle"></i>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            ))}
                    </ul>
                </div>
            </section>
        )
    }
    else {
        return (
            <div>
                {/*Your cart is empty. <Link to="/Categories">Continue shopping</Link>*/}
                <img className="empty-cart" src={require("../assets/images/emptycart.png")} alt="emptycart"/>
                {cart.length === 0 && (
                    <div className={"align-center"}>
                        <span> <b>Your cart is empty. Add books to your cart. </b> </span>
                        <button onClick={continueShopping} className="buttons secondary-button ">Continue shopping</button>
                    </div>
                )}
            </div>
        )
    }
}
export default CheckoutPage;