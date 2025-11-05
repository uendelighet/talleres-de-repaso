import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createItem, updateItem } from './store'
import type { AppDispatch } from './store'
import type { Entity } from './types'

interface Props { existingItem?: Entity }

export default function Form({ existingItem }: Props) {
  const dispatch = useDispatch<AppDispatch>()
  const [name, setName] = useState(existingItem?.name || '')

  const handleSubmit = () => {
    if (existingItem) {
      dispatch(updateItem({ ...existingItem, name }))
    } else {
      dispatch(createItem({ name }))
    }
    setName('')
  }

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Nombre" />
      <button onClick={handleSubmit}>{existingItem ? 'Actualizar' : 'Crear'}</button>
    </div>
  )
}
