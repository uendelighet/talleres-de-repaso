// src/components/UserForm.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { createUser, updateUser, fetchUsers } from '../features/userSlice';
import { User } from '../types';

export default function UserForm() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const users = useAppSelector((state) => state.users.list);

  const existingUser = users.find((u) => u.id === Number(id));

  const [formData, setFormData] = useState<Omit<User, 'id'>>({
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
  });

  useEffect(() => {
    if (existingUser) {
      const { id: _, ...rest } = existingUser; // omitimos id
      setFormData(rest);
    }
  }, [existingUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (id && existingUser) {
    const updatedUser: User = { id: Number(id), ...formData };
    await dispatch(updateUser(updatedUser));
    alert('Usuario actualizado correctamente');
  } else {
    await dispatch(createUser(formData));
    alert('Usuario creado correctamente');
  }

  navigate('/');
};


  return (
    <div>
      <h2>{id ? 'Editar Usuario' : 'Crear Usuario'}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '400px' }}>
        <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required />
        <input type="text" name="username" placeholder="Usuario" value={formData.username} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Correo" value={formData.email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Teléfono" value={formData.phone} onChange={handleChange} required />
        <input type="text" name="website" placeholder="Sitio Web" value={formData.website} onChange={handleChange} required />

        <button type="submit">{id ? 'Actualizar' : 'Crear'}</button>
      </form>
    </div>
  );
}