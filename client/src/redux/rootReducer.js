import { combineReducers } from "redux";
import userReducer from "./userSlice"; // Import the user slice reducer
import authReducer from "./authSlice"; // Import the auth slice reducer

const rootReducer = combineReducers({
  user: userReducer, // Set the user slice
  auth: authReducer, // Set the auth slice
});

export default rootReducer;
