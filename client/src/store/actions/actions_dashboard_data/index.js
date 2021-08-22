import { localAuth } from "../../../helper/authenticate";

export const GET_DATA_START = "GET_DATA_START";
export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
export const GET_DATA_FAILED = "GET_DATA_FAILED";

const BASE_URL = process.env.REACT_APP_URL;

const token = localAuth() && localAuth().token;
const id = localAuth() && localAuth().church && localAuth().church._id;

export const dashboardDataStart = () => {
  return {
    type: GET_DATA_START
  }
}

export const dashboardDataSuccess = (data) => {
  return {
    type: GET_DATA_SUCCESS,
    data
  }
}

export const dashboardDataFaild = (error) => {
  return {
    type: GET_DATA_FAILED,
    error
  }
}

export const dashboardData = () => {
  return dispatch => {
    dispatch(dashboardDataStart());
    fetch(`${BASE_URL}/church/dashbord_data?church=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(dashboardDataFaild(resp.message));
        return dispatch(dashboardDataSuccess(resp.results));
      })
      .catch(err => dispatch(dashboardDataFaild(err.message)));
  }
}