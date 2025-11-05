/**
 * ============================================
 * REDUX STORE - GESTIÓN DEL INVENTARIO
 * ============================================
 * 
 * Este archivo contiene:
 * 1. Estado inicial del inventario
 * 2. Reducers para CRUD
 * 3. Selectores para filtrar y calcular
 * 4. Store configurado
 */

import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit'
import type { Product, ProductCategory, FilterType, InventoryStats } from '../types'

// ============================================
// 1. ESTADO INICIAL
// ============================================
/**
 * Al iniciar la app, esto es lo que hay en el store
 */

interface InventoryState {
  products: Product[]           // Lista de productos
  filter: FilterType           // Filtro activo
  selectedCategory: ProductCategory | 'all'  // Categoría seleccionada
  nextId: number               // Próximo ID para nuevos productos
}

const initialState: InventoryState = {
  products: [],
  filter: 'all',
  selectedCategory: 'all',
  nextId: 1
}

// ============================================
// 2. SLICE (Reducers)
// ============================================
/**
 * Define CÓMO cambia el estado cuando hacemos algo
 */

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  
  reducers: {
    
    // ------------------------------------------
    // AGREGAR PRODUCTO
    // ------------------------------------------
    /**
     * Crea un nuevo producto en el inventario
     * 
     * @param state - Estado actual
     * @param action - Datos del nuevo producto
     */
    addProduct: (
      state, 
      action: PayloadAction<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>
    ) => {
      const now = new Date().toISOString()
      
      const newProduct: Product = {
        id: state.nextId,
        ...action.payload,
        createdAt: now,
        updatedAt: now
      }
      
      state.products.push(newProduct)
      state.nextId += 1
    },
    
    // ------------------------------------------
    // ACTUALIZAR PRODUCTO
    // ------------------------------------------
    /**
     * Modifica un producto existente
     * 
     * @param state - Estado actual
     * @param action - Producto con nuevos datos
     */
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id)
      
      if (index !== -1) {
        state.products[index] = {
          ...action.payload,
          updatedAt: new Date().toISOString()
        }
      }
    },
    
    // ------------------------------------------
    // ELIMINAR PRODUCTO
    // ------------------------------------------
    /**
     * Borra un producto del inventario
     * 
     * @param state - Estado actual
     * @param action - ID del producto a eliminar
     */
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(p => p.id !== action.payload)
    },
    
    // ------------------------------------------
    // ACTUALIZAR STOCK
    // ------------------------------------------
    /**
     * Modifica solo la cantidad en stock de un producto
     * 
     * @param state - Estado actual
     * @param action - { id: number, quantity: number }
     */
    updateStock: (
      state, 
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const product = state.products.find(p => p.id === action.payload.id)
      
      if (product) {
        product.quantity = action.payload.quantity
        product.updatedAt = new Date().toISOString()
      }
    },
    
    // ------------------------------------------
    // AJUSTAR STOCK (Incrementar/Decrementar)
    // ------------------------------------------
    /**
     * Suma o resta una cantidad al stock actual
     * Útil para registrar entradas/salidas
     * 
     * @param state - Estado actual
     * @param action - { id: number, adjustment: number }
     */
    adjustStock: (
      state, 
      action: PayloadAction<{ id: number; adjustment: number }>
    ) => {
      const product = state.products.find(p => p.id === action.payload.id)
      
      if (product) {
        // No permitir stock negativo
        const newQuantity = product.quantity + action.payload.adjustment
        product.quantity = Math.max(0, newQuantity)
        product.updatedAt = new Date().toISOString()
      }
    },
    
    // ------------------------------------------
    // CAMBIAR FILTRO
    // ------------------------------------------
    /**
     * Cambia el filtro activo (all, low-stock, out-of-stock)
     * 
     * @param state - Estado actual
     * @param action - Nuevo filtro
     */
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload
    },
    
    // ------------------------------------------
    // CAMBIAR CATEGORÍA
    // ------------------------------------------
    /**
     * Filtra por categoría de producto
     * 
     * @param state - Estado actual
     * @param action - Categoría seleccionada
     */
    setCategory: (
      state, 
      action: PayloadAction<ProductCategory | 'all'>
    ) => {
      state.selectedCategory = action.payload
    }
  }
})

// ============================================
// 3. SELECTORES (Funciones para leer datos)
// ============================================
/**
 * Estas funciones calculan y filtran datos del estado
 */

/**
 * Obtiene productos filtrados según filtro y categoría activos
 */
export const selectFilteredProducts = (state: RootState): Product[] => {
  let filtered = state.inventory.products
  
  // Filtrar por categoría
  if (state.inventory.selectedCategory !== 'all') {
    filtered = filtered.filter(
      p => p.category === state.inventory.selectedCategory
    )
  }
  
  // Filtrar por estado de stock
  switch (state.inventory.filter) {
    case 'low-stock':
      // Productos con stock bajo (quantity <= minStock pero > 0)
      filtered = filtered.filter(
        p => p.quantity > 0 && p.quantity <= p.minStock
      )
      break
    
    case 'out-of-stock':
      // Productos sin stock (quantity = 0)
      filtered = filtered.filter(p => p.quantity === 0)
      break
    
    default:
      // Todos los productos
      break
  }
  
  return filtered
}

/**
 * Calcula estadísticas del inventario
 */
export const selectInventoryStats = (state: RootState): InventoryStats => {
  const products = state.inventory.products
  
  return {
    totalProducts: products.length,
    
    // Valor total = suma de (precio × cantidad) de todos los productos
    totalValue: products.reduce(
      (sum, p) => sum + (p.price * p.quantity), 
      0
    ),
    
    // Productos con stock bajo (quantity <= minStock pero > 0)
    lowStockItems: products.filter(
      p => p.quantity > 0 && p.quantity <= p.minStock
    ).length,
    
    // Productos sin stock (quantity = 0)
    outOfStockItems: products.filter(p => p.quantity === 0).length,
    
    // Cantidad total de items
    totalQuantity: products.reduce((sum, p) => sum + p.quantity, 0)
  }
}

/**
 * Obtiene productos con alerta de stock bajo
 */
export const selectLowStockProducts = (state: RootState): Product[] => {
  return state.inventory.products.filter(
    p => p.quantity > 0 && p.quantity <= p.minStock
  )
}

/**
 * Obtiene productos sin stock
 */
export const selectOutOfStockProducts = (state: RootState): Product[] => {
  return state.inventory.products.filter(p => p.quantity === 0)
}

// ============================================
// 4. EXPORTAR ACCIONES
// ============================================
export const {
  addProduct,
  updateProduct,
  deleteProduct,
  updateStock,
  adjustStock,
  setFilter,
  setCategory
} = inventorySlice.actions

// ============================================
// 5. STORE (El contenedor principal)
// ============================================
export const store = configureStore({
  reducer: {
    inventory: inventorySlice.reducer
  }
})

// Tipos para TypeScript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch