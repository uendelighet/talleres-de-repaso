// src/features/users/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Task } from '../types';
import data from '../app/data.json';

// Constantes
const STORAGE_KEY = 'tasksState';

// Tipos
interface TaskState {
  list: Task[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Helpers
const saveToLocalStorage = (state: TaskState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Error saving tasks state:', e);
  }
};

const loadFromLocalStorage = (): TaskState => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved) as TaskState;
  } catch (e) {
    console.error('Error loading tasks state:', e);
  }
  // If not in localStorage, initialize from data.json (bundled)
  return {
    list: (data as any).tasks || [],
    status: 'idle',
    error: null,
  };
};

const generateNewId = (tasks: Task[]) => (tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1);

// Initial state
const initialState: TaskState = loadFromLocalStorage();

/* Thunks */
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  // We already load initial data from data.json or localStorage on initialization,
  // so fetchTasks can simply return the bundled tasks (or could be expanded later).
  return (data as any).tasks as Task[];
});

export const createTask = createAsyncThunk('tasks/createTask', async (task: Omit<Task, 'id'>, { getState }) => {
  // generate an id locally
  const state = getState() as any;
  const list: Task[] = state.users?.list || [];
  const id = generateNewId(list);
  return { ...task, id } as Task;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (task: Task) => {
  // no server persistence required — we just return the task
  return task;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id: number) => {
  return id;
});

/* Slice */
const userSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const setLoading = (state: TaskState) => {
      state.status = 'loading';
      state.error = null;
    };

    const setError = (state: TaskState, error: any) => {
      state.status = 'failed';
      state.error = error?.message || 'Error en la operación';
    };

    builder
      .addCase(fetchTasks.pending, setLoading)
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => setError(state, action.error))

      .addCase(createTask.pending, setLoading)
      .addCase(createTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list.push(action.payload);
        saveToLocalStorage(state);
      })
      .addCase(createTask.rejected, (state, action) => setError(state, action.error))

      .addCase(updateTask.pending, setLoading)
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const idx = state.list.findIndex(t => t.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
        saveToLocalStorage(state);
      })
      .addCase(updateTask.rejected, (state, action) => setError(state, action.error))

      .addCase(deleteTask.pending, setLoading)
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = state.list.filter(t => t.id !== action.payload);
        saveToLocalStorage(state);
      })
      .addCase(deleteTask.rejected, (state, action) => setError(state, action.error));
  },
});

export default userSlice.reducer;
