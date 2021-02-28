import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_LOGOUT,
} from "./action";
import { saveData, loadData, removeData } from "./localStore";

const initStore = {
  authToken: null,
  _id: "",
  email: "",
  name: "",
  isAuth: false,
};

const userReducer = (
  state = loadData("userData") || initStore,
  { type, payload }
) => {
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
      };
    case LOGIN_SUCCESS:
      let userData = {
        authToken: "Bearer " + payload.authToken,
        isAuth: true,
        _id: payload.user._id,
        email: payload.user.email,
        name: payload.user.name,
      };
      saveData("userData", userData);
      return {
        ...state,
        ...userData,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
      };
    case LOGIN_LOGOUT:
      removeData("userData");
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default userReducer;
