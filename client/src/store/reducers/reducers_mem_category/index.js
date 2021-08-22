import {
  CATEGORY_START,
  CATEGORY_SUCCESS,
  CATEGORY_FAILED,
  CATEGORY_LIST_START,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAILED,
} from "../../actions/actions_mem_category";

const initialState = {
  categories: [],
  categoryInfo: {},
  categoryLoading: false,
  categorySuccess: false,
  categoryListLoading: false,
  categoryListSuccess: false,
  error: ""
}

export const category = (state=initialState, action) => {
  switch(action.type) {
    case CATEGORY_START:
      return {
        ...state,
        categoryLoading: true,
        categorySuccess: false,
      }
    case CATEGORY_SUCCESS:
      return {
        ...state,
        categoryLoading: false,
        categorySuccess: true,
        categoryInfo: action.data,
      }
    case CATEGORY_FAILED:
      return {
        ...state,
        categoryLoading: false,
        categorySuccess: false,
        error: action.error
      }
    case CATEGORY_LIST_START:
      return {
        ...state,
        categoryListLoading: true,
        categoryListSuccess: false,
      }
    case CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        categoryListLoading: false,
        categoryListSuccess: true,
        categories: action.data,
      }
    case CATEGORY_LIST_FAILED:
      return {
        ...state,
        categoryListLoading: false,
        categoryListSuccess: false,
        error: action.error
      }
    default:
      return state;
  }
}