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
import { carsAdd } from "../action/carsAction";
export const Config = ({ dispatch }) => {
  const { carsUpdate } = useSelector((state) => state.carsReducer);
  const { productUpdate } = useSelector((state) => state.productReducer);
  const { orderItemUpdate } = useSelector((state) => state.orderItemReducer);
  const { cartUpdate } = useSelector((state) => state.cartReducer);
  const { orderUpdate } = useSelector((state) => state.orderReducer);
  const { load, user } = useSelector((state) => state.profileReducer);
  const { usersUpdate } = useSelector((state) => state.usersReducer);
  const { rules } = user;
  const path = useNavigate()
  // tekshiruv
  // useEffect(() => {
  //   const UserRule = async () => {
  //     let res = await axios.get("/user/");
  //     let data = [...res.data];
  //     if (res.status === 200 && data.length > 0) {  
  //       let ress =
  //         data.filter(
  //           (item) =>
  //           (  item.username === user.username &&
  //             item.password ===user.password
  //            ) 
  //         ) || [];
        
  //       if (ress.length === 0) {
  //         dispatch(userLogout());
  //         path('/')
  //       }
  //     }
  //   };

  //   if (rules) {
  //     UserRule();
  //   }
  // }, []);
  // cars
  useEffect(() => {
    const cars = async () => {
      let res = await axios.get("/cars/");
   
      if (res.status === 200) {  
       dispatch(carsAdd(res.data))
      }
    };

    if (rules) {
      cars();
    }
  }, [carsUpdate]);
  return (
    <div className={load ? "load activ" : "load"}>
      <img src="/img/load.svg" alt="" />
    </div>
  );
};
