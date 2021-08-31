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
  USER_LIST_START,
  USER_LIST_SUCCESS,
  USER_LIST_FAILED,
  DELETE_START,
  DELETE_SUCCESS,
  DELETE_FAILED,
  ASSIGN_START,
  ASSIGN_SUCCESS,
  ASSIGN_FAILED,
  CREATE_USER_START,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILED,
  GET_SHUFFLED_QUESTIONS_START,
  GET_SHUFFLED_QUESTIONS_SUCCESS,
  GET_SHUFFLED_QUESTIONS_FAILED,
  GET_USER_SOLUTION_START,
  GET_USER_SOLUTION_SUCCESS,
  GET_USER_SOLUTION_FAILED,
  CREATE_RANDOM_START,
  CREATE_RANDOM_SUCCESS,
  CREATE_RANDOM_FAILED,
} from "../../actions/actions_user";

const initialState = {
  users: [],
  user: {},
  questions: [],
  random: {},
  solution: {},
  loading: false,
  success: false,
  questionLoading: false,
  questionSuccess: false,
  solutionLoading: false,
  solutionSuccess: false,
  list_loading: false,
  list_success: false,
  delete_loading: false,
  delete_success: false,
  assign_loading: false,
  assign_success: false,
  create_loading: false,
  create_success: false,
  shuffled_loading: false,
  shuffled_success: false,
  random_loading: false,
  random_success: false,
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
    case USER_LIST_START:
      return {
        ...state,
        list_loading: true,
        list_success: false,
      }
    case USER_LIST_SUCCESS:
      return {
        ...state,
        list_loading: false,
        list_success: true,
        users: action.data,
      }
    case USER_LIST_FAILED:
      return {
        ...state,
        list_loading: false,
        list_success: false,
        error: action.error
      }
    case  DELETE_START:
      return {
        ...state,
        delete_loading: true,
        delete_success: false,
      }
    case  DELETE_SUCCESS:
      return {
        ...state,
        delete_loading: false,
        delete_success: true,
        user: action.data,
      }
    case  DELETE_FAILED:
      return {
        ...state,
        delete_loading: false,
        delete_success: false,
        error: action.error
      }
    case ASSIGN_START:
      return {
        ...state,
        assign_loading: true,
        assign_success: false,
      }
    case ASSIGN_SUCCESS:
      return {
        ...state,
        assign_loading: false,
        assign_success: true,
        question: action.data,
      }
    case ASSIGN_FAILED:
      return {
        ...state,
        assign_loading: false,
        assign_success: false,
        error: action.error
      }
    case CREATE_USER_START:
      return {
        ...state,
        create_loading: true,
        create_success: false,
      }
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        create_loading: false,
        create_success: true,
        users: action.data,
      }
    case CREATE_USER_FAILED:
      return {
        ...state,
        create_loading: false,
        create_success: false,
        error: action.error
      }
    case GET_SHUFFLED_QUESTIONS_START:
      return {
        ...state,
        shuffled_loading: true,
        shuffled_success: false,
      }
    case GET_SHUFFLED_QUESTIONS_SUCCESS:
      return {
        ...state,
        shuffled_loading: false,
        shuffled_success: true,
        questions: action.data,
      }
    case GET_SHUFFLED_QUESTIONS_FAILED:
      return {
        ...state,
        shuffled_loading: false,
        shuffled_success: false,
        error: action.error
      }
    case GET_USER_SOLUTION_START:
      return {
        ...state,
        loading: true,
        success: false,
      }
    case GET_USER_SOLUTION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        questions: action.data,
      }
    case GET_USER_SOLUTION_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error,
      }
    case CREATE_RANDOM_START:
      return {
        ...state,
        random_loading: true,
        random_success: false,
      }
    case CREATE_RANDOM_SUCCESS:
      return {
        ...state,
        random_loading: false,
        random_success: true,
        random: action.data,
      }
    case CREATE_RANDOM_FAILED:
      return {
        ...state,
        random_loading: false,
        random_success: false,
        error: action.error
      }
    default:
      return state;
  }
}