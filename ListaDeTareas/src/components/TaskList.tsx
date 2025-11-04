/**
 * ============================================
 * COMPONENTE: LISTA DE TAREAS
 * ============================================
 * 
 * Este componente:
 * 1. Muestra todas las tareas
 * 2. Permite filtrar (todas/completadas/pendientes)
 * 3. Permite eliminar y cambiar estado
 */

import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setFilter } from '../store/taskStore'
import type { RootState, AppDispatch } from '../store/taskStore'
import type { FilterType } from '../types'
import TaskItem from './TaskItem'

const TaskList = () => {
  
  // ===== HOOKS DE REDUX =====
  
  const dispatch = useDispatch<AppDispatch>()
  
  // Leer las tareas y el filtro actual del store
  const tasks = useSelector((state: RootState) => state.tasks.tasks)
  const currentFilter = useSelector((state: RootState) => state.tasks.filter)
  
  // ===== FILTRAR TAREAS =====
  
  /**
   * Según el filtro activo, mostramos diferentes tareas
   */
  const filteredTasks = tasks.filter(task => {
    if (currentFilter === 'completed') {
      return task.completed === true    // Solo completadas
    }
    if (currentFilter === 'pending') {
      return task.completed === false   // Solo pendientes
    }
    return true  // Si el filtro es "all", mostrar todas
  })
  
  // ===== MANEJAR CAMBIO DE FILTRO =====
  
  const handleFilterChange = (filter: FilterType) => {
    dispatch(setFilter(filter))  // Cambiar el filtro en Redux
  }
  
  // ===== CONTAR TAREAS =====
  
  const totalTasks = tasks.length
  const completedCount = tasks.filter(t => t.completed).length
  const pendingCount = tasks.filter(t => !t.completed).length
  
  // ===== RENDERIZADO =====
  
  return (
    <div style={styles.container}>
      
      {/* ENCABEZADO */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>📋 Mis Tareas</h1>
          <p style={styles.subtitle}>
            {totalTasks} tareas • {completedCount} completadas • {pendingCount} pendientes
          </p>
        </div>
        <Link to="/create" style={styles.btnCreate}>
          ➕ Nueva Tarea
        </Link>
      </div>
      
      {/* BOTONES DE FILTRO */}
      <div style={styles.filters}>
        <button
          onClick={() => handleFilterChange('all')}
          style={{
            ...styles.filterBtn,
            ...(currentFilter === 'all' ? styles.filterBtnActive : {})
          }}
        >
          📋 Todas ({totalTasks})
        </button>
        
        <button
          onClick={() => handleFilterChange('pending')}
          style={{
            ...styles.filterBtn,
            ...(currentFilter === 'pending' ? styles.filterBtnActive : {})
          }}
        >
          ⏳ Pendientes ({pendingCount})
        </button>
        
        <button
          onClick={() => handleFilterChange('completed')}
          style={{
            ...styles.filterBtn,
            ...(currentFilter === 'completed' ? styles.filterBtnActive : {})
          }}
        >
          ✅ Completadas ({completedCount})
        </button>
      </div>
      
      {/* LISTA DE TAREAS */}
      {filteredTasks.length === 0 ? (
        <div style={styles.empty}>
          <p style={styles.emptyText}>
            {currentFilter === 'completed' && '🎉 No hay tareas completadas'}
            {currentFilter === 'pending' && '👍 No hay tareas pendientes'}
            {currentFilter === 'all' && '📝 No hay tareas. ¡Crea tu primera tarea!'}
          </p>
        </div>
      ) : (
        <div style={styles.grid}>
          {filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  )
}

// ============================================
// ESTILOS
// ============================================
const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '20px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap' as const,
    gap: '20px'
  },
  title: {
    margin: '0 0 5px 0',
    color: '#2d3748',
    fontSize: '32px'
  },
  subtitle: {
    margin: 0,
    color: '#718096',
    fontSize: '16px'
  },
  btnCreate: {
    padding: '12px 24px',
    backgroundColor: '#48bb78',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: 'bold' as const,
    fontSize: '16px',
    display: 'inline-block',
    transition: 'background-color 0.3s'
  },
  filters: {
    display: 'flex',
    gap: '10px',
    marginBottom: '30px',
    flexWrap: 'wrap' as const
  },
  filterBtn: {
    padding: '10px 20px',
    border: '2px solid #e2e8f0',
    backgroundColor: 'white',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500' as const,
    transition: 'all 0.3s'
  },
  filterBtnActive: {
    backgroundColor: '#4299e1',
    color: 'white',
    borderColor: '#4299e1'
  },
  empty: {
    textAlign: 'center' as const,
    padding: '60px 20px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  emptyText: {
    fontSize: '18px',
    color: '#718096',
    margin: 0
  },
  grid: {
    display: 'grid',
    gap: '20px'
  }
}

export default TaskList