import {
  CREATE_GROUP_START,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_FAILED,
  GROUP_LIST_START,
  GROUP_LIST_SUCCESS,
  GROUP_LIST_FAILED,
  GROUP_DETAIL_START,
  GROUP_DETAIL_SUCCESS,
  GROUP_DETAIL_FAILED,
  GROUP_UPDATE_START,
  GROUP_UPDATE_SUCCESS,
  GROUP_UPDATE_FAILED,
  GROUP_DELETE_START,
  GROUP_DELETE_SUCCESS,
  GROUP_DELETE_FAILED,
} from "../../actions/actions_group";

const initialState = {
  groups: [],
  group: {},
  create_group_loading: false,
  create_group_success: false,
  group_list_loading: false,
  group_list_success: false,
  group_update_loading: false,
  group_update_success: false,
  group_detail_loading: false,
  group_detail_success: false,
  group_delete_loading: false,
  group_delete_success: false,
  error: ""
}


export const group = (state=initialState, action) => {
  switch(action.type) {
    case CREATE_GROUP_START:
      return {
        ...state,
        create_group_loading: true,
        create_group_success: false,
      }
    case CREATE_GROUP_SUCCESS:
      return {
        ...state,
        create_group_loading: false,
        create_group_success: true,
        groups: state.groups.concat(action.data),
      }
    case CREATE_GROUP_FAILED:
      return {
        ...state,
        create_group_loading: false,
        create_group_success: false,
        error: action.error
      }
    case GROUP_LIST_START:
      return {
        ...state,
        group_list_loading: true,
        group_list_success: false,
      }
    case GROUP_LIST_SUCCESS:
      return {
        ...state,
        group_list_loading: false,
        group_list_success: true,
        groups: action.data,
      }
    case GROUP_LIST_FAILED:
      return {
        ...state,
        group_list_loading: false,
        group_list_success: false,
        error: action.error
      }
    case GROUP_DETAIL_START:
      return {
        ...state,
        group_detail_loading: true,
        group_detail_success: false,
      }
    case GROUP_DETAIL_SUCCESS:
      return {
        ...state,
        group_detail_loading: false,
        group_detail_success: true,
        group: action.data,
      }
    case GROUP_DETAIL_FAILED:
      return {
        ...state,
        group_detail_loading: false,
        group_detail_success: false,
        error: action.error
      }
    case GROUP_UPDATE_START:
      return {
        ...state,
        group_update_loading: true,
        group_update_success: false
      }
    case GROUP_UPDATE_SUCCESS:
      return {
        ...state,
        group_update_loading: false,
        group_update_success: true,
        group: action.data,
      }
    case GROUP_UPDATE_FAILED:
      return {
        ...state,
        group_update_loading: false,
        group_update_success: false,
        error: action.error
      }
    case GROUP_DELETE_START:
      return {
        ...state,
        group_delete_loading: true,
        group_delete_success: false
      }
    case GROUP_DELETE_SUCCESS:
      return {
        ...state,
        group_delete_loading: false,
        group_delete_success: true,
        groups: state.groups.filter(g => g._id !== action.data._id),
      }
    case GROUP_DELETE_FAILED:
      return {
        ...state,
        group_delete_loading: false,
        group_delete_success: false,
        error: action.error
      }
    default:
      return state;
  }
}