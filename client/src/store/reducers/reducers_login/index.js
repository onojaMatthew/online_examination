import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_START,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from "../../actions/actions_login";

const initialState = {
  account: {},
  loginLoading: false,
  loginSuccess: false,
  logoutLoading: false,
  logoutSuccess: false,
  error: ""
}

export const account = (state=initialState, action) => {
  switch(action.type) {
    case LOGIN_START:
      return {
        ...state,
        loginLoading: true,
        loginSuccess: false,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        loginSuccess: true,
        account: action.data,
      }
    case LOGIN_FAILED:
      return {
        ...state,
        loginLoading: false,
        loginSuccess: false,
        error: action.error
      }
    case LOGOUT_START:
      return {
        ...state,
        logoutLoading: true,
        logoutSuccess: false,
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        logoutLoading: false,
        logoutSuccess: true,
        account: action.data,
      }
    case LOGOUT_FAILED:
      return {
        ...state,
        logoutLoading: false,
        logoutSuccess: false,
        error: action.error
      }
    default:
      return state;
  }
}