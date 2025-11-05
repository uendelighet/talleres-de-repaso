// src/App.tsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

export default function App() {
  return (
    <div className="app-container">
      <nav style={{ padding: '1rem', borderBottom: '1px solid #eee', visibility: 'hidden' }}>
        <Link to="/" style={{ marginRight: 12 }}>Usuarios</Link>
        <Link to="/create">Crear usuario</Link>
      </nav>

      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/create" element={<UserForm />} />
          <Route path="/edit/:id" element={<UserForm />} />
        </Routes>
      </main>
    </div>
  );
}
