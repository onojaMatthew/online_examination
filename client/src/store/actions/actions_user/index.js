import Auth from "../../../helper/Auth";
// import { localAuth } from "../../../helper/authenticate";

export const USER_DETAIL_START = "USER_DETAIL_START";
export const USER_DETAIL_SUCCESS = "USER_DETAIL_SUCCESS";
export const USER_DETAIL_FAILED = "USER_DETAIL_FAILED";
export const GET_QUESTIONS_START = "GET_QUESTIONS_START";
export const GET_QUESTIONS_SUCCESS = "GET_QUESTIONS_SUCCESS";
export const GET_QUESTIONS_FAILED = "GET_QUESTIONS_FAILED";
export const SOLUTION_START = "SOLUTION_START";
export const SOLUTION_SUCCESS = "SOLUTION_SUCCESS";
export const SOLUTION_FAILED = "SOLUTION_FAILED";
export const USER_LIST_START = "USER_LIST_START";
export const USER_LIST_SUCCESS = "USER_LIST_SUCCESS";
export const USER_LIST_FAILED = "USER_LIST_FAILED";
export const DELETE_START = "DELETE_START";
export const DELETE_SUCCESS = "DELETE_SUCCESS";
export const DELETE_FAILED = "DELETE_FAILED";
export const ASSIGN_START = "ASSIGN_START";
export const ASSIGN_SUCCESS = "ASSIGN_SUCCESS";
export const ASSIGN_FAILED = "ASSIGN_FAILED";
export const CREATE_USER_START = "CREATE_USER_START";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILED = "CREATE_USER_FAILED";
export const GET_SHUFFLED_QUESTIONS_START = "GET_SHUFFLED_QUESTIONS_START";
export const GET_SHUFFLED_QUESTIONS_SUCCESS = "GET_SHUFFLED_QUESTIONS_SUCCESS";
export const GET_SHUFFLED_QUESTIONS_FAILED = "GET_SHUFFLED_QUESTIONS_FAILED";
export const GET_USER_SOLUTION_START = "GET_USER_SOLUTION_START";
export const GET_USER_SOLUTION_SUCCESS = "GET_USER_SOLUTION_SUCCESS";
export const GET_USER_SOLUTION_FAILED = "GET_USER_SOLUTION_FAILED";
export const CREATE_RANDOM_START = "CREATE_RANDOM_START";
export const CREATE_RANDOM_SUCCESS = "CREATE_RANDOM_SUCCESS";
export const CREATE_RANDOM_FAILED = "CREATE_RANDOM_FAILED";

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
    fetch(`${BASE_URL}/user/assigned_questions?id=${id}`, {
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

export const solutionStart = () => {
  return {
    type: SOLUTION_START
  }
}

export const solutionSuccess = (data) => {
  return {
    type: SOLUTION_SUCCESS,
    data
  }
}

export const solutionFailed = (error) => {
  return {
    type: SOLUTION_FAILED,
    error
  }
}

export const submitSolution = (data) => {
  return dispatch => {
    dispatch(solutionStart());
    fetch(`${BASE_URL}/user/solution`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(solutionFailed(resp.message));
        dispatch(solutionSuccess(resp.results));
      })
      .catch(err => dispatch(solutionFailed(err.message)));
  }
}

export const userListStart = () => {
  return {
    type: USER_LIST_START
  }
}

export const userListSuccess = (data) => {
  return {
    type: USER_LIST_SUCCESS,
    data
  }
}

export const userListFailed = (error) => {
  return {
    type: USER_LIST_FAILED,
    error
  }
}

export const getUserList = () => {
  return dispatch => {
    dispatch(userListStart());
    fetch(`${BASE_URL}/user/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      },
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(userListFailed(resp.message));
        dispatch(userListSuccess(resp.results));
      })
      .catch(err => dispatch(userListFailed(err.message)));
  }
}

export const deleteStart = () => {
  return {
    type: DELETE_START
  }
}

export const deleteSuccess = (data) => {
  return {
    type: DELETE_SUCCESS,
    data
  }
}

export const deleteFailed = (error) => {
  return {
    type: DELETE_FAILED,
    error
  }
}

export const deleteUser = (id) => {
  return dispatch => {
    dispatch(deleteStart());
    fetch(`${BASE_URL}/user/delete?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      },
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(deleteFailed(resp.message));
        dispatch(deleteSuccess(resp.results));
      })
      .then(() => dispatch(getUserList()))
      .catch(err => dispatch(deleteFailed(err.message)));
  }
}

