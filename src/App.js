import React from "react";
import { Routes, Route } from "react-router-dom";
import "./ui/ui.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector, useDispatch } from "react-redux";
import Erorr from "./pages/Erorr";
import Category from "./pages/Admin/Category";
import Product from "./pages/Admin/Product";
// /api/v1/
import axios from "axios";
import { Config } from "./redux/Config/Config";
import Cart from "./pages/Admin/Cart";
import Hisobot from "./pages/Admin/Hisobot";
import Order from "./pages/Admin/Order";
import Users from "./pages/Admin/Users";
import Profile from "./pages/Admin/Profile";
import { useEffect } from "react";
// axios.defaults.baseURL = "https://api.goldinvest.uz/api/v1";
axios.defaults.baseURL = "http://localhost/rest-api/v1/api/";
const App = () => {
  const { user } = useSelector((state) => state.profileReducer);
  const dispatch = useDispatch();
  return (
    <>
      <Config dispatch={dispatch} />
      <Routes>
        {user.rules ? (
          <>
            <Route path="/" element={<Category />} />
            <Route path="/product" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<Order />} />
            <Route path="/result" element={<Hisobot />} />
            <Route path="/users" element={<Users />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Register />} />
          </>
        )}
        <Route path="*" element={<Erorr />} />
      </Routes>
    </>
  );
};

export default App;
