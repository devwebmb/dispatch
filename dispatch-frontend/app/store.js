import { configureStore } from "@reduxjs/toolkit";
import connexionStatusReducers from "../feature/connexionStatusSlice";
import freelanceReducers from "../feature/freelanceSlice";
import clientReducers from "../feature/clientSlice";

export default configureStore({
  reducer: {
    isConnected: connexionStatusReducers,
    freelance: freelanceReducers,
    client: clientReducers,
  },
});
