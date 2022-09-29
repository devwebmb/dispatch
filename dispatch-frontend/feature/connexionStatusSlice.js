import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: false };

export const connexionStatusSlice = createSlice({
  name: "isConnected",
  initialState,
  reducers: {
    connexion: (state) => {
      state.value = true;
    },
    deconnexion: (state) => {
      state.value = false;
    },
    changeStatus: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { connexion, deconnexion, changeStatus } =
  connexionStatusSlice.actions;

export default connexionStatusSlice.reducer;
