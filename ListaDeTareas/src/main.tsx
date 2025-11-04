/**
 * ============================================
 * MAIN.TSX - Punto de entrada
 * ============================================
 * 
 * Este es el PRIMER archivo que se ejecuta.
 * Aquí conectamos Redux y React Router.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/taskStore'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Provider: Hace que Redux esté disponible en TODA la app */}
    <Provider store={store}>
      {/* BrowserRouter: Permite usar rutas (/create, /edit/123) */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)