import { combineReducers } from "redux";
import { account } from "./reducers_login";
import { user } from "./reducers_user";
import { role } from "./reducers_role";
import { member } from "./reducers_member";
import { category } from "./reducers_mem_category";
import { dashboard_data } from "./reducers_dashboard_data";
import { group } from "./reducers_group";

export const rootReducer = combineReducers({
  account,
  user,
  role,
  member,
  category,
  dashboard_data,
  group,
});