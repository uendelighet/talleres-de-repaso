/**
 * ============================================
 * COMPONENTE: LISTA DE PRODUCTOS
 * ============================================
 * 
 * Muestra todos los productos con:
 * - Filtros (todos/stock bajo/stock ok)
 * - Búsqueda
 * - Tarjetas con información
 * - Botones de editar/eliminar
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteProduct, setFilter } from '../store/inventoryStore'
import type { RootState, AppDispatch } from '../store/inventoryStore'
import type { StockFilter } from '../types'
import StockAlerts from './StockAlerts'

const ProductList = () => {
  
  // ===== HOOKS DE REDUX =====
  const dispatch = useDispatch<AppDispatch>()
  const products = useSelector((state: RootState) => state.inventory.products)
  const currentFilter = useSelector((state: RootState) => state.inventory.filter)
  
  // ===== ESTADO LOCAL =====
  const [searchTerm, setSearchTerm] = useState('')
  
  // ===== FILTRAR PRODUCTOS =====
  
  // Primero filtrar por búsqueda
  let filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  // Luego aplicar filtro de stock
  if (currentFilter === 'low') {
    filteredProducts = filteredProducts.filter(p => p.quantity < p.minStock)
  } else if (currentFilter === 'ok') {
    filteredProducts = filteredProducts.filter(p => p.quantity >= p.minStock)
  }
  
  // ===== MANEJAR ELIMINACIÓN =====
  const handleDelete = (id: number, name: string) => {
    if (confirm(`¿Eliminar "${name}" del inventario?`)) {
      dispatch(deleteProduct(id))
    }
  }
  
  // ===== MANEJAR CAMBIO DE FILTRO =====
  const handleFilterChange = (filter: StockFilter) => {
    dispatch(setFilter(filter))
  }
  
  // ===== CONTADORES =====
  const totalProducts = products.length
  const lowStockCount = products.filter(p => p.quantity < p.minStock).length
  const okStockCount = products.filter(p => p.quantity >= p.minStock).length
  
  // ===== FORMATEAR PRECIO =====
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price)
  }
  
  // ===== RENDERIZADO =====
  return (
    <div style={styles.container}>
      
      {/* ALERTAS DE STOCK BAJO */}
      <StockAlerts />
      
      {/* ENCABEZADO */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>📦 Inventario de Productos</h1>
          <p style={styles.subtitle}>
            Total: {totalProducts} | Stock bajo: {lowStockCount} | Stock OK: {okStockCount}
          </p>
        </div>
        <Link to="/create" style={styles.btnCreate}>
          ➕ Agregar Producto
        </Link>
      </div>
      
      {/* BARRA DE BÚSQUEDA */}
      <div style={styles.searchBox}>
        <span style={styles.searchIcon}>🔍</span>
        <input
          type="text"
          placeholder="Buscar por nombre, proveedor o categoría..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>
      
      {/* FILTROS */}
      <div style={styles.filters}>
        <button
          onClick={() => handleFilterChange('all')}
          style={{
            ...styles.filterBtn,
            ...(currentFilter === 'all' ? styles.filterBtnActive : {})
          }}
        >
          📋 Todos ({totalProducts})
        </button>
        
        <button
          onClick={() => handleFilterChange('low')}
          style={{
            ...styles.filterBtn,
            ...(currentFilter === 'low' ? styles.filterBtnDanger : {})
          }}
        >
          ⚠️ Stock Bajo ({lowStockCount})
        </button>
        
        <button
          onClick={() => handleFilterChange('ok')}
          style={{
            ...styles.filterBtn,
            ...(currentFilter === 'ok' ? styles.filterBtnSuccess : {})
          }}
        >
          ✅ Stock OK ({okStockCount})
        </button>
      </div>
      
      {/* LISTA DE PRODUCTOS */}
      {filteredProducts.length === 0 ? (
        <div style={styles.empty}>
          <p style={styles.emptyText}>
            {searchTerm ? '🔍 No se encontraron productos' : '📦 No hay productos en el inventario'}
          </p>
        </div>
      ) : (
        <div style={styles.grid}>
          {filteredProducts.map(product => (
            <div
              key={product.id}
              style={{
                ...styles.card,
                borderLeft: product.quantity < product.minStock
                  ? '4px solid #e53e3e'
                  : '4px solid #48bb78'
              }}
            >
              {/* HEADER DE LA TARJETA */}
              <div style={styles.cardHeader}>
                <span style={styles.category}>{product.category}</span>
                {product.quantity < product.minStock && (
                  <span style={styles.badgeDanger}>⚠️ Stock Bajo</span>
                )}
              </div>
              
              {/* NOMBRE */}
              <h3 style={styles.productName}>{product.name}</h3>
              
              {/* INFORMACIÓN */}
              <div style={styles.infoGrid}>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Cantidad:</span>
                  <span style={{
                    ...styles.infoValue,
                    color: product.quantity < product.minStock ? '#e53e3e' : '#48bb78',
                    fontWeight: 'bold'
                  }}>
                    {product.quantity} unidades
                  </span>
                </div>
                
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Stock Mínimo:</span>
                  <span style={styles.infoValue}>{product.minStock}</span>
                </div>
                
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Proveedor:</span>
                  <span style={styles.infoValue}>{product.supplier}</span>
                </div>
                
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Precio:</span>
                  <span style={styles.priceValue}>
                    {formatPrice(product.price)}
                  </span>
                </div>
              </div>
              
              {/* BOTONES DE ACCIÓN */}
              <div style={styles.actions}>
                <Link
                  to={`/edit/${product.id}`}
                  style={styles.btnEdit}
                >
                  ✏️ Editar
                </Link>
                <button
                  onClick={() => handleDelete(product.id, product.name)}
                  style={styles.btnDelete}
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
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
    maxWidth: '1400px',
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
    margin: '0 0 8px 0',
    color: '#2d3748',
    fontSize: '32px'
  },
  subtitle: {
    margin: 0,
    color: '#718096',
    fontSize: '16px'
  },
  btnCreate: {
    padding: '14px 28px',
    backgroundColor: '#48bb78',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: 'bold' as const,
    fontSize: '16px',
    display: 'inline-block'
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  searchIcon: {
    fontSize: '20px'
  },
  searchInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '16px',
    color: '#2d3748'
  },
  filters: {
    display: 'flex',
    gap: '12px',
    marginBottom: '30px',
    flexWrap: 'wrap' as const
  },
  filterBtn: {
    padding: '12px 24px',
    border: '2px solid #e2e8f0',
    backgroundColor: 'white',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600' as const,
    color: '#4a5568'
  },
  filterBtnActive: {
    backgroundColor: '#4299e1',
    color: 'white',
    borderColor: '#4299e1'
  },
  filterBtnDanger: {
    backgroundColor: '#e53e3e',
    color: 'white',
    borderColor: '#e53e3e'
  },
  filterBtnSuccess: {
    backgroundColor: '#48bb78',
    color: 'white',
    borderColor: '#48bb78'
  },
  empty: {
    textAlign: 'center' as const,
    padding: '80px 20px',
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
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '24px'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  category: {
    padding: '4px 12px',
    backgroundColor: '#edf2f7',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: 'bold' as const,
    color: '#4a5568'
  },
  badgeDanger: {
    padding: '4px 12px',
    backgroundColor: '#fed7d7',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: 'bold' as const,
    color: '#c53030'
  },
  productName: {
    margin: '0 0 20px 0',
    fontSize: '20px',
    color: '#2d3748',
    fontWeight: 'bold' as const
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '20px'
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px'
  },
  infoLabel: {
    fontSize: '12px',
    color: '#718096',
    textTransform: 'uppercase' as const,
    fontWeight: '600' as const
  },
  infoValue: {
    fontSize: '16px',
    color: '#2d3748'
  },
  priceValue: {
    fontSize: '18px',
    fontWeight: 'bold' as const,
    color: '#48bb78'
  },
  actions: {
    display: 'flex',
    gap: '12px'
  },
  btnEdit: {
    flex: 1,
    padding: '12px',
    backgroundColor: '#4299e1',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '6px',
    textAlign: 'center' as const,
    fontWeight: 'bold' as const,
    fontSize: '15px'
  },
  btnDelete: {
    flex: 1,
    padding: '12px',
    backgroundColor: '#f56565',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold' as const,
    fontSize: '15px'
  }
}

export default ProductList