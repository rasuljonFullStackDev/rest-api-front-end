import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import { categoryReducer } from "./categoryReducer";
import { profileReducer } from "./profileReducer";
import { cartReducer } from "./cartReducer";
import { orderReducer } from "./orderReducer";
import { usersReducer } from "./usersReducer";
import { orderItemReducer } from "./orderItemReducer";
export const rootReucers = combineReducers({
  categoryReducer,
    profileReducer,
    productReducer,
    cartReducer,
    orderReducer,
    usersReducer,
    orderItemReducer
  });
  