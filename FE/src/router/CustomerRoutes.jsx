import React from "react";
import {Routes, Route} from "react-router-dom"
import Collection from "../pages/Collection"
import Home from "../pages/Home"
import Contact from "../pages/Contact"
import Login from "../pages/Login"
import Orders from "../pages/Orders"
import PlaceOrder from "../pages/PlaceOrder"
import NavBar from "../components/Navbar"
import About from "../pages/About"
import Product from "../pages/Product"
import Cart from "../pages/Cart"
import Footer from "../components/Footer";
import '../index.css';
import SearchBar from "../components/SearchBar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'



const CustomerRoutes = () => {
  return(
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer/>
      <NavBar/>
      <SearchBar/>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/collection" element={<Collection/>} />
        <Route path="/about" element={ <About/>}/>
        <Route path="/contact" element={ <Contact/>}/>
        <Route path="/product/:productId" element={ <Product/>}/>
        <Route path="/cart" element={ <Cart/>}/>
        <Route path="/login" element={ <Login/>}/>
        <Route path="/place-order" element={<PlaceOrder/>}/>
        <Route path="/orders" element={ <Orders/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default CustomerRoutes;
