import { orderUpdate } from "../action/orderAction";
import { actionType } from "../actionType/actionTypes";

const initialValues = {
  order: [],
  menu: false,
  orderUpdate: false,
  date: {
    date1: new Date(),
    date2: new Date(),
  },
};

export const orderReducer = (state = initialValues, { type, payload }) => {
  switch (type) {
    case actionType.orderAdd:
      return {
        ...state,
        order: payload.reverse(),
      };
    case actionType.orderEdit:
      return {
        ...state,
        order: state.order.map((val) =>
          val.id === payload.id ? payload : val
        ),
      };

    case actionType.orderDelete:
      return {
        ...state,
        order: state.order.filter((val) => val.id !== payload),
      };
    case actionType.menu:
      return {
        ...state,
        menu: !state.menu,
      };
    case actionType.orderUpdate:
      return {
        ...state,
        orderUpdate: !state.orderUpdate,
      };
      case actionType.date:
        return {
          ...state,
          date: payload,
        };
    default:
      return state;
  }
};
