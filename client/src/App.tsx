import React from 'react'
import './App.css'
import './Components/AppHeader'
import './assets/css/Home.css'
import './Components/Categories'

import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom"

import AppHeader from "./Components/AppHeader";
import AppFooter from "./Components/AppFooter";
import Home from "./Components/Home";
import Categories from "./Components/Categories";
import ErrorPage from "./Components/ErrorPage";
import axios from "axios";
import CartPage from "./Components/CartPage";
import CheckoutPage from "./Components/CheckoutPage";
import ConfirmationPage from "./Components/ConfirmationPage";

function App() {
    //axios.defaults.baseURL='http://localhost:8080/DivakaraBookstoreReactTransact/api'
    axios.defaults.baseURL = 'http://webdev.cs.vt.edu:8080/DivakaraBookstoreReactTransact/api'

    return (
      <Router basename="/DivakaraBookstoreReactTransact">
          <AppHeader/>
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/categories/:paramName" element={<Categories name={undefined}/>} />
            <Route path="/categories" element={<Categories name={"New Releases"} />} />
            <Route path="/cartPage" element={<CartPage/>}/>
            <Route path="/checkoutPage" element={<CheckoutPage/>} />
            <Route path = "/confirmation" element={<ConfirmationPage/>}/>
          <Route path="*" element={<ErrorPage />}/>
        </Routes>
        <AppFooter />
      </Router>
  );
}

export default App;

