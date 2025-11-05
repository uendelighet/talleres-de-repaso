import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users/userSlice'
import accountReducer from '../features/accounts/accountSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    accounts: accountReducer,
  },
});

// 👇 estos tipos son clave
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
