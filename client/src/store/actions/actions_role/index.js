import { localAuth } from "../../../helper/authenticate";

export const ROLE_LIST_START = "ROLE_LIST_START";
export const ROLE_LIST_SUCCESS = "ROLE_LIST_SUCCESS";
export const ROLE_LIST_FAILED = "ROLE_LIST_FAILED";


const BASE_URL = process.env.REACT_APP_URL;

const token = localAuth() && localAuth().token;

export const roleListStart = () => {
  return {
    type: ROLE_LIST_START
  }
}

export const roleListSuccess = (data) => {
  return {
    type: ROLE_LIST_SUCCESS,
    data
  }
}

export const roleListFailed = (error) => {
  return {
    type: ROLE_LIST_FAILED,
    error
  }
}

export const roleList = () => {
  return dispatch => {
    dispatch(roleListStart());
    fetch(`${BASE_URL}/role/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(roleListFailed(resp.message));
        return dispatch(roleListSuccess(resp.results));
      })
      .catch(err => dispatch(roleListFailed(err.message)));
  }
}