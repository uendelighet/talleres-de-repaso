// src/components/UserForm.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { createTask, updateTask } from '../features/userSlice';
import { Task } from '../types';

export default function UserForm() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const tasks = useAppSelector((state) => state.users.list);

  const existingTask = tasks.find((t) => t.id === Number(id));

  const [formData, setFormData] = useState<Omit<Task, 'id'>>({
    title: '',
    description: '',
    status: 'pendiente',
  });

  useEffect(() => {
    if (existingTask) {
      const { id: _, ...rest } = existingTask; // omitimos id
      setFormData(rest);
    }
  }, [existingTask]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    } as any);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (id && existingTask) {
        const updatedTask: Task = { id: Number(id), ...formData };
        const result = await dispatch(updateTask(updatedTask)).unwrap();
        if (result) {
          navigate('/');
        }
      } else {
        const result = await dispatch(createTask(formData)).unwrap();
        if (result) {
          navigate('/');
        }
      }
    } catch (error) {
      // En caso de error, mostrar mensaje pero no navegar
      alert('Ha ocurrido un error: ' + (error as Error).message);
    }
  };


  return (
    <div>
      <h2>{id ? 'Editar Tarea' : 'Crear Tarea'}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '480px' }}>
        <input type="text" name="title" placeholder="Título" value={formData.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} rows={4} />
        <label>
          Estado:
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="pendiente">Pendiente</option>
            <option value="completada">Completada</option>
          </select>
        </label>

        <button type="submit">{id ? 'Actualizar' : 'Crear'}</button>
      </form>
    </div>
  );
}
