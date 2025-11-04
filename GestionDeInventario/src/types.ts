/**
 * ============================================
 * TIPOS DE DATOS
 * ============================================
 * 
 * Define la estructura de los productos y filtros
 */

export interface Product {
  id: number              // ID único
  name: string            // Nombre del producto
  category: string        // Categoría (Electrónica, Accesorios, etc.)
  quantity: number        // Cantidad en stock
  supplier: string        // Proveedor
  price: number           // Precio en COP
  minStock: number        // Stock mínimo antes de alerta
  createdAt: string       // Fecha de creación
}

/**
 * Tipos de filtro disponibles
 */
export type StockFilter = 'all' | 'low' | 'ok'