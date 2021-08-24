import Auth from "../../../helper/Auth";
// import { localAuth } from "../../../helper/authenticate";

export const USER_DETAIL_START = "USER_DETAIL_START";
export const USER_DETAIL_SUCCESS = "USER_DETAIL_SUCCESS";
export const USER_DETAIL_FAILED = "USER_DETAIL_FAILED";
export const GET_QUESTIONS_START = "GET_QUESTIONS_START";
export const GET_QUESTIONS_SUCCESS = "GET_QUESTIONS_SUCCESS";
export const GET_QUESTIONS_FAILED = "GET_QUESTIONS_FAILED";

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
        
        Auth.authenticateUser(JSON.stringify(resp.results));
        
        dispatch(userDetailSuccess(resp.results));
      })
      .catch(err => dispatch(userDetailFailed("Network error")));
  }
}

export const getQuestionsStart = () => {
  return {
    type: GET_QUESTIONS_START
  }
}

export const getQuestionsSuccess = (data) => {
  return {
    type: GET_QUESTIONS_SUCCESS,
    data
  }
}

export const getQuestionsFailed = (error) => {
  return {
    type: GET_QUESTIONS_FAILED,
    error
  }
}

export const getQuestions = (id) => {
  console.log(id, " the id in action")
  return dispatch => {
    dispatch(getQuestionsStart());
    fetch(`${BASE_URL}/user/user_question?userId=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      }
    })
      .then(response => response.json())
      .then(resp => {
        
        if (resp.error) return dispatch(getQuestionsFailed(resp.message));
        dispatch(getQuestionsSuccess(resp.results));
      })
      .catch(err => dispatch(getQuestionsFailed(err.message)));
  }
}