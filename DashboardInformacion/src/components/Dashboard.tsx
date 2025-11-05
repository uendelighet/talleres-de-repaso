/**
 * ============================================
 * COMPONENTE: DASHBOARD
 * ============================================
 * 
 * Muestra estadísticas generales del inventario
 */

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectInventoryStats } from '../store/inventoryStore'

const Dashboard = () => {
  
  // Obtener estadísticas calculadas
  const stats = useSelector(selectInventoryStats)
  
  // Formatear precio
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price)
  }
  
  return (
    <div style={styles.container}>
      
      {/* TÍTULO */}
      <div style={styles.header}>
        <h1 style={styles.title}>📊 Dashboard de Inventario</h1>
        <p style={styles.subtitle}>
          Vista general del estado actual de tu inventario
        </p>
      </div>
      
      {/* TARJETAS DE ESTADÍSTICAS */}
      <div style={styles.grid}>
        
        {/* TOTAL DE PRODUCTOS */}
        <div style={styles.card}>
          <div style={styles.cardIcon}>📦</div>
          <div style={styles.cardContent}>
            <h3 style={styles.cardTitle}>Total de Productos</h3>
            <p style={styles.cardValue}>{stats.totalProducts}</p>
            <p style={styles.cardSubtext}>productos registrados</p>
          </div>
        </div>
        
        {/* VALOR TOTAL */}
        <div style={styles.card}>
          <div style={{...styles.cardIcon, color: '#48bb78'}}>💰</div>
          <div style={styles.cardContent}>
            <h3 style={styles.cardTitle}>Valor Total</h3>
            <p style={styles.cardValue}>{formatPrice(stats.totalValue)}</p>
            <p style={styles.cardSubtext}>valor del inventario</p>
          </div>
        </div>
        
        {/* CANTIDAD TOTAL */}
        <div style={styles.card}>
          <div style={{...styles.cardIcon, color: '#4299e1'}}>📈</div>
          <div style={styles.cardContent}>
            <h3 style={styles.cardTitle}>Items en Stock</h3>
            <p style={styles.cardValue}>{stats.totalQuantity}</p>
            <p style={styles.cardSubtext}>unidades totales</p>
          </div>
        </div>
        
        {/* STOCK BAJO */}
        <div style={styles.card}>
          <div style={{...styles.cardIcon, color: '#ed8936'}}>⚠️</div>
          <div style={styles.cardContent}>
            <h3 style={styles.cardTitle}>Stock Bajo</h3>
            <p style={styles.cardValue}>{stats.lowStockItems}</p>
            <p style={styles.cardSubtext}>requieren atención</p>
          </div>
        </div>
        
        {/* SIN STOCK */}
        <div style={styles.card}>
          <div style={{...styles.cardIcon, color: '#f56565'}}>🚫</div>
          <div style={styles.cardContent}>
            <h3 style={styles.cardTitle}>Sin Stock</h3>
            <p style={styles.cardValue}>{stats.outOfStockItems}</p>
            <p style={styles.cardSubtext}>productos agotados</p>
          </div>
        </div>
        
        {/* PROMEDIO DE PRECIO */}
        <div style={styles.card}>
          <div style={{...styles.cardIcon, color: '#9f7aea'}}>🏷️</div>
          <div style={styles.cardContent}>
            <h3 style={styles.cardTitle}>Precio Promedio</h3>
            <p style={styles.cardValue}>
              {stats.totalProducts > 0 
                ? formatPrice(stats.totalValue / stats.totalQuantity || 0)
                : '$0'}
            </p>
            <p style={styles.cardSubtext}>por unidad</p>
          </div>
        </div>
      </div>
      
      {/* ACCIONES RÁPIDAS */}
      <div style={styles.actions}>
        <h2 style={styles.actionsTitle}>⚡ Acciones Rápidas</h2>
        <div style={styles.actionsGrid}>
          <Link to="/add" style={styles.actionButton}>
            <span style={styles.actionIcon}>➕</span>
            <span>Agregar Producto</span>
          </Link>
          
          <Link to="/products" style={styles.actionButton}>
            <span style={styles.actionIcon}>📦</span>
            <span>Ver Inventario</span>
          </Link>
          
          <Link to="/products?filter=low-stock" style={styles.actionButton}>
            <span style={styles.actionIcon}>⚠️</span>
            <span>Stock Bajo</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

// ============================================
// ESTILOS
// ============================================
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '30px 20px'
  },
  header: {
    marginBottom: '40px'
  },
  title: {
    margin: '0 0 10px 0',
    color: '#2d3748',
    fontSize: '36px'
  },
  subtitle: {
    margin: 0,
    color: '#718096',
    fontSize: '18px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '50px'
  },
  card: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    gap: '15px',
    alignItems: 'flex-start',
    transition: 'transform 0.3s, box-shadow 0.3s'
  },
  cardIcon: {
    fontSize: '40px',
    color: '#4a5568'
  },
  cardContent: {
    flex: 1
  },
  cardTitle: {
    margin: '0 0 10px 0',
    color: '#4a5568',
    fontSize: '14px',
    fontWeight: '600' as const,
    textTransform: 'uppercase' as const
  },
  cardValue: {
    margin: '0 0 5px 0',
    color: '#2d3748',
    fontSize: '32px',
    fontWeight: 'bold' as const
  },
  cardSubtext: {
    margin: 0,
    color: '#a0aec0',
    fontSize: '13px'
  },
  actions: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  actionsTitle: {
    margin: '0 0 20px 0',
    color: '#2d3748',
    fontSize: '24px'
  },
  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px'
  },
  actionButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '15px 20px',