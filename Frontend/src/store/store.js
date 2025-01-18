 
import { configureStore } from '@reduxjs/toolkit';
import Authslice from './authstore';
 
 
// Configure the store without persistence
const store  = configureStore({
  reducer: {
      authstore:Authslice.reducer,
  },
});

export default store
