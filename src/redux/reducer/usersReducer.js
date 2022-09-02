import { usersUpdate } from "../action/usersAction";
import { actionType } from "../actionType/actionTypes";

const initialValues = {
  users: [],
  menu:false,
  usersUpdate:false
};

export const usersReducer = (state = initialValues, { type, payload }) => {
  switch (type) {
    case actionType.usersAdd:
      return {
        ...state,
        users:payload.reverse(),
      };
    case actionType.usersEdit:
      return {
        ...state,
        users: state.users.map((val) => (val.id === payload.id ? payload : val)),
      };

    case actionType.usersDelete:
      return {
        ...state,
        users: state.users.filter((val) => val.id !== payload),
      };
      case actionType.menu:
        return {
          ...state,
          menu: !state.menu,
        };
        case actionType.usersUpdate:
        return {
          ...state,
          usersUpdate: !state.usersUpdate,
        };
    default:
      return state;
  }
};
