import React from 'react'
import ReactDOM from 'react-dom/client'
import Paths from "../src/routes/Routes"
import { AuthProvider } from './context/AuthContext'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      
        <Paths />
     
    </AuthProvider>
  </React.StrictMode>,
)