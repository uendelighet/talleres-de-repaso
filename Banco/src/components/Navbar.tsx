import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-blue-700 text-white p-4 flex gap-6">
    <Link to="/usuarios">Clientes</Link>
    <Link to="/cuentas">Cuentas</Link>
  </nav>
);

export default Navbar;
