import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  avatarId: null,
  avatarUrl: null,
};

const avatarSlice = createSlice({
  name: "avatarReducer",
  initialState,
  reducers: {
    setAvatarId(state, action) {
        state.avatarId = action.payload;
        sessionStorage.setItem("avatarId", state.avatarId);
      },  
      setAvatarUrl(state, action) {
        state.avatarUrl = action.payload;
        sessionStorage.setItem("avatarUrl", state.avatarUrl);
      },  
    removeAvatarId(state) {
        state.avatarId = null;
        sessionStorage.removeItem("avatarId");
      },
      removeAvatarUrl(state) {
        state.avatarUrl = null;
        sessionStorage.removeItem("avatarUrl");
      },
  },
});

export const { setAvatarUrl, setAvatarId, removeAvatarUrl, removeAvatarId } = avatarSlice.actions;
export default avatarSlice.reducer;