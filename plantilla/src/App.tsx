import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import List from './List'
import Form from './Form'

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Lista</Link>
        <Link to="/create">Crear</Link>
      </nav>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/create" element={<Form />} />
        <Route path="/edit/:id" element={<Form />} />
      </Routes>
    </BrowserRouter>
  )
}
