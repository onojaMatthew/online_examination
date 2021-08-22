import { localAuth } from "../../../helper/authenticate";

export const CATEGORY_START = "CATEGORY_START";
export const CATEGORY_SUCCESS = "CATEGORY_SUCCESS";
export const CATEGORY_FAILED = "CATEGORY_FAILED";

export const CATEGORY_LIST_START = "CATEGORY_LIST_START";
export const CATEGORY_LIST_SUCCESS = "CATEGORY_LIST_SUCCESS";
export const CATEGORY_LIST_FAILED = "CATEGORY_LIST_FAILED";

const token = localAuth() && localAuth().token;
const id = localAuth() && localAuth().church && localAuth().church._id;

const BASE_URL = process.env.REACT_APP_URL;

export const categoryStart = () => {
  return {
    type: CATEGORY_START
  }
}

export const categorySuccess = (data) => {
  return {
    type: CATEGORY_SUCCESS,
    data
  }
}

export const categoryFailed = (error) => {
  return {
    type: CATEGORY_FAILED,
    error
  }
}


export const categoryDetail = (mem_id) => {
  return dispatch => {
    dispatch(categoryStart());
    fetch(`${BASE_URL}/mem_category/detail/${mem_id}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(categoryFailed(resp.message));
        return dispatch(categorySuccess(resp.results));
      })
      .catch(err => dispatch(categoryFailed(err.message)));
  }
}


export const categoryListStart = () => {
  return {
    type: CATEGORY_LIST_START
  }
}

export const categoryListSuccess = (data) => {
  return {
    type: CATEGORY_LIST_SUCCESS,
    data
  }
}

export const categoryListFailed = (error) => {
  return {
    type: CATEGORY_LIST_FAILED,
    error
  }
}


export const categoryList = () => {
  return dispatch => {
    dispatch(categoryListStart());
    fetch(`${BASE_URL}/mem_category/all/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(categoryListFailed(resp.message));
        return dispatch(categoryListSuccess(resp.results));
      })
      .catch(err => dispatch(categoryListFailed(err.message)));
  }
}