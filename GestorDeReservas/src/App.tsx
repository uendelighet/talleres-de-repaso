import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ReservationList from './components/ReservationList';
import ReservationForm from './components/ReservationForm';

export default function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 bg-gray-800 text-white">
        <Link to="/" className="mr-4">Reservas</Link>
        <Link to="/create">Nueva Reserva</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ReservationList />} />
        <Route path="/create" element={<ReservationForm />} />
        <Route path="/edit/:id" element={<ReservationForm />} />
      </Routes>
    </BrowserRouter>
  );
}
