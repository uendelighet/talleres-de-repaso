/**
 * ============================================
 * COMPONENTE: ALERTAS DE STOCK BAJO
 * ============================================
 * 
 * Muestra notificaciones cuando productos
 * tienen stock por debajo del mínimo
 */

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import type { RootState } from '../store/inventoryStore'

const StockAlerts = () => {
  const navigate = useNavigate()
  
  // Obtener productos del store
  const products = useSelector((state: RootState) => state.inventory.products)
  
  // Filtrar productos con stock bajo
  const lowStockProducts = products.filter(p => p.quantity < p.minStock)
  
  // Si no hay alertas, no mostrar nada
  if (lowStockProducts.length === 0) {
    return null
  }
  
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.icon}>⚠️</span>
        <h3 style={styles.title}>
          Alertas de Stock Bajo ({lowStockProducts.length})
        </h3>
      </div>
      
      <div style={styles.list}>
        {lowStockProducts.map(product => (
          <div key={product.id} style={styles.alert}>
            <div style={styles.info}>
              <strong style={styles.productName}>{product.name}</strong>
              <p style={styles.details}>
                Stock actual: <span style={styles.danger}>{product.quantity}</span> | 
                Mínimo: {product.minStock}
              </p>
            </div>
            <button
              onClick={() => navigate(`/edit/${product.id}`)}
              style={styles.btn}
            >
              Actualizar Stock
            </button>
          </div>
        ))}
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
    border: '2px solid #fc8181',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '30px',
    boxShadow: '0 2px 8px rgba(252, 129, 129, 0.2)'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px'
  },
  icon: {
    fontSize: '28px'
  },
  title: {
    margin: 0,
    color: '#c53030',
    fontSize: '22px'
  },
  list: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px'
  },
  alert: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    backgroundColor: 'white',
    borderRadius: '8px',
    gap: '15px',
    flexWrap: 'wrap' as const
  },
  info: {
    flex: 1,
    minWidth: '200px'
  },
  productName: {
    fontSize: '16px',
    color: '#2d3748',
    display: 'block',
    marginBottom: '5px'
  },
  details: {
    margin: 0,
    fontSize: '14px',
    color: '#742a2a'
  },
  danger: {
    color: '#e53e3e',
    fontWeight: 'bold' as const
  },
  btn: {
    padding: '10px 20px',
    backgroundColor: '#48bb78',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold' as const,
    fontSize: '14px',
    whiteSpace: 'nowrap' as const
  }
}

export default StockAlerts