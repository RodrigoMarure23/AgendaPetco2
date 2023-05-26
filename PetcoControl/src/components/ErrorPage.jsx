import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../styles/index.css"
const ErrorPage = () => {
  const navigate=useNavigate()
  return (
    <div className='contenedorPrincipal'>
        <h1>Error</h1>
        <div>Not Found</div>
        <button className='btn gris' onClick={()=>navigate("/")}>Ir a pagina Principal</button>
    </div>
    

  )
}

export default ErrorPage