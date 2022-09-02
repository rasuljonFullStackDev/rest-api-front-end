import { carsUpdate } from "../action/carsAction";
import { actionType } from "../actionType/actionTypes";

const initialValues = {
  cars: [],
  menu: false,
  carsUpdate: false
};

export const carsReducer = (state = initialValues, { type, payload }) => {
  switch (type) {
    case actionType.carsAdd:
      return {
        ...state,
        cars: payload,
      };
    case actionType.carsEdit:
      return {
        ...state,
        cars: state.cars.map((val) => (val.id === payload.id ? payload : val)),
      };

    case actionType.carsDelete:
      return {
        ...state,
        cars: state.cars.filter((val) => val.id !== payload),
      };
    case actionType.carsUpdate:
      return {
        ...state,
        carsUpdate: !state.carsUpdate,
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
