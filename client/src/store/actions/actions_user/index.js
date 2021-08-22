
export const USER_DETAIL_START = "USER_DETAIL_START";
export const USER_DETAIL_SUCCESS = "USER_DETAIL_SUCCESS";
export const USER_DETAIL_FAILED = "USER_DETAIL_FAILED";


const BASE_URL = process.env.REACT_APP_URL;


export const userDetailStart = () => {
  return {
    type: USER_DETAIL_START
  }
}

export const userDetailSuccess = (data) => {
  return {
    type: USER_DETAIL_SUCCESS,
    data
  }
}

export const userDetailFailed = (error) => {
  return {
    type: USER_DETAIL_FAILED,
    error
  }
}

export const userDetail = (data) => {
  return dispatch => {
    dispatch(userDetailStart());
    fetch(`${BASE_URL}/user/detail/?domain_name=${data}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      },
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(userDetailFailed(resp.message));
        
        dispatch(userDetailSuccess(resp.results));
      })
      .catch(err => dispatch(userDetailFailed("Network error")));
  }
}