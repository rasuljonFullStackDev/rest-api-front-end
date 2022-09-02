import { actionType } from "../actionType/actionTypes";

const initialValues = {
  user: JSON.parse(localStorage.getItem("profile")) || {rules:false},
  load: false,
  profile:[],
  date:{
    date1:new Date(),
    date2:new Date()
  }
};

export const profileReducer = (state = initialValues, { type, payload }) => {
  switch (type) {
    case actionType.user:
      localStorage.setItem("profile", JSON.stringify(payload));
      return {
        ...state,
        user: JSON.parse(localStorage.getItem("profile")) || {},
      };
    case actionType.logout:
      localStorage.removeItem("profile");
      return {
        ...state,
        user: JSON.parse(localStorage.getItem("profile")) || {},
      };
    case actionType.load:
      return {
        ...state,
        load: payload,
      };
      case actionType.profileAdd:
        return {
          ...state,
          profile: payload.reverse(),
        };
      case actionType.profileEdit:
        return {
          ...state,
          profile: state.profile.map((val) => (val.id === payload.id ? payload : val)),
        };
  
      case actionType.profileDelete:
        return {
          ...state,
          profile: state.profile.filter((val) => val.id !== payload),
        };
      case actionType.profileUpdate:
        return {
          ...state,
          profileUpdate: !state.profileUpdate,
        };
      default:
      return state;
  }
};
