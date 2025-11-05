import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Reservation } from '../types/reservation';

interface ReservationState {
  list: Reservation[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ReservationState = {
  list: [],
  status: 'idle',
  error: null,
};

const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // o tu backend real

export const fetchReservations = createAsyncThunk('reservations/fetch', async () => {
  const response = await axios.get(API_URL);
  return response.data as Reservation[];
});

export const createReservation = createAsyncThunk('reservations/create', async (data: Omit<Reservation, 'id'>) => {
  const response = await axios.post(API_URL, data);
  return response.data as Reservation;
});

export const updateReservation = createAsyncThunk('reservations/update', async (data: Reservation) => {
  const response = await axios.put(`${API_URL}/${data.id}`, data);
  return response.data as Reservation;
});

export const deleteReservation = createAsyncThunk('reservations/delete', async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const reservationSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReservations.fulfilled, (state, action: PayloadAction<Reservation[]>) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(createReservation.fulfilled, (state, action: PayloadAction<Reservation>) => {
        state.list.push(action.payload);
      })
      .addCase(updateReservation.fulfilled, (state, action: PayloadAction<Reservation>) => {
        const index = state.list.findIndex(r => r.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deleteReservation.fulfilled, (state, action: PayloadAction<number>) => {
        state.list = state.list.filter(r => r.id !== action.payload);
      });
  },
});

export default reservationSlice.reducer;
