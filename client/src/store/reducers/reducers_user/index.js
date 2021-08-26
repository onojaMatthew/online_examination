import {
  USER_DETAIL_START,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_FAILED,
  GET_QUESTIONS_START,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_FAILED,
  SOLUTION_START,
  SOLUTION_SUCCESS,
  SOLUTION_FAILED,
} from "../../actions/actions_user";

const initialState = {
  users: [],
  user: {},
  questions: {},
  solution: {},
  loading: false,
  success: false,
  questionLoading: false,
  questionSuccess: false,
  solutionLoading: false,
  solutionSuccess: false,
  error: ""
}

export const user = (state=initialState, action) => {
  switch (action.type) {
    case USER_DETAIL_START:
      return {
        ...state,
        loading: true,
        success: false,
      }
    case USER_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        user: action.data,
      }
    case USER_DETAIL_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case GET_QUESTIONS_START:
      return {
        ...state,
        questionLoading: true,
        questionSuccess: false,
      }
    case GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        questionLoading: false,
        questionSuccess: true,
        questions: action.data,
      }
    case GET_QUESTIONS_FAILED:
      return {
        ...state,
        questionLoading: false,
        questionSuccess: false,
        error: action.error
      }
    case SOLUTION_START:
      return {
        solutionLoading: true,
        solutionSuccess: false,
      }
    case SOLUTION_SUCCESS:
      return {
        solutionLoading: false,
        solutionSuccess: true,
        solution: action.data,
      }
    case SOLUTION_FAILED:
      return {
        solutionLoading: false,
        solutionSuccess: false,
        error: action.error
      }
    default:
      return state;
  }
}