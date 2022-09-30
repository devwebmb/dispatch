import { createSlice } from "@reduxjs/toolkit";

export const clientSlice = createSlice({
  name: "client",
  initialState: {
    token: null,
    email: null,
    societyname: null,
    clientId: null,
  },
  reducers: {
    setClientData: (state, { payload }) => {
      state.token = payload.token;
      state.email = payload.email;
      state.societyname = payload.societyname;
      state.clientId = payload.clientId;
    },
    deleteClientData: (state) => {
      state.token = null;
      state.email = null;
      state.societyname = null;
      state.clientId = null;
    },
  },
});

export const { setClientData, deleteClientData } = clientSlice.actions;
export default clientSlice.reducer;
