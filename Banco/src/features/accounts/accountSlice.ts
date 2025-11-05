import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Account } from '../../types/types';

interface AccountState {
  accounts: Account[];
}

const initialState: AccountState = {
  accounts: [],
};

const accountSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    addAccount: (state, action: PayloadAction<Account>) => {
      state.accounts.push(action.payload);
    },
    updateAccount: (state, action: PayloadAction<Account>) => {
      const index = state.accounts.findIndex(a => a.id === action.payload.id);
      if (index !== -1) state.accounts[index] = action.payload;
    },
    deleteAccount: (state, action: PayloadAction<number>) => {
      state.accounts = state.accounts.filter(a => a.id !== action.payload);
    },
  },
});

export const { addAccount, updateAccount, deleteAccount } = accountSlice.actions;
export default accountSlice.reducer;
