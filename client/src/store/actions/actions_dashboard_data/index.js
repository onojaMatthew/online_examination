import { localAuth } from "../../../helper/authenticate";

export const GET_DATA_START = "GET_DATA_START";
export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
export const GET_DATA_FAILED = "GET_DATA_FAILED";
export const QUESTION_LIST_START = "QUESTION_LIST_START";
export const QUESTION_LIST_SUCCESS = "QUESTION_LIST_SUCCESS";
export const QUESTION_LIST_FAILED = "QUESTION_LIST_FAILED";
export const DELETE_QUESTION_START = "DELETE_QUESTION_START";
export const DELETE_QUESTION_SUCCESS = "DELETE_QUESTION_SUCCESS";
export const DELETE_QUESTION_FAILED = "DELETE_QUESTION_FAILED";
export const UPDATE_QUESTION_START = "UPDATE_QUESTION_START";
export const UPDATE_QUESTION_SUCCESS = "UPDATE_QUESTION_SUCCESS";
export const UPDATE_QUESTION_FAILED = "UPDATE_QUESTION_FAILED";

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
    fetch(`${BASE_URL}/admin/dashboard`, {
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

export const questionListStart = () => {
  return {
    type: QUESTION_LIST_START
  }
}

export const questionListSuccess = (data) => {
  return {
    type: QUESTION_LIST_SUCCESS,
    data
  }
}

export const questionListFailed = (error) => {
  return {
    type: QUESTION_LIST_FAILED,
    error
  }
}

export const getQuestionList = () => {
  return dispatch => {
    dispatch(questionListStart());
    fetch(`${BASE_URL}/question/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(questionListFailed(resp.message));
        dispatch(questionListSuccess(resp.results));
      })
      .catch(err => dispatch(questionListFailed(err.message)));
  }
}

export const updateQuestionStart = () => {
  return {
    type: UPDATE_QUESTION_START
  }
}

export const updateQuestionSuccess = (data) => {
  return {
    type: UPDATE_QUESTION_SUCCESS,
    data
  }
}

export const updateQuestionFailed = (error) => {
  return {
    type: UPDATE_QUESTION_FAILED,
    error
  }
}

export const updateQuestion = (data) => {
  return dispatch => {
    dispatch(updateQuestionStart());
    fetch(`${BASE_URL}/question/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(updateQuestionFailed(resp.message));
        dispatch(updateQuestionSuccess(resp.results));
      })
      .catch(err => dispatch(updateQuestionFailed(err.message)));
  }
}


export const deleteQuestionStart = () => {
  return {
    type: DELETE_QUESTION_START
  }
}

export const deleteQuestionSuccess = (data) => {
  return {
    type: DELETE_QUESTION_SUCCESS,
    data
  }
}

export const deleteQuestionFailed = (error) => {
  return {
    type: DELETE_QUESTION_FAILED,
    error
  }
}

export const deleteQuestion = (data) => {
  return dispatch => {
    dispatch(deleteQuestionStart());
    fetch(`${BASE_URL}/question/delete?id=${data.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(deleteQuestionFailed(resp.message));
        dispatch(deleteQuestionSuccess(resp.results));
      })
      .catch(err => dispatch(deleteQuestionFailed(err.message)));
  }
}