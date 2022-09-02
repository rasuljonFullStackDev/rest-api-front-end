import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { categoryAdd } from "../action/categoryAction";
import axios from "axios";
import { productAdd } from "../action/productAction";
import { cartAdd } from "../action/cartAction";
import { orderAdd, orderDate } from "../action/orderAction";
import { usersAdd } from "../action/usersAction";
import { orderItemAdd } from "../action/orderItemAction";
import { profileAdd, userDetil, userLogout } from "../action/profileAction";
import { useNavigate } from "react-router-dom";
export const Config = ({ dispatch }) => {
  const { categoryUpdate } = useSelector((state) => state.categoryReducer);
  const { productUpdate } = useSelector((state) => state.productReducer);
  const { orderItemUpdate } = useSelector((state) => state.orderItemReducer);
  const { cartUpdate } = useSelector((state) => state.cartReducer);
  const { orderUpdate } = useSelector((state) => state.orderReducer);
  const { load, user } = useSelector((state) => state.profileReducer);
  const { usersUpdate } = useSelector((state) => state.usersReducer);
  const { rules } = user;
  const path = useNavigate()
  // tekshiruv
 
  return (
    <div className={load ? "load activ" : "load"}>
      <img src="/img/load.svg" alt="" />
    </div>
  );
};
