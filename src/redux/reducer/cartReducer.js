import { cartUpdate } from "../action/cartAction";
import { actionType } from "../actionType/actionTypes";

const initialValues = {
  cart: [],
  menu:false,
  cartUpdate:false
};

export const cartReducer = (state = initialValues, { type, payload }) => {
  switch (type) {
    case actionType.cartAdd:
      return {
        ...state,
        cart:payload.reverse(),
      };
    case actionType.cartEdit:
      return {
        ...state,
        cart: state.cart.map((val) => (val.id === payload.id ? payload : val)),
      };

    case actionType.cartDelete:
      return {
        ...state,
        cart: state.cart.filter((val) => val.id !== payload),
      };
      case actionType.menu:
        return {
          ...state,
          menu: !state.menu,
        };
        case actionType.cartUpdate:
        return {
          ...state,
          cartUpdate: !state.cartUpdate,
        };
    default:
      return state;
  }
};
