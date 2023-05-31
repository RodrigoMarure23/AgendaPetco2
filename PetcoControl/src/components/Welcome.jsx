import React, { useEffect, useState } from 'react';
import '../styles/index.css';
import axios from "axios"
import Swal from "sweetalert2"
import { useAuthContext } from '../context/AuthContext';

const Welcome = () => {
 
  const {loginAuth,numeroEmpleado,setNumeroEmpleado}=useAuthContext()
  const [num,setNum]=useState("2")
  const [codigoAcceso,setCodigoAcceso]=useState("05430197")
  const [notificacion,setNotificacion]=useState("")
  // const codigoAccesoRecibido=loginAuth(numeroEmpleado,notificacion)
  return (
    <div>
        <div className="contenedorPrincipal3 component-container">
      <div className="headerw">
        <img className='imageen' src="../src/assets/logoPetco1.png" alt="logodePetcpo" height={"45px"}/>
      </div>
      <div className="content">
        <div className="content">
            <h1>Bienvenido</h1>
        </div>
        <div className='input-container' style={{display:"grid"}} >
            <label className='labelWelcome'>No. de Empleado</label>
            <input onChange={(e)=>{
              e.preventDefault()
              setNum(e.target.value)
            }}  type="text" className='inputWelcome' placeholder='Escribe tu numero de empleado'/>
            <button onClick={(e)=>{
                e.preventDefault()
                setNumeroEmpleado(num)
                isNaN(num)?
                  Swal.fire('Error!',
                  'Ingresa un numero de empleado valido',
                  'error'):
                  console.log("si es")
                  loginAuth(numeroEmpleado,"1")
            }} className='btnWelcome '>Ingresar</button>
        </div>
      </div>
    </div>

    </div>
    
  );
};

export default Welcome;