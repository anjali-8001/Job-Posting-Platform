import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./Features/userSlice";
import { authSlice } from "./Features/authSlice";

export default configureStore({
  reducer: {
    user: userSlice.reducer,
    auth: authSlice.reducer,
  },
});
