// src/components/UserList.tsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchUsers, deleteUser } from '../features/userSlice';

export default function UserList() {
  const dispatch = useAppDispatch();
  const { list, status, error } = useAppSelector((state) => state.users);

 
useEffect(() => {
  if (list.length === 0) {
    dispatch(fetchUsers());
  }
}, [dispatch, list.length]);


  const handleDelete = (id: number) => {
    if (window.confirm('¿Seguro que deseas eliminar este usuario?')) {
      dispatch(deleteUser(id));
    }
  };

  if (status === 'loading') return <p>Cargando usuarios...</p>;
  if (status === 'failed') return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <Link to="/create">
        <button style={{ marginBottom: '12px' }}>+ Crear nuevo usuario</button>
      </Link>

      <table border={1} cellPadding={8} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f5f5f5' }}>
            <th>Nombre</th>
            <th>Usuario</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Website</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {list.length > 0 ? (
            list.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.website}</td>
                <td>
                  <Link to={`/edit/${user.id}`}>
                    <button>Editar</button>
                  </Link>
                  <button onClick={() => handleDelete(user.id)} style={{ marginLeft: 8 }}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} align="center">No hay usuarios para mostrar</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}