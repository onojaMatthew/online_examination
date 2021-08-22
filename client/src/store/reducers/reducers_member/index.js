import {
  MEMBER_LIST_START,
  MEMBER_LIST_SUCCESS,
  MEMBER_LIST_FAILED,
  POST_MEMBER_START,
  POST_MEMBER_SUCCESS,
  POST_MEMBER_FAILED,
  SEARCH_START,
  SEARCH_SUCCESS,
  SEARCH_FAILED,
  UPDATE_MEMBER_START,
  UPDATE_MEMBER_SUCCESS,
  UPDATE_MEMBER_FAILED,
  DELETE_MEMBER_START,
  DELETE_MEMBER_SUCCESS,
  DELETE_MEMBER_FAILED,
} from "../../actions/actions_member";

const initialState = {
  members: [],
  member: {},
  listLoading: false,
  listSuccess: false,
  postLoading: false,
  postSuccess: false,
  detailLoading: false,
  detailSuccess: false,
  searchLoading: false,
  searchSuccess: false,
  updateLoading: false,
  updateSuccess: false,
  deleteLoading: false,
  deleteSuccess: false,
  error: ""
}

export const member = (state=initialState, action) => {
  switch(action.type) {
    case MEMBER_LIST_START:
      return {
        ...state,
        listLoading: true,
        listSuccess: false,
      }
    case MEMBER_LIST_SUCCESS:
      return {
        ...state,
        listLoading: false,
        listSuccess: true,
        members: action.data,
      }
    case MEMBER_LIST_FAILED:
      return {
        ...state,
        listLoading: false,
        listSuccess: false,
        error: action.error
      }
    case POST_MEMBER_START:
      return {
        ...state,
        postLoading: true,
        postSuccess: false,
      }
    case POST_MEMBER_SUCCESS:
      return {
        ...state,
        postLoading: false,
        postSuccess: true,
        members: state.members.concat(action.data),
      }
    case POST_MEMBER_FAILED:
      return {
        ...state,
        postLoading: false,
        postSuccess: false,
        error: action.error
      }
    case SEARCH_START:
      return {
        ...state,
        searchLoading: true,
        searchSuccess: false,
      }
    case SEARCH_SUCCESS:
      return {
        ...state,
        searchLoading: false,
        searchSuccess: true,
        members: action.data,
      }
    case SEARCH_FAILED:
      return {
        ...state,
        searchLoading: false,
        searchSuccess: false,
        error: action.error
      }
    case UPDATE_MEMBER_START:
      return {
        ...state,
        updateLoading: true,
        updateSuccess: false,
      }
    case UPDATE_MEMBER_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: true,
        member: action.data,
      }
    case UPDATE_MEMBER_FAILED:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: false,
        error: action.error
      }
    case DELETE_MEMBER_START:
      return {
        ...state,
        deleteLoading: true,
        deleteSuccess: false,
      }
    case DELETE_MEMBER_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: true,
        members: state.members.filter(m => m._id !== action.data._id),
      }
    case DELETE_MEMBER_FAILED:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: false,
        error: action.error
      }
    default:
      return state;
  }
}