/**
 * ============================================
 * COMPONENTE: FORMULARIO DE TAREA
 * ============================================
 * 
 * Este componente sirve para DOS cosas:
 * 1. CREAR tarea (si NO hay id en la URL)
 * 2. EDITAR tarea (si SÍ hay id en la URL)
 */

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, updateTask } from '../store/taskStore'
import type { RootState, AppDispatch } from '../store/taskStore'

const TaskForm = () => {
  
  // ===== HOOKS DE REACT ROUTER =====
  
  const { id } = useParams()  // Obtener ID de la URL (si existe)
  const navigate = useNavigate()
  
  // ===== HOOKS DE REDUX =====
  
  const dispatch = useDispatch<AppDispatch>()
  const tasks = useSelector((state: RootState) => state.tasks.tasks)
  
  // ===== ESTADO LOCAL DEL FORMULARIO =====
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false
  })
  
  // ===== PRECARGAR DATOS EN MODO EDICIÓN =====
  
  useEffect(() => {
    if (id) {
      // MODO EDICIÓN: Buscar la tarea
      const taskToEdit = tasks.find(task => task.id === parseInt(id))
      
      if (taskToEdit) {
        // Precargar los datos en el formulario
        setFormData({
          title: taskToEdit.title,
          description: taskToEdit.description,
          completed: taskToEdit.completed
        })
      } else {
        // Si no existe, volver a la lista
        navigate('/')
      }
    }
  }, [id, tasks, navigate])
  
  // ===== MANEJAR CAMBIOS EN LOS INPUTS =====
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox'
        ? (e.target as HTMLInputElement).checked  // Para checkbox
        : value                                    // Para text/textarea
    })
  }
  
  // ===== MANEJAR ENVÍO DEL FORMULARIO =====
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()  // Evitar recargar la página
    
    // Validar que el título no esté vacío
    if (formData.title.trim() === '') {
      alert('❌ El título es obligatorio')
      return
    }
    
    if (id) {
      // MODO EDICIÓN
      const taskToEdit = tasks.find(task => task.id === parseInt(id))
      if (taskToEdit) {
        dispatch(updateTask({
          ...taskToEdit,
          title: formData.title,
          description: formData.description,
          completed: formData.completed
        }))
      }
    } else {
      // MODO CREACIÓN
      dispatch(addTask({
        title: formData.title,
        description: formData.description,
        completed: formData.completed
      }))
    }
    
    // Volver a la lista
    navigate('/')
  }
  
  // ===== RENDERIZADO =====
  
  return (
    <div style={styles.container}>
      
      {/* TÍTULO DINÁMICO */}
      <h1 style={styles.title}>
        {id ? '✏️ Editar Tarea' : '➕ Nueva Tarea'}
      </h1>
      
      {/* FORMULARIO */}
      <form onSubmit={handleSubmit} style={styles.form}>
        
        {/* INPUT: TÍTULO */}
        <div style={styles.field}>
          <label style={styles.label}>
            Título de la tarea: *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={styles.input}
            placeholder="Ej: Comprar leche"
            maxLength={100}
          />
          <small style={styles.hint}>
            {formData.title.length}/100 caracteres
          </small>
        </div>
        
        {/* TEXTAREA: DESCRIPCIÓN */}
        <div style={styles.field}>
          <label style={styles.label}>
            Descripción:
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={styles.textarea}
            placeholder="Ej: Ir al supermercado y comprar leche descremada..."
            rows={5}
            maxLength={500}
          />
          <small style={styles.hint}>
            {formData.description.length}/500 caracteres
          </small>
        </div>
        
        {/* CHECKBOX: COMPLETADA (Solo en modo edición) */}
        {id && (
          <div style={styles.checkboxField}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="completed"
                checked={formData.completed}
                onChange={handleChange}
                style={styles.checkboxInput}
              />
              <span>✅ Marcar como completada</span>
            </label>
          </div>
        )}
        
        {/* BOTONES */}
        <div style={styles.buttons}>
          {/* BOTÓN: GUARDAR */}
          <button
            type="submit"
            style={styles.btnSubmit}
          >
            {id ? '💾 Actualizar Tarea' : '➕ Crear Tarea'}
          </button>
          
          {/* BOTÓN: CANCELAR */}
          <button
            type="button"
            onClick={() => navigate('/')}
            style={styles.btnCancel}
          >
            ❌ Cancelar
          </button>
        </div>
      </form>
      
      {/* TIPS */}
      <div style={styles.tips}>
        <h3 style={styles.tipsTitle}>💡 Consejos:</h3>
        <ul style={styles.tipsList}>
          <li>Usa títulos cortos y descriptivos</li>
          <li>Agrega detalles en la descripción si es necesario</li>
          <li>Puedes editar la tarea en cualquier momento</li>
        </ul>
      </div>
    </div>
  )
}

// ============================================
// ESTILOS
// ============================================
const styles = {
  container: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '20px'
  },
  title: {
    textAlign: 'center' as const,
    marginBottom: '30px',
    color: '#2d3748',
    fontSize: '32px'
  },
  form: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    marginBottom: '30px'
  },
  field: {
    marginBottom: '25px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold' as const,
    color: '#2d3748',
    fontSize: '16px'
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    fontSize: '16px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.3s'
  },
  textarea: {
    width: '100%',
    padding: '12px 15px',
    fontSize: '16px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    boxSizing: 'border-box' as const,
    resize: 'vertical' as const,
    fontFamily: 'inherit',
    transition: 'border-color 0.3s'
  },
  hint: {
    display: 'block',
    marginTop: '5px',
    fontSize: '13px',
    color: '#718096'
  },
  checkboxField: {
    marginBottom: '25px',
    padding: '15px',
    backgroundColor: '#f7fafc',
    borderRadius: '8px'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#2d3748'
  },
  checkboxInput: {
    width: '20px',
    height: '20px',
    cursor: 'pointer'
  },
  buttons: {
    display: 'flex',
    gap: '15px',
    marginTop: '30px'
  },
  btnSubmit: {
    flex: 1,
    padding: '14px 24px',
    fontSize: '16px',
    fontWeight: 'bold' as const,
    color: 'white',
    backgroundColor: '#48bb78',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  },
  btnCancel: {
    flex: 1,
    padding: '14px 24px',
    fontSize: '16px',
    fontWeight: 'bold' as const,
    backgroundColor: '#e2e8f0',
    color: '#2d3748',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  },
  tips: {
    backgroundColor: '#fff5f5',
    padding: '20px',
    borderRadius: '12px',
    borderLeft: '4px solid #fc8181'
  },
  tipsTitle: {
    margin: '0 0 15px 0',
    color: '#c53030',
    fontSize: '18px'
  },
  tipsList: {
    margin: 0,
    paddingLeft: '20px',
    color: '#742a2a',
    lineHeight: '1.8'
  }
}

export default TaskForm