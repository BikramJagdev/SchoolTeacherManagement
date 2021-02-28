import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_LOGOUT,
} from "./actionTypes";
import axios from "axios";
import { toast } from "react-toastify";

const loginRequest = (payload) => {
  return {
    type: LOGIN_REQUEST,
    payload,
  };
};

const loginSuccess = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
};

const loginFailure = (payload) => {
  return {
    type: LOGIN_FAILURE,
    payload,
  };
};

const loginLogout = () => {
  return {
    type: LOGIN_LOGOUT,
  };
};

const userLogin = (payload) => (dispatch) => {
  dispatch(loginRequest(payload));
  return axios
    .post("http://localhost:5000/admin/login", payload)
    .then((res) => {
      dispatch(loginSuccess(res.data));
    })
    .catch((err) => {
      dispatch(loginFailure(err?.response?.data?.message));
      toast.error(err?.response?.data?.message || "unknown error while login");
    });
};

export {
  loginRequest,
  loginSuccess,
  loginFailure,
  loginLogout,
  userLogin,
  LOGIN_LOGOUT,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
};
