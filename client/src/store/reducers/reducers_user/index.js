import {
  USER_DETAIL_START,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_FAILED,
} from "../../actions/actions_user";

const initialState = {
  users: [],
  user: {},
  loading: false,
  success: false,
  
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
    default:
      return state;
  }
}