import {
  LOGIN,
  LOGOUT,
  FETCHDATA,
  SIGNIN,
  SIGNUP,
  REGISTER,
  NEWTOKEN,
} from "../authActions/authActions";
const initialState = {
  userId: " ",
  oldMeassages: [],
  users: [],
};
export const authReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case LOGIN:
      return { ...state, users: actions?.users, userId: actions?.userId };

    case SIGNIN:
      return { ...state, users: actions?.AllUsers, userId: actions?.id };

    case SIGNUP:
      return { ...state, userId: actions?.id, users: actions?.users };

    case FETCHDATA:
      return { ...state, oldMeassages: actions?.meassages };
    case NEWTOKEN:
      localStorage.setItem("token", actions.token);
      break;

    case LOGOUT:
      return { state };

    default:
      return state;
  }
};
