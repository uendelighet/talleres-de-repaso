// src/features/users/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../types';

interface UserState {
  list: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Cargar estado inicial desde localStorage
const loadState = () => {
  try {
    const savedState = localStorage.getItem('usersState');
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (e) {
    console.error('Error loading state:', e);
  }
  return {
    list: [],
    status: 'idle',
    error: null,
  };
};

const initialState: UserState = loadState();

const API_URL = 'https://jsonplaceholder.typicode.com/users';

/* --------------------------- THUNKS ASINCRÓNICOS --------------------------- */

// Leer usuarios
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get<User[]>(API_URL);
  return response.data;
});

// Crear usuario
export const createUser = createAsyncThunk('users/createUser', async (newUser: Omit<User, 'id'>, { getState }) => {
  const response = await axios.post<User>(API_URL, newUser);
  // Generar un ID local (ya que JSONPlaceholder no guarda el cambio)
  const state: any = getState();
  const existingUsers = state.users.list as User[];
  const newId = (existingUsers[existingUsers.length - 1]?.id || 10) + 1;
  return { ...response.data, id: newId };
});

// Actualizar usuario
export const updateUser = createAsyncThunk('users/updateUser', async (updatedUser: User) => {
  await axios.put(`${API_URL}/${updatedUser.id}`, updatedUser);
  // Devolvemos el mismo objeto, porque la API no guarda cambios
  return updatedUser;
});

// Eliminar usuario
export const deleteUser = createAsyncThunk('users/deleteUser', async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

/* --------------------------- SLICE PRINCIPAL --------------------------- */

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUserToState: (state, action: PayloadAction<User>) => {
      state.list.push(action.payload);
    },
    updateUserInState: (state, action: PayloadAction<User>) => {
      const index = state.list.findIndex(u => u.id === action.payload.id);
      if (index !== -1) state.list[index] = action.payload;
    },
    removeUserFromState: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(u => u.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH USERS
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error al cargar usuarios';
      })

      // CREATE USER
      .addCase(createUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list.push(action.payload);
        // Guardar en localStorage
        localStorage.setItem('usersState', JSON.stringify(state));
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error al crear el usuario';
      })

      // UPDATE USER
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.list.findIndex(u => u.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        // Guardar en localStorage
        localStorage.setItem('usersState', JSON.stringify(state));
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error al actualizar el usuario';
      })

      // DELETE USER
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter(u => u.id !== action.payload);
        // Guardar en localStorage
        localStorage.setItem('usersState', JSON.stringify(state));
      });
  },
});

export const { addUserToState, updateUserInState, removeUserFromState } = userSlice.actions;
export default userSlice.reducer;