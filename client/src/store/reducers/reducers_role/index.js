import {
  ROLE_LIST_START,
  ROLE_LIST_SUCCESS,
  ROLE_LIST_FAILED,
} from "../../actions/actions_role";

const initialState = {
  roles: [],
  role: {},
  listLoading: false,
  listSuccess: false,
  error: ""
}

export const role = (state=initialState, action) => {
  switch(action.type) {
    case ROLE_LIST_START:
      return {
        ...state,
        listLoading: true,
        listSuccess: false,
      }
    case ROLE_LIST_SUCCESS:
      return {
        ...state,
        listLoading: false,
        listSuccess: true,
        roles: action.data,
      }
    case ROLE_LIST_FAILED:
      return {
        ...state,
        listLoading: false,
        listSuccess: false,
        error: action.error
      }
    default:
      return state;
  }
}