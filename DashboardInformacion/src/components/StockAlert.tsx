/**
 * ============================================
 * COMPONENTE: ALERTAS DE STOCK BAJO
 * ============================================
 * 
 * Muestra una barra de alertas cuando hay productos
 * con stock bajo o sin stock
 */

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { 
  selectLowStockProducts, 
  selectOutOfStockProducts 
} from '../store/inventoryStore'
import type { RootState } from '../store/inventoryStore'

const StockAlert = () => {
  
  // Obtener productos con problemas de stock
  const lowStockProducts = useSelector(selectLowStockProducts)
  const outOfStockProducts = useSelector(selectOutOfStockProducts)
  
  // Si no hay alertas, no mostrar nada
  if (lowStockProducts.length === 0 && outOfStockProducts.length === 0) {
    return null
  }
  
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        
        {/* ALERTAS DE STOCK BAJO */}
        {lowStockProducts.length > 0 && (
          <div style={styles.alert}>
            <div style={styles.alertIcon}>⚠️</div>
            <div style={styles.alertContent}>
              <strong style={styles.alertTitle}>
                {lowStockProducts.length} producto{lowStockProducts.length > 1 ? 's' : ''} con stock bajo
              </strong>
              <p style={styles.alertText}>
                {lowStockProducts.map(p => p.name).join(', ')}
              </p>
            </div>
            <Link to="/products?filter=low-stock" style={styles.alertButton}>
              Ver productos
            </Link>
          </div>
        )}
        
        {/* ALERTAS DE SIN STOCK */}
        {outOfStockProducts.length > 0 && (
          <div style={{...styles.alert, ...styles.alertDanger}}>
            <div style={styles.alertIcon}>🚫</div>
            <div style={styles.alertContent}>
              <strong style={styles.alertTitle}>
                {outOfStockProducts.length} producto{outOfStockProducts.length > 1 ? 's' : ''} sin stock
              </strong>
              <p style={styles.alertText}>
                {outOfStockProducts.map(p => p.name).join(', ')}
              </p>
            </div>
            <Link 
              to="/products?filter=out-of-stock" 
              style={{...styles.alertButton, ...styles.alertButtonDanger}}
            >
              Ver productos
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================
// ESTILOS
// ============================================
const styles = {
  container: {
    backgroundColor: '#fff5f5',
    borderBottom: '2px solid #fc8181',
    padding: '15px 0'
  },
  content: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '15px'
  },
  alert: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px 20px',
    backgroundColor: '#fef5e7',
    borderLeft: '4px solid #f39c12',
    borderRadius: '8px',
    flexWrap: 'wrap' as const
  },
  alertDanger: {
    backgroundColor: '#fee',
    borderLeftColor: '#e53e3e'
  },
  alertIcon: {
    fontSize: '28px'
  },
  alertContent: {
    flex: 1,
    minWidth: '200px'
  },
  alertTitle: {
    display: 'block',
    marginBottom: '5px',
    color: '#742a2a',
    fontSize: '16px'
  },
  alertText: {
    margin: 0,
    color: '#975a16',
    fontSize: '14px'
  },
  alertButton: {
    padding: '8px 16px',
    backgroundColor: '#f39c12',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '6px',
    fontWeight: 'bold' as const,
    fontSize: '14px'
  },
  alertButtonDanger: {
    backgroundColor: '#e53e3e'
  }
}

export default StockAlert