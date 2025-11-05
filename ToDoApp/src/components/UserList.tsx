// src/components/UserList.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchTasks, deleteTask, updateTask } from '../features/userSlice';

export default function UserList() {
  const dispatch = useAppDispatch();
  const { list, status, error } = useAppSelector((state) => state.users);
  const [filter, setFilter] = useState<'all' | 'pendiente' | 'completada'>('all');

 
useEffect(() => {
  if (list.length === 0) dispatch(fetchTasks());
}, [dispatch, list.length]);


  const handleDelete = (id: number) => {
    if (window.confirm('¿Seguro que deseas eliminar esta tarea?')) {
      dispatch(deleteTask(id));
    }
  };

  const handleToggle = (task: any) => {
    const updated = { ...task, status: task.status === 'pendiente' ? 'completada' : 'pendiente' };
    dispatch(updateTask(updated));
  };

  if (status === 'loading') return <p>Cargando usuarios...</p>;
  if (status === 'failed') return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div>
      <h2>Lista de Tareas</h2>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
        <Link to="/create">
          <button>+ Crear nueva tarea</button>
        </Link>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button onClick={() => setFilter('all')} disabled={filter === 'all'}>Todas</button>
          <button onClick={() => setFilter('pendiente')} disabled={filter === 'pendiente'}>Pendientes</button>
          <button onClick={() => setFilter('completada')} disabled={filter === 'completada'}>Completadas</button>
        </div>
      </div>

      <table border={1} cellPadding={8} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f5f5f5' }}>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Estatus</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {list.length > 0 ? (
            list
              .filter((t) => (filter === 'all' ? true : t.status === filter))
              .map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td style={{ textTransform: 'capitalize' }}>{task.status}</td>
                  <td>
                    <button onClick={() => handleToggle(task)}>
                      {task.status === 'pendiente' ? 'Marcar completada' : 'Marcar pendiente'}
                    </button>
                    <Link to={`/edit/${task.id}`}>
                      <button style={{ marginLeft: 8 }}>Editar</button>
                    </Link>
                    <button onClick={() => handleDelete(task.id)} style={{ marginLeft: 8 }}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan={4} align="center">No hay tareas para mostrar</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
