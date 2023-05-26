import React from 'react'
import ReactDOM from 'react-dom/client'
import Paths from "../src/routes/Routes"
import { ShopProvider } from './context/ShopContext'
import { AuthProvider } from './context/AuthContext'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ShopProvider>
        <Paths />
      </ShopProvider>
    </AuthProvider>
  </React.StrictMode>,
)
