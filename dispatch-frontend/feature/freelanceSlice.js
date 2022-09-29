import { createSlice } from "@reduxjs/toolkit";

export const freelanceSlice = createSlice({
  name: "freelance",
  initialState: {
    token: null,
    email: null,
    firstname: null,
    lastname: null,
    societyname: null,
    freelanceId: null,
  },
  reducers: {
    setFreelanceData: (state, { payload }) => {
      state.token = payload.token;
      state.email = payload.email;
      state.firstname = payload.firstname;
      state.lastname = payload.lastname;
      state.societyname = payload.societyname;
      state.freelanceId = payload.freelanceId;
    },
    deleteFreelanceData: (state) => {
      state.token = null;
      state.email = null;
      state.firstname = null;
      state.lastname = null;
      state.societyname = null;
      state.freelanceId = null;
    },
  },
});

export const { setFreelanceData, deleteFreelanceData } = freelanceSlice.actions;
export default freelanceSlice.reducer;
