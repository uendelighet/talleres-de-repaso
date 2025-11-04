/**
 * ============================================
 * REDUX STORE - GESTIÓN DE INVENTARIO
 * ============================================
 * 
 * Maneja todo el estado de la aplicación:
 * - Lista de productos
 * - Filtros
 * - Acciones (CRUD)
 */

import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit'
import type { Product, StockFilter } from '../types'

// ==================================================
// 1️⃣ ESTADO INICIAL
// ==================================================
interface InventoryState {
  products: Product[]      // Lista de productos
  filter: StockFilter      // Filtro activo
  nextId: number          // Próximo ID disponible
}

// Productos de ejemplo para empezar
const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'Laptop Dell XPS 13',
    category: 'Electrónica',
    quantity: 15,
    supplier: 'Dell Colombia',
    price: 3500000,
    minStock: 5,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Mouse Logitech MX Master',
    category: 'Accesorios',
    quantity: 3,
    supplier: 'Logitech',
    price: 250000,
    minStock: 10,
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Teclado Mecánico RGB',
    category: 'Accesorios',
    quantity: 8,
    supplier: 'Razer',
    price: 450000,
    minStock: 5,
    createdAt: new Date().toISOString()
  }
]

const initialState: InventoryState = {
  products: sampleProducts,
  filter: 'all',
  nextId: 4
}

// ==================================================
// 2️⃣ SLICE: ACCIONES Y REDUCERS
// ==================================================
const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    
    // --------------- AGREGAR PRODUCTO ----------------
    /**
     * Crea un nuevo producto con ID automático
     */
    addProduct: (state, action: PayloadAction<Omit<Product, 'id' | 'createdAt'>>) => {
      const newProduct: Product = {
        id: state.nextId,
        ...action.payload,
        createdAt: new Date().toISOString()
      }
      state.products.push(newProduct)
      state.nextId += 1
    },

    // --------------- ACTUALIZAR PRODUCTO -------------
    /**
     * Actualiza un producto existente
     */
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id)
      if (index !== -1) {
        state.products[index] = action.payload
      }
    },

    // --------------- ELIMINAR PRODUCTO ---------------
    /**
     * Elimina un producto por su ID
     */
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(p => p.id !== action.payload)
    },

    // --------------- ACTUALIZAR SOLO STOCK -----------
    /**
     * Actualiza únicamente la cantidad de un producto
     * Útil para ajustes rápidos de inventario
     */
    updateStock: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const product = state.products.find(p => p.id === action.payload.id)
      if (product) {
        product.quantity = action.payload.quantity
      }
    },

    // --------------- CAMBIAR FILTRO ------------------
    /**
     * Cambia el filtro de visualización
     */
    setFilter: (state, action: PayloadAction<StockFilter>) => {
      state.filter = action.payload
    }
  }
})

// ==================================================
// 3️⃣ EXPORTAR ACCIONES
// ==================================================
export const {
  addProduct,
  updateProduct,
  deleteProduct,
  updateStock,
  setFilter
} = inventorySlice.actions

// ==================================================
// 4️⃣ STORE
// ==================================================
export const store = configureStore({
  reducer: {
    inventory: inventorySlice.reducer
  }
})

// ==================================================
// 5️⃣ TIPOS PARA TYPESCRIPT
// ==================================================
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch