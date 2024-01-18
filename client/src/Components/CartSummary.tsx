import {useContext} from "react";
import {CartStore} from "../contexts/AddToCartConext";
import {Link} from "react-router-dom";

function CartSummary(){
    const { cart} = useContext(CartStore);
    let totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    let totalAmount = cart.reduce((totalAmount,item) => totalAmount + item.quantity*item.book.price , 0);
    let tax = ((totalAmount/100) * 6/100);
    let TotalAmountAfterTax = (totalAmount/100) + ((totalAmount/100) * 6/100);

    const continueShopping = () => {
        window.history.back();
    }

    return(
        <div className="cart-summary">
            {cart.length > 0 && (
                <div className="cart-summary-top">
                    <table className="cart-summary-table">
                        <thead>
                        <tr>
                            <td className="cart-summary-table-td">
                                <h2>CART SUMMARY</h2>
                            </td>
                            <td className="cart-summary-table-td2">

                            </td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="cart-summary-table-td">
                                Total Items:
                            </td>
                            <td className="cart-summary-table-td2">
                                {totalQuantity}
                            </td>
                        </tr>
                        <tr>
                            <td className="cart-summary-table-td">
                                Sub total :
                            </td>
                            <td className="cart-summary-table-td2">
                                ${(totalAmount/100).toFixed(2)}
                            </td>
                        </tr>
                        <tr>
                            <td className="cart-summary-table-td">
                                Tax(6%):
                            </td>
                            <td className="cart-summary-table-td2">
                                ${tax.toFixed(2)}
                            </td>
                        </tr>
                        <tr>
                            <td className="cart-summary-table-td">
                                Total Cost after tax:
                            </td>
                            <td className="cart-summary-table-td2">
                                ${TotalAmountAfterTax.toFixed(2)}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="cart-summary-bottom">
                        <div id={"checkout-button"} className={"align-right"} >
                            <Link to="/checkoutPage" className="primary-button buttons">
                                Proceed to Checkout
                            </Link>
                        </div>
                        <div className={"align-right"}>
                            <button onClick={continueShopping} className="secondary-button buttons">Continue shopping</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CartSummary;