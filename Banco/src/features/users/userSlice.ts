import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../../types/types';

interface UserState {
  users: User[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  users: [],
  status: 'idle',
};

// GET
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const res = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
  return res.data;
});

// POST
export const createUser = createAsyncThunk('users/createUser', async (user: Omit<User, 'id'>) => {
  const res = await axios.post<User>('https://jsonplaceholder.typicode.com/users', user);
  return res.data;
});

// PUT
export const updateUser = createAsyncThunk('users/updateUser', async (user: User) => {
  const res = await axios.put<User>(`https://jsonplaceholder.typicode.com/users/${user.id}`, user);
  return res.data;
});

// DELETE
export const deleteUser = createAsyncThunk('users/deleteUser', async (id: number) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
  return id;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = 'idle';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) state.users[index] = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
