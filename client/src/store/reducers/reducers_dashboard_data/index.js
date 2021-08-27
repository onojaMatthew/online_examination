import {
  GET_DATA_START,
  GET_DATA_SUCCESS,
  GET_DATA_FAILED,
  QUESTION_LIST_START,
  QUESTION_LIST_SUCCESS,
  QUESTION_LIST_FAILED,
  DELETE_QUESTION_START,
  DELETE_QUESTION_SUCCESS,
  DELETE_QUESTION_FAILED,
  UPDATE_QUESTION_START,
  UPDATE_QUESTION_SUCCESS,
  UPDATE_QUESTION_FAILED,
  NEW_QUESTION_START,
  NEW_QUESTION_SUCCESS,
  NEW_QUESTION_FAILED,
} from "../../actions/actions_dashboard_data";

const initialState = {
  data: {},
  questions: [],
  question: {},
  create_loading: false,
  create_success: false,
  loading: false,
  success: false,
  list_loading: false,
  list_success: false,
  delete_loading: false,
  delete_success: false,
  update_loading: false,
  update_success: false,
  error: ""
}

export const dashboard_data = (state=initialState, action) => {
  
  switch (action.type) {
    case GET_DATA_START:
      return {
        ...state,
        loading: true,
        success: false,
      }
    case GET_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        data: action.data,
      }
    case GET_DATA_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case QUESTION_LIST_START:
      return {
        ...state,
        list_loading: true,
      }
    case QUESTION_LIST_SUCCESS:
      return {
        ...state,
        list_loading: false,
        list_success: true,
        questions: action.data,
      }
    case QUESTION_LIST_FAILED:
      return {
        ...state,
        list_loading: false,
        list_success: false,
        error: action.error
      }
    case DELETE_QUESTION_START:
      return {
        ...state,
        delete_loading: true,
        delete_success: false,
      }
    case DELETE_QUESTION_SUCCESS:
      return {
        ...state,
        delete_loading: false,
        delete_success: true,
        questions: state.questions.docs.filter((d) => d._id !== action.data._id),
      }
    case DELETE_QUESTION_FAILED:
      return {
        ...state,
        delete_loading: false,
        delete_success: false,
        error: action.error
      }
    case UPDATE_QUESTION_START:
      return {
        ...state,
        update_loading: true,
        update_success: false,
      }
    case UPDATE_QUESTION_SUCCESS:
      return {
        ...state,
        update_loading: true,
        update_success: false,
        question: action.data,
      }
    case UPDATE_QUESTION_FAILED:
      return {
        ...state,
        update_loading: true,
        update_success: false,
        error: action.error
      }
    case NEW_QUESTION_START:
      return {
        ...state,
        create_loading: true,
        create_success: false,
      }
    case NEW_QUESTION_SUCCESS:
      return {
        ...state,
        create_loading: false,
        create_success: true,
        questions: state.questions.concat(action.data),
      }
    case NEW_QUESTION_FAILED:
      return {
        ...state,
        create_loading: false,
        create_success: false,
        error: action.error
      }
    default:
      return state;
  }
}