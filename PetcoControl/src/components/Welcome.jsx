import React, { useState } from 'react';
import '../styles/index.css';

const Welcome = () => {
  const [numeroEmpleado,setNumeroEmpleado]=useState()
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
              setNumeroEmpleado(e.target.value)
            }}  type="text" className='inputWelcome' placeholder='Escribe tu numero de empleado'/>
            <button className='btnWelcome '>Ingresar</button>
        </div>
      </div>
    </div>

    </div>
    
  );
};

export default Welcome;