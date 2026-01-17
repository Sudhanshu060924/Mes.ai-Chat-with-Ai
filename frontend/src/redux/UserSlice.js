import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    otherUsers: [],
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setotherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
  },
});

export const { setUserData,setotherUsers } = userSlice.actions;
export default userSlice.reducer;   