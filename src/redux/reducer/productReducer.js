import { productUpdate } from "../action/productAction";
import { actionType } from "../actionType/actionTypes";

const initialValues = {
  product: [],
  menu:false,
  productUpdate:false
};

export const productReducer = (state = initialValues, { type, payload }) => {
  switch (type) {
    case actionType.productAdd:
      return {
        ...state,
        product:payload,
      };
    case actionType.productEdit:
      return {
        ...state,
        product: state.product.map((val) => (val.id === payload.id ? payload : val)),
      };

    case actionType.productDelete:
      return {
        ...state,
        product: state.product.filter((val) => val.id !== payload),
      };
      case actionType.menu:
        return {
          ...state,
          menu: !state.menu,
        };
        case actionType.productUpdate:
        return {
          ...state,
          productUpdate: !state.productUpdate,
        };
    default:
      return state;
  }
};
