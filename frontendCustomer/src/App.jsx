import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css";

//pages
import Home from "./pages/Home";
import Error from "./pages/Error";

import About from "./pages/About";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import SignIn from "./pages/SignIn";
import Success from "./pages/Success";
import SetAccount from "./pages/SetAccount";
import SetPassword from "./pages/SetPassword";
import SignUp from "./pages/SignUp";
import FoodDetails from "./components/FoodDetails";
import Transaction from "./pages/Transaction";

const App = () => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   return (
      <BrowserRouter>
         <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/menu" element={<Menu />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/signUp" element={<SignUp/>}/>
            <Route exact path="/signIn" element={<SignIn setIsLoggedIn={setIsLoggedIn}/>} />
            <Route exact path="/setAccount" element={<SetAccount/>} />
            <Route exact path="/setPassword" element={<SetPassword/>}></Route>
            <Route path="/product/:id" element={<FoodDetails/>} />
            <Route exact path="/transaction" element={<Transaction/>}/>
            <Route exact path="/*" element={<Error />} />
            <Route
               exact
               path="/success"
               element={<ProtectedRoute element={<Success />} />}
            />
         </Routes>
      </BrowserRouter>
   );
};

export default App;
