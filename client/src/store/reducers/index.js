import { combineReducers } from "redux";
import { account } from "./reducers_login";
import { user } from "./reducers_user";
import { dashboard_data } from "./reducers_dashboard_data";

export const rootReducer = combineReducers({
  account,
  user,
  dashboard_data,
});