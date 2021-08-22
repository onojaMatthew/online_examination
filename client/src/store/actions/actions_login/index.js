import Auth from "../../../helper/Auth";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const LOGOUT_START = "LOGOUT_START";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

const BASE_URL = process.env.REACT_APP_URL;
export const loginStart = () => {
  return {
    type: LOGIN_START
  }
}

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    data
  }
}

export const loginFailed = (error) => {
  return {
    type: LOGIN_FAILED,
    error
  }
}

export const login = (data) => {
  return dispatch => {
    dispatch(loginStart());
    fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(loginFailed(resp.message));
        Auth.authenticateUser(JSON.stringify(resp.results))
        dispatch(loginSuccess(resp.results));
      })
      .catch(err => dispatch(loginFailed(err.message)));
  }
}

export const logoutStart = () => {
  return {
    type: LOGOUT_START
  }
}

export const logoutSuccess = (data) => {
  return {
    type: LOGOUT_SUCCESS,
    data
  }
}

export const logoutFailed = (error) => {
  return {
    type: LOGOUT_FAILED,
    error
  }
}

export const logout = () => {
  return dispatch => {
    dispatch(logoutStart());
    fetch(`${BASE_URL}/auth/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(logoutFailed(resp.message));
        Auth.deauthenticateUser();
        dispatch(logoutSuccess(resp.message));
      })
      .catch(err => dispatch(logoutFailed(err.message)));
  }
}