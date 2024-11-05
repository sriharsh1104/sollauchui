import { createSlice } from "@reduxjs/toolkit";
// import { UserData } from "../../Constants/Interfaces/Authentication/UserData";

// InitialState for userData
const initialState: any = {
  name: "",
  firstName: "",
};

// UserData SLICE
export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    resetAuthenticationDataSlice: (state, action) => {
      state.firstName = "";
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
  },
});

export const {
  resetAuthenticationDataSlice,
  setFirstName,
} = userDataSlice.actions;
export default userDataSlice.reducer;
