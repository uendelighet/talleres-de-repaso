/**
 * ============================================
 * COMPONENTE PRINCIPAL - APP
 * ============================================
 */

import { Routes, Route, Link } from 'react-router-dom'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'
import Dashboard from './components/Dashboard'
import StockAlert from './components/StockAlert'

function App() {
  return (
    <div style={styles.app}>
      
      {/* ========================================== */}
      {/* BARRA DE NAVEGACIÓN */}
      {/* ========================================== */}
      <nav style={styles.nav}>
        <div style={styles.navContent}>
          <h2 style={styles.logo}>📦 Sistema de Inventario</h2>
          <div style={styles.links}>
            <Link to="/" style={styles.link}>
              📊 Dashboard
            </Link>
            <Link to="/products" style={styles.link}>
              📦 Productos
            </Link>
            <Link to="/add" style={styles.link}>
              ➕ Agregar Producto
            </Link>
          </div>
        </div>
      </nav>
      
      {/* ALERTAS DE STOCK BAJO (siempre visible) */}
      <StockAlert />
      
      {/* ========================================== */}
      {/* CONTENIDO (según la ruta) */}
      {/* ========================================== */}
      <main style={styles.main}>
        <Routes>
          {/* Ruta 1: Dashboard (/) */}
          <Route path="/" element={<Dashboard />} />
          
          {/* Ruta 2: Lista de productos (/products) */}
          <Route path="/products" element={<ProductList />} />
          
          {/* Ruta 3: Agregar producto (/add) */}
          <Route path="/add" element={<ProductForm />} />
          
          {/* Ruta 4: Editar producto (/edit/:id) */}
          <Route path="/edit/:id" element={<ProductForm />} />
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
    backgroundColor: '#f7fafc'
  },
  nav: {
    backgroundColor: '#2d3748',
    color: 'white',
    padding: '15px 0',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    marginBottom: '0'
  },
  navContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    gap: '20px'
  },
  logo: {
    margin: 0,
    fontSize: '26px'
  },
  links: {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap' as const
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    padding: '10px 20px',
    backgroundColor: '#4a5568',
    borderRadius: '6px',
    fontWeight: 'bold' as const,
    fontSize: '15px'
  },
  main: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '20px'
  }
}

export default App