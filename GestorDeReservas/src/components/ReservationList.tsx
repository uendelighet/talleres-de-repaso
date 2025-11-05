import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchReservations, deleteReservation } from '../features/reservationSlice';
import { Link } from 'react-router-dom';

export default function ReservationList() {
  const dispatch = useDispatch<AppDispatch>();
  const { list, status } = useSelector((state: RootState) => state.reservations);

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestor de Reservas</h1>
      <Link to="/create" className="bg-blue-500 text-white px-3 py-1 rounded">Nueva Reserva</Link>

      {status === 'loading' && <p>Cargando...</p>}
      <ul className="mt-4">
        {list.map((res) => (
          <li key={res.id} className="border p-3 mb-2 flex justify-between">
            <div>
              <p><strong>Cliente:</strong> {res.cliente}</p>
              <p><strong>Servicio:</strong> {res.servicio}</p>
              <p><strong>Fecha:</strong> {res.fecha}</p>
              <p><strong>Estado:</strong> {res.estado}</p>
            </div>
            <div>
              <Link to={`/edit/${res.id}`} className="bg-green-500 text-white px-2 py-1 mr-2 rounded">Editar</Link>
              <button onClick={() => dispatch(deleteReservation(res.id))} className="bg-red-500 text-white px-2 py-1 rounded">
                Cancelar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
