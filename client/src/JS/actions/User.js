import axios from "axios";

import {
  FAIL_USER,
  LOAD_USER,
  LOGIN_USER,
  CURRENT_USER,
  REGISTER_USER,
  LOGOUT_USER,
  CLEAR_ERRORS,
  GET_USERS_FAIL,
  ADD_USERS,
  ALL_USERS,
} from "../constant/User";

export const RegisterUser = (newUser, history) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    let { data } = await axios.post("/api/user/register", newUser);
    dispatch({ type: REGISTER_USER, payload: data });
    history.push("/jobList");
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error });
  }
};
export const LoginUser = (user, history) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    let { data } = await axios.post("/api/user/login", user);
    dispatch({ type: LOGIN_USER, payload: data });
    if (data.user.role === "admin") {
      history.push("/admin");
    } else {
      history.push("/jobList");
    }
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data });
  }
};
export const current = () => async (dispatch) => {
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  dispatch({ type: LOAD_USER });
  try {
    let { data } = await axios.get("/api/user/current", config);
    dispatch({ type: CURRENT_USER, payload: data });
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data });
  }
};
export const getAlluser = () => async (dispatch) => {
  try {
    await axios.get("api/user/").then((res) => {
      console.log("data user ", res.data.User);
      dispatch({
        type: ADD_USERS,
        payload: res.data.User,
      });
    });
  } catch (error) {
    dispatch({ type: GET_USERS_FAIL });
  }
};
export const deleteUser = (id) => async (dispatch) => {
  dispatch({ type: ALL_USERS });
  try {
    await axios.delete(`api/user/${id}`);
    dispatch(getAlluser());
  } catch (error) {
    dispatch({ type: FAIL_USER });
  }
};
export const logout = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
