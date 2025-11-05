import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import AccountList from './components/AccountList';
import AccountForm from './components/AccountForm';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/usuarios" element={<UserList />} />
        <Route path="/usuarios/create" element={<UserForm />} />
        <Route path="/usuarios/edit/:id" element={<UserForm />} />
        <Route path="/cuentas" element={<AccountList />} />
        <Route path="/cuentas/create" element={<AccountForm />} />
        <Route path="/cuentas/edit/:id" element={<AccountForm />} />
      </Routes>
    </Router>
  );
}

export default App;
