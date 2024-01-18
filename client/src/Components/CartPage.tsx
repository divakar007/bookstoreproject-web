import React from "react";
import "../assets/css/CartPage.css";
import CartTable from "./CartTable";
import CartSummary from "./CartSummary";

function CartPage(){
        return (
            <div className="cart-page">
                    <CartTable/>
                    <CartSummary/>
            </div>
        )
}

export default CartPage;