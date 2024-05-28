import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPassChange: true,
};

const changeSlice = createSlice({
  name: "changeReducer",
  initialState,
  reducers: {
    setIsChangePass(state, action) {
        state.isPassChange = action.payload;
        sessionStorage.setItem("isPassChange", state.isPassChange);
      },  
  },
});

export const { setIsChangePass } = changeSlice.actions;
export default changeSlice.reducer;