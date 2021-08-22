import Auth from "../../../helper/Auth";
import { localAuth } from "../../../helper/authenticate";

export const ALL_CHURCH_START = "ALL_CHURCH_START";
export const ALL_CHURCH_SUCCESS = "ALL_CHURCH_SUCCESS";
export const ALL_CHURCH_FAILED = "ALL_CHURCH_FAILED";

export const CREATE_CHURCH_START = "CREATE_CHURCH_START";
export const CREATE_CHURCH_SUCCESS = "CREATE_CHURCH_SUCCESS";
export const CREATE_CHURCH_FAILED = "CREATE_CHURCH_FAILED";

export const CHURCH_LOGIN_START = "CHURCH_LOGIN_START";
export const CHURCH_LOGIN_SUCCESS = "CHURCH_LOGIN_SUCCESS";
export const CHURCH_LOGIN_FAILED = "CHURCH_LOGIN_FAILED";


const BASE_URL = process.env.REACT_APP_URL;

const token = localAuth() && localAuth().token;

export const allChurchStart = () => {
  return {
    type: ALL_CHURCH_START
  }
}

export const allChurchSuccess = (data) => {
  return {
    type: ALL_CHURCH_SUCCESS,
    data
  }
}

export const allChurchFailed = (error) => {
  return {
    type: ALL_CHURCH_FAILED,
    error
  }
}

export const churchList = (data) => {
  return dispatch => {
    dispatch(allChurchStart());
    fetch(`${BASE_URL}/church/all?offset=${data?.offset}&limit=${data?.limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(allChurchFailed(resp.message));
        return dispatch(allChurchSuccess(resp.results));
      })
      .catch(err => dispatch(allChurchFailed(err.message)));
  }
}

export const createChurchStart = () => {
  return {
    type: CREATE_CHURCH_START
  }
}

export const createChurchSuccess = (data) => {
  return {
    type: CREATE_CHURCH_SUCCESS,
    data
  }
}

export const createChurchFailed = (error) => {
  return {
    type: CREATE_CHURCH_FAILED,
    error
  }
}

export const post_church = (data) => {
  return dispatch => {
    dispatch(createChurchStart());
    fetch(`${BASE_URL}/church/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(createChurchFailed(resp.message));
        return dispatch(createChurchSuccess(resp.results));
      })
      .then(() => dispatch(churchList()))
      .catch(err => dispatch(createChurchFailed(err.message)));
  }
}

export const churchLoginStart = () => {
  return {
    type: CHURCH_LOGIN_START
  }
}

export const churchLoginSuccess = (data) => {
  return {
    type: CHURCH_LOGIN_SUCCESS,
    data
  }
}

export const churchLoginFailed = (error) => {
  return {
    type: CHURCH_LOGIN_FAILED,
    error
  }
}

export const churchLogin = (data) => {
  return dispatch => {
    dispatch(churchLoginStart());
    fetch(`${BASE_URL}/church/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(churchLoginFailed(resp.message));
        Auth.authenticateUser(JSON.stringify(resp.results));
        dispatch(churchLoginSuccess(resp.results));
      })
      .catch(err => dispatch(churchLoginFailed("Network error")));
  }
}