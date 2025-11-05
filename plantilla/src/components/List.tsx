import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItems, deleteItem } from './store'
import type { RootState, AppDispatch } from './store'

export default function List() {
  const dispatch = useDispatch<AppDispatch>()
  const { items, loading, error } = useSelector((state: RootState) => state.entity)

  useEffect(() => { dispatch(fetchItems()) }, [dispatch])

  if (loading) return <p>Cargando...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h1>Items</h1>
      {items.map(item => (
        <div key={item.id}>
          <p>{item.name}</p>
          {/* 🔹 CAMBIA campos mostrados */}
          <button onClick={() => dispatch(deleteItem(item.id))}>Eliminar</button>
        </div>
      ))}
    </div>
  )
}
