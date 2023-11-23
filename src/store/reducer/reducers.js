import { combineReducers } from "@reduxjs/toolkit";
import addUserReducer from "./admin/addUserReducer";
import viewLeavesReducer from "./user/viewLeavesReducer";
import viewUserDetailReducer from "./user/viewUserDetailReducer";
import fetchReportReducer from "./user/fetchReportReducer";

const rootReducer = combineReducers({
  addUser: addUserReducer,
  viewLeaves: viewLeavesReducer,
  viewUserDetail: viewUserDetailReducer,
  fetchReports: fetchReportReducer,
});

export default rootReducer;
