import { createSlice } from "@reduxjs/toolkit";
// import { UserData } from "../../Constants/Interfaces/Authentication/UserData";

// InitialState for userData
const initialState: any = {
  firstName: "",
  walletAddress:"",
};

// UserData SLICE
export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    resetAuthenticationDataSlice: (state, action) => {
      state.firstName = "";
      state.walletAddress = "";

    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setWalletAddress: (state, action) => {
      state.walletAddress = action.payload;
    },
  },
});

export const {
  resetAuthenticationDataSlice,
  setFirstName,
  setWalletAddress,
} = userDataSlice.actions;
export default userDataSlice.reducer;
