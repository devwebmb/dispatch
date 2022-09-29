import { configureStore } from "@reduxjs/toolkit";
import connexionStatusReducers from "../feature/connexionStatusSlice";
import freelanceReducers from "../feature/freelanceSlice";

export default configureStore({
  reducer: {
    isConnected: connexionStatusReducers,
    freelance: freelanceReducers,
  },
});
