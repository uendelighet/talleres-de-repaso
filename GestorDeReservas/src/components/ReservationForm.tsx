import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { createReservation, updateReservation } from '../features/reservationSlice';

export default function ReservationForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const reservations = useSelector((state: RootState) => state.reservations.list);

  const existing = id ? reservations.find((r) => r.id === Number(id)) : null;

  const [form, setForm] = useState({
    cliente: existing?.cliente || '',
    servicio: existing?.servicio || 'hotel',
    fecha: existing?.fecha || '',
    estado: existing?.estado || 'pendiente',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      dispatch(updateReservation({ id: Number(id), ...form }));
    } else {
      dispatch(createReservation(form));
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">{id ? 'Editar Reserva' : 'Nueva Reserva'}</h2>

      <label>Cliente</label>
      <input name="cliente" value={form.cliente} onChange={handleChange} className="border p-2 w-full mb-2" required />

      <label>Servicio</label>
      <select name="servicio" value={form.servicio} onChange={handleChange} className="border p-2 w-full mb-2">
        <option value="hotel">Hotel</option>
        <option value="restaurante">Restaurante</option>
        <option value="cita">Cita</option>
      </select>

      <label>Fecha</label>
      <input type="date" name="fecha" value={form.fecha} onChange={handleChange} className="border p-2 w-full mb-2" required />

      <label>Estado</label>
      <select name="estado" value={form.estado} onChange={handleChange} className="border p-2 w-full mb-4">
        <option value="pendiente">Pendiente</option>
        <option value="confirmada">Confirmada</option>
        <option value="cancelada">Cancelada</option>
      </select>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {id ? 'Actualizar' : 'Guardar'}
      </button>
    </form>
  );
}
