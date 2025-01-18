import { createSlice } from '@reduxjs/toolkit';

const Authslice = createSlice({
  name: "Authstore",
  initialState: {
    isAuthenticated: false
  },
  reducers: {
    login:(state)=>{
          state.isAuthenticated = true;
    },
    logout: (state) => {
        state.isAuthenticated = false;
    }
  },
});

export default Authslice;
export const AuthSliceActions = Authslice.actions;
