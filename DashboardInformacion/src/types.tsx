/**
 * ============================================
 * TIPOS DE DATOS
 * ============================================
 * 
 * Aquí definimos cómo se ve un Producto y las categorías.
 */

/**
 * INTERFACE: Producto
 * 
 * Define la estructura de un producto en inventario
 */
export interface Product {
  id: number                    // ID único (1, 2, 3...)
  name: string                  // Nombre: "Laptop Dell"
  description: string           // Descripción detallada
  category: ProductCategory     // Categoría del producto
  quantity: number              // Cantidad en stock: 50
  minStock: number              // Stock mínimo antes de alerta: 10
  price: number                 // Precio unitario: 1200.00
  supplier: string              // Proveedor: "Tech Supplies Inc."
  sku: string                   // Código SKU: "LAP-DELL-001"
  createdAt: string            // Fecha de creación
  updatedAt: string            // Última actualización
}

/**
 * TYPE: Categorías de productos
 * 
 * Solo puede ser uno de estos valores
 */
export type ProductCategory = 
  | 'electronics'     // 🖥️ Electrónica
  | 'furniture'       // 🪑 Muebles
  | 'food'           // 🍕 Alimentos
  | 'clothing'       // 👔 Ropa
  | 'tools'          // 🔧 Herramientas
  | 'other'          // 📦 Otros

/**
 * TYPE: Filtros disponibles
 */
export type FilterType = 
  | 'all'            // Todos los productos
  | 'low-stock'      // Solo con stock bajo
  | 'out-of-stock'   // Sin stock

/**
 * INTERFACE: Estadísticas del inventario
 */
export interface InventoryStats {
  totalProducts: number        // Total de productos
  totalValue: number          // Valor total del inventario
  lowStockItems: number       // Productos con stock bajo
  outOfStockItems: number     // Productos sin stock
  totalQuantity: number       // Cantidad total de items
}

/**
 * HELPER: Nombres legibles de categorías
 */
export const categoryNames: Record<ProductCategory, string> = {
  electronics: '🖥️ Electrónica',
  furniture: '🪑 Muebles',
  food: '🍕 Alimentos',
  clothing: '👔 Ropa',
  tools: '🔧 Herramientas',
  other: '📦 Otros'
}