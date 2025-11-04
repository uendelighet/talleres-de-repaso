/**
 * ============================================
 * COMPONENTE PRINCIPAL - APP
 * ============================================
 * 
 * Este componente define:
 * 1. La navegación (menú superior)
 * 2. Las rutas (qué mostrar en cada URL)
 */

import { Routes, Route, Link } from 'react-router-dom'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'

function App() {
  return (
    <div style={styles.app}>
      
      {/* ========================================== */}
      {/* BARRA DE NAVEGACIÓN */}
      {/* ========================================== */}
      <nav style={styles.nav}>
        <div style={styles.navContent}>
          <h2 style={styles.logo}>📝 Mis Tareas</h2>
          <div style={styles.links}>
            {/* Link: Cambia de página SIN recargar */}
            <Link to="/" style={styles.link}>
              🏠 Ver Tareas
            </Link>
            <Link to="/create" style={styles.link}>
              ➕ Nueva Tarea
            </Link>
          </div>
        </div>
      </nav>
      
      {/* ========================================== */}
      {/* CONTENIDO (según la ruta) */}
      {/* ========================================== */}
      <main style={styles.main}>
        <Routes>
          {/* Ruta 1: Lista de tareas (/) */}
          <Route path="/" element={<TaskList />} />
          
          {/* Ruta 2: Crear tarea (/create) */}
          <Route path="/create" element={<TaskForm />} />
          
          {/* Ruta 3: Editar tarea (/edit/123) */}
          <Route path="/edit/:id" element={<TaskForm />} />
        </Routes>
      </main>
    </div>
  )
}

// ============================================
// ESTILOS
// ============================================
const styles = {
  app: {
    minHeight: '100vh',
    backgroundColor: '#f0f2f5'
  },
  nav: {
    backgroundColor: '#4a5568',
    color: 'white',
    padding: '15px 0',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '30px'
  },
  navContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    gap: '15px'
  },
  logo: {
    margin: 0,
    fontSize: '26px'
  },
  links: {
    display: 'flex',
    gap: '15px'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    padding: '10px 20px',
    backgroundColor: '#718096',
    borderRadius: '6px',
    fontWeight: 'bold' as const,
    transition: 'background-color 0.3s'
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  }
}

export default App