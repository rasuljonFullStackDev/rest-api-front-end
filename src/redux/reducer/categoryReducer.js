import { categoryUpdate } from "../action/categoryAction";
import { actionType } from "../actionType/actionTypes";

const initialValues = {
  category: [],
  menu: false,
  categoryUpdate: false
};

export const categoryReducer = (state = initialValues, { type, payload }) => {
  switch (type) {
    case actionType.categoryAdd:
      return {
        ...state,
        category: payload.reverse(),
      };
    case actionType.categoryEdit:
      return {
        ...state,
        category: state.category.map((val) => (val.id === payload.id ? payload : val)),
      };

    case actionType.categoryDelete:
      return {
        ...state,
        category: state.category.filter((val) => val.id !== payload),
      };
    case actionType.categoryUpdate:
      return {
        ...state,
        categoryUpdate: !state.categoryUpdate,
      };
    case actionType.menu:
      return {
        ...state,
        menu: !state.menu,
      };
    default:
      return state;
  }
};
