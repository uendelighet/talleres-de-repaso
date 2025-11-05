import { createSlice, createAsyncThunk, configureStore } from '@reduxjs/toolkit'
import axios from 'axios'
import type { Entity } from './types'

// ⚡ Estado inicial
interface EntityState {
  items: Entity[]
  loading: boolean
  error: string | null
}

const initialState: EntityState = {
  items: [],
  loading: false,
  error: null
}

// 🌐 THUNKS - acciones asincrónicas
export const fetchItems = createAsyncThunk('entity/fetch', async () => {
  const response = await axios.get<Entity[]>('https://api.tuapp.com/entity')
  return response.data
})

export const createItem = createAsyncThunk('entity/create', async (newItem: Omit<Entity, 'id'>) => {
  const response = await axios.post<Entity>('https://api.tuapp.com/entity', newItem)
  return response.data
})

export const updateItem = createAsyncThunk('entity/update', async (item: Entity) => {
  const response = await axios.put<Entity>(`https://api.tuapp.com/entity/${item.id}`, item)
  return response.data
})

export const deleteItem = createAsyncThunk('entity/delete', async (id: number) => {
  await axios.delete(`https://api.tuapp.com/entity/${id}`)
  return id
})

// 🛠️ Slice
const entitySlice = createSlice({
  name: 'entity',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => { state.loading = true; state.error = null })
    builder.addCase(fetchItems.fulfilled, (state, action) => { state.loading = false; state.items = action.payload })
    builder.addCase(fetchItems.rejected, (state) => { state.loading = false; state.error = 'Error al cargar items' })

    builder.addCase(createItem.pending, (state) => { state.loading = true; state.error = null })
    builder.addCase(createItem.fulfilled, (state, action) => { state.loading = false; state.items.push(action.payload) })
    builder.addCase(createItem.rejected, (state) => { state.loading = false; state.error = 'Error al crear item' })

    builder.addCase(updateItem.pending, (state) => { state.loading = true; state.error = null })
    builder.addCase(updateItem.fulfilled, (state, action) => {
      state.loading = false
      const index = state.items.findIndex(i => i.id === action.payload.id)
      if (index !== -1) state.items[index] = action.payload
    })
    builder.addCase(updateItem.rejected, (state) => { state.loading = false; state.error = 'Error al actualizar item' })

    builder.addCase(deleteItem.pending, (state) => { state.loading = true; state.error = null })
    builder.addCase(deleteItem.fulfilled, (state, action) => { state.loading = false; state.items = state.items.filter(i => i.id !== action.payload) })
    builder.addCase(deleteItem.rejected, (state) => { state.loading = false; state.error = 'Error al eliminar item' })
  }
})

// 🏪 Store
export const store = configureStore({
  reducer: { entity: entitySlice.reducer }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
