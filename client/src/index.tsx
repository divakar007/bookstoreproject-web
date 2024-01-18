import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CategoryContext from "./contexts/CategoryContext";
import {CartProvider} from "./contexts/AddToCartConext";
import OrderDetailContext from "./contexts/OrderDetailContext";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <OrderDetailContext>
    <CategoryContext>
        <CartProvider>
        <App />
        </CartProvider>
    </CategoryContext>
    </OrderDetailContext>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
