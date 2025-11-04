/**
 * ============================================
 * COMPONENTE: TARJETA DE TAREA INDIVIDUAL
 * ============================================
 * 
 * Este componente muestra UNA tarea con:
 * - Checkbox para marcar completada
 * - Botón de editar
 * - Botón de eliminar
 */

import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteTask, toggleTaskComplete } from '../store/taskStore'
import type { AppDispatch } from '../store/taskStore'
import type { Task } from '../types'

interface TaskItemProps {
  task: Task  // La tarea que vamos a mostrar
}

const TaskItem = ({ task }: TaskItemProps) => {
  
  const dispatch = useDispatch<AppDispatch>()
  
  // ===== FUNCIÓN: CAMBIAR ESTADO =====
  
  const handleToggle = () => {
    dispatch(toggleTaskComplete(task.id))
  }
  
  // ===== FUNCIÓN: ELIMINAR =====
  
  const handleDelete = () => {
    if (confirm('¿Estás seguro de eliminar esta tarea?')) {
      dispatch(deleteTask(task.id))
    }
  }
  
  // ===== FORMATEAR FECHA =====
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }
  
  // ===== RENDERIZADO =====
  
  return (
    <div style={{
      ...styles.card,
      ...(task.completed ? styles.cardCompleted : {})
    }}>
      
      {/* CHECKBOX */}
      <div style={styles.checkboxContainer}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          style={styles.checkbox}
        />
      </div>
      
      {/* INFORMACIÓN */}
      <div style={styles.content}>
        <h3 style={{
          ...styles.title,
          ...(task.completed ? styles.titleCompleted : {})
        }}>
          {task.title}
        </h3>
        
        <p style={{
          ...styles.description,
          ...(task.completed ? styles.descriptionCompleted : {})
        }}>
          {task.description}
        </p>
        
        <div style={styles.footer}>
          <span style={styles.date}>
            📅 {formatDate(task.createdAt)}
          </span>
          
          {task.completed && (
            <span style={styles.badge}>✅ Completada</span>
          )}
        </div>
      </div>
      
      {/* BOTONES DE ACCIÓN */}
      <div style={styles.actions}>
        <Link
          to={`/edit/${task.id}`}
          style={styles.btnEdit}
        >
          ✏️
        </Link>
        
        <button
          onClick={handleDelete}
          style={styles.btnDelete}
        >
          🗑️
        </button>
      </div>
    </div>
  )
}

// ============================================
// ESTILOS
// ============================================
const styles = {
  card: {
    display: 'flex',
    gap: '15px',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    transition: 'all 0.3s',
    border: '2px solid transparent'
  },
  cardCompleted: {
    backgroundColor: '#f7fafc',
    opacity: 0.8
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    paddingTop: '3px'
  },
  checkbox: {
    width: '20px',
    height: '20px',
    cursor: 'pointer'
  },
  content: {
    flex: 1
  },
  title: {
    margin: '0 0 10px 0',
    fontSize: '20px',
    color: '#2d3748',
    fontWeight: 'bold' as const
  },
  titleCompleted: {
    textDecoration: 'line-through',
    color: '#a0aec0'
  },
  description: {
    margin: '0 0 15px 0',
    color: '#4a5568',
    fontSize: '15px',
    lineHeight: '1.6'
  },
  descriptionCompleted: {
    textDecoration: 'line-through',
    color: '#cbd5e0'
  },
  footer: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    flexWrap: 'wrap' as const
  },
  date: {
    fontSize: '14px',
    color: '#718096'
  },
  badge: {
    padding: '4px 12px',
    backgroundColor: '#48bb78',
    color: 'white',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: 'bold' as const
  },
  actions: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px'
  },
  btnEdit: {
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#edf2f7',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  },
  btnDelete: {
    width: '40px',
    height: '40px',
    backgroundColor: '#fed7d7',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  }
}

export default TaskItem