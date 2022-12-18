import cardReducer from './reducer/cardReducer';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducer/user';

export const store = configureStore({
  reducer: cardReducer 
});

export type RootState = ReturnType<typeof store.getState>;