export const assignStart = () => {
  return {
    type: ASSIGN_START
  }
}

export const assignSuccess = (data) => {
  return {
    type: ASSIGN_SUCCESS,
    data
  }
}

export const assignFailed = (error) => {
  return {
    type: ASSIGN_FAILED,
    error
  }
}

export const assignQuestions = (data) => { 
  console.log(data, " the data")
  return dispatch => {
    dispatch(assignStart());
    fetch(`${BASE_URL}/user/question`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(assignFailed(resp.message));
        dispatch(assignSuccess(resp.results));
      })
      .catch(err => dispatch(assignFailed(err.message)));
  }
}

export const createUserStart = () => {
  return {
    type: CREATE_USER_START
  }
}

export const createUserSuccess = (data) => {
  return {
    type: CREATE_USER_SUCCESS,
    data
  }
}

export const createUserFailed = (error) => {
  return {
    type: CREATE_USER_FAILED,
    error
  }
}

export const createUser = (data) => {
  return dispatch => {
    dispatch(createUserStart());
    fetch(`${BASE_URL}/user/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(createUserFailed(resp.message));
        dispatch(createUserSuccess(resp.results));
      })
      .then(() => dispatch(getUserList()))
      .catch(err => dispatch(createUserFailed(err.message)));
  }
}

// GET SHUFFLED QUESTION LIST
export const getShuffledQuestionsStart = () => {
  return {
    type: GET_SHUFFLED_QUESTIONS_START
  }
}

export const getShuffledQuestionsSuccess = (data) => {
  return {
    type: GET_SHUFFLED_QUESTIONS_SUCCESS,
    data
  }
}

export const getShuffledQuestionsFailed = (error) => {
  return {
    type: GET_SHUFFLED_QUESTIONS_FAILED,
    error
  }
}

export const getShuffledQuestions = (id) => {
  console.log(id, " the id in action")
  return dispatch => {
    dispatch(getShuffledQuestionsStart());
    fetch(`${BASE_URL}/user/random`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getShuffledQuestionsFailed(resp.message));
        dispatch(getShuffledQuestionsSuccess(resp.results));
      })
      .catch(err => dispatch(getShuffledQuestionsFailed(err.message)));
  }
}

export const getUserSolutionStart = () => {
  return {
    type: GET_USER_SOLUTION_START
  }
}

export const getUserSolutionSuccess = (data) => {
  return {
    type: GET_USER_SOLUTION_SUCCESS,
    data
  }
}

export const getUserSolutionFailed = (error) => {
  return {
    type: GET_USER_SOLUTION_FAILED,
    error
  }
}

export const getUserSolution = (id) => {
  return dispatch => {
    dispatch(getUserSolutionStart());
    fetch(`${BASE_URL}/user/user_solution?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getUserSolutionFailed(resp.message));
        dispatch(getUserSolutionSuccess(resp.results));
      })
      .catch(err => dispatch(getUserSolutionFailed(err.message)));
  }
}

export const createRandomStart = () => {
  return {
    type: CREATE_RANDOM_START
  }
}

export const createRandomSuccess = (data) => {
  return {
    type: CREATE_RANDOM_SUCCESS,
    data
  }
}

export const createRandomFailed = (error) => {
  return {
    type: CREATE_RANDOM_FAILED,
    error
  }
}

export const createRandomQuestions = (data) => {
  return dispatch => {
    dispatch(createRandomStart());
    fetch(`${BASE_URL}/user/question/randomize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(createRandomFailed(resp.message));
        dispatch(createRandomSuccess(resp.results));
      })
      .catch(err => dispatch(createRandomFailed(err.message)));
  }
}