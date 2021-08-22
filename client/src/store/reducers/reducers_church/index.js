import {
  ALL_CHURCH_START,
  ALL_CHURCH_SUCCESS,
  ALL_CHURCH_FAILED,
  CREATE_CHURCH_START,
  CREATE_CHURCH_SUCCESS,
  CREATE_CHURCH_FAILED,
  CHURCH_LOGIN_START,
  CHURCH_LOGIN_SUCCESS,
  CHURCH_LOGIN_FAILED,
} from "../../actions/actions_church";

const initialState = {
  churches: [],
  church: {},
  postLoading: false,
  postSuccess: false,
  allLoading: false,
  allSuccess: false,
  loginLoading: false,
  loginSuccess: false,
  error: ""
}

export const church = (state=initialState, action) => {
  switch (action.type) {
    case ALL_CHURCH_START:
      return {
        ...state,
        allLoading: true,
        allSuccess: false,
      }
    case ALL_CHURCH_SUCCESS:
      return {
        ...state,
        allLoading: false,
        allSuccess: true,
        churches: action.data,
      }
    case ALL_CHURCH_FAILED:
      return {
        ...state,
        allLoading: false,
        allSuccess: false,
        error: action.error
      }
    case CREATE_CHURCH_START:
      return {
        ...state,
        postLoading: true,
        postSuccess: false,
      }
    case CREATE_CHURCH_SUCCESS:
      return {
        ...state,
        postLoading: false,
        postSuccess: true,
        churches: action.data,
      }
    case CREATE_CHURCH_FAILED:
      return {
        ...state,
        postLoading: false,
        postSuccess: false,
        error: action.error
      }
    case CHURCH_LOGIN_START:
      return {
        ...state,
        loginLoading: true,
        loginSuccess: false,
      }
    case CHURCH_LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        loginSuccess: true,
        church: action.data,
      }
    case CHURCH_LOGIN_FAILED:
      return {
        ...state,
        loginLoading: false,
        loginSuccess: false,
        error: action.error
      }
    default:
      return state;
  }
}