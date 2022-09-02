import React from "react";
import { Routes, Route } from "react-router-dom";
import "./ui/ui.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector, useDispatch } from "react-redux";
import Erorr from "./pages/Erorr";
// /api/v1/
import axios from "axios";
import { Config } from "./redux/Config/Config";
import { useEffect } from "react";
import Cars from "./pages/Admin/Cars";
// axios.defaults.baseURL = "https://api.goldinvest.uz/api/v1";
axios.defaults.baseURL = "http://localhost/rest-api-back-end/v1/api/";
const App = () => {
  const { user } = useSelector((state) => state.profileReducer);
  const dispatch = useDispatch();
  return (
    <>
      <Config dispatch={dispatch} />
      <Routes>
        {user.rules ? (
          <>
            <Route path="/" element={<Cars />} />
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
