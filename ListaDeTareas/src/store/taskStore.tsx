/**
import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit'
// createSlice → crea un "slice" del estado con reducers y acciones automáticamente
// configureStore → crea el store global listo para usar
// PayloadAction → tipo de acción que lleva datos (payload)

import type { Task, FilterType } from '../types'
// Task → tipo que define la estructura de una tarea
// FilterType → tipo de filtro ('all' | 'completed' | 'pending')

// ==================================================
// 1️⃣ ESTADO INICIAL
// ==================================================
interface TaskState {
  tasks: Task[]        // Lista de tareas
  filter: FilterType   // Filtro activo
  nextId: number       // Próximo ID para crear tareas
}

// 🔹 TIP: Si quieres hacer otro proyecto (ej: productos, clientes), aquí defines:
// - products: Product[]
// - clientes: Client[]
// - cualquier otro estado inicial que tu app necesite
const initialState: TaskState = {
  tasks: [],         // Al inicio vacío
  filter: 'all',     // Mostrar todas
  nextId: 1          // El primer ID será 1
}

// ==================================================
// 2️⃣ SLICE: REGLAS DE CAMBIO DE ESTADO
// ==================================================
const taskSlice = createSlice({
  name: 'tasks',          // Nombre del slice (identificador en el store)
  initialState,           // Estado inicial definido arriba
  reducers: {             // Aquí van las "acciones" síncronas

    // --------------- CREAR TAREA ----------------
    addTask: (state, action: PayloadAction<Omit<Task, 'id' | 'createdAt'>>) => {
      const newTask: Task = {
        id: state.nextId,
        title: action.payload.title,
        description: action.payload.description,
        completed: false,
        createdAt: new Date().toISOString()
      }
      state.tasks.push(newTask)
      state.nextId += 1
    },

    // --------------- ACTUALIZAR TAREA ------------
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id)
      if (index !== -1) state.tasks[index] = action.payload
    },

    // --------------- ELIMINAR TAREA -------------
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
    },

    // --------------- TOGGLE COMPLETADA ----------
    toggleTaskComplete: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find(task => task.id === action.payload)
      if (task) task.completed = !task.completed
    },

    // --------------- CAMBIAR FILTRO -------------
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload
    }
  }
})

// ==================================================
// 3️⃣ EXPORTAR ACCIONES
// ==================================================
// 🔹 Tip: Si cambias el proyecto, renombra y exporta tus acciones:
// - addProduct, updateProduct, deleteProduct
// - addClient, updateClient, deleteClient
export const {
  addTask,
  updateTask,
  deleteTask,
  toggleTaskComplete,
  setFilter
} = taskSlice.actions

// ==================================================
// 4️⃣ STORE
// ==================================================
// 🔹 Tip: Para otro proyecto, registra los slices aquí:
// reducer: { tasks: taskSlice.reducer } → reducer: { products: productSlice.reducer }
export const store = configureStore({
  reducer: {
    tasks: taskSlice.reducer
  }
})

// ==================================================
// 5️⃣ TIPOS PARA TYPESCRIPT
// ==================================================
export type RootState = ReturnType<typeof store.getState>  // tipo del estado global
export type AppDispatch = typeof store.dispatch           // tipo de dispatch para thunks o actions
