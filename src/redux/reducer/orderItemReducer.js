import { orderItemUpdate } from "../action/orderItemAction";
import { actionType } from "../actionType/actionTypes";

const initialValues = {
    orderItem: [],
    menu: false,
    orderItemUpdate: false,
 
};

export const orderItemReducer = (state = initialValues, { type, payload }) => {
    switch (type) {
        case actionType.orderItemAdd:
            return {
                ...state,
                orderItem: payload.reverse(),
            };
        case actionType.orderItemUpdate:
            return {
                ...state,
                orderItemUpdate: !state.orderItemUpdate,
            };
        default:
            return state;
    }
};
