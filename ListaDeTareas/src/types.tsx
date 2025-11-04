/**
 * ============================================
 * TIPOS DE DATOS
 * ============================================
 * 
 * Aquí definimos cómo se ve una Tarea.
 * Es como un "molde" que dice qué campos debe tener.
 */

export interface Task {
  id: number              // Identificador único (1, 2, 3...)
  title: string           // Título de la tarea: "Comprar leche"
  description: string     // Descripción: "Ir al supermercado..."
  completed: boolean      // ¿Está completada? true o false
  createdAt: string       // Fecha de creación: "2024-01-15"
}

/**
 * TIPO: Filtros disponibles
 * 
 * Esto define los 3 filtros que podemos usar
 */
export type FilterType = 'all' | 'completed' | 'pending'