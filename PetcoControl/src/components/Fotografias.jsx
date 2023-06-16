import React, { useEffect, useState } from 'react'
import NewPhoto from './NewPhoto'
import "../styles/index.css"
import { useShopContext } from '../context/ShopContext'
const Fotografias = () => {
  
  const {empleados,setEmpleados}=useShopContext()
  const [nombre2,setNombre2]=useState(null)
  const [i,setI]=useState(0)
  const [mostrarNewFoto,setMostrarNewFoto]=useState(false)
  useEffect(()=>{
    setNombre2(nombre2)
  },[i])
  // const imagenDefault="../src/assets/usuario.png"
  if(empleados.length>0){
    return (
    <div>
      <div>
        <h3>Fotografias</h3>
      </div>
      <div>
        <h5>Gerente</h5>
        <img src="../src/assets/usuario.png" alt="Gerente"  height={"150px"} width={"150px"} style={{borderRadius:"50%"}}/>
      </div>
      <div className='fotosContenedor'>
        {
          empleados.map((empleado,index)=>(
            <div key={index} >
              <img className={empleado.imagen?"newPhoto":"backGroundDefault"}  onClick={(e)=>{empleado.imagen?null:setMostrarNewFoto(!mostrarNewFoto)
              setNombre2(empleado.nombr)
              e.preventDefault()
              console.log("NombreEmpleado: ",empleado.nombr)}}  src={empleado.nombr?empleado.imagen:""}  height={"100px"} width={"100px"} />
               <div style={{display:mostrarNewFoto?"inline":"none"}} className='nuevaFoto' >
                <span>{empleado.nombr}</span>
              <NewPhoto  nombre={nombre2}></NewPhoto>
        </div>
            </div>
          ))
            

        }
      </div>
      
        <button className='BotonCerrarNewPhoto btn2' style={{display:mostrarNewFoto?"":"none"}} onClick={(e)=>{setMostrarNewFoto(!mostrarNewFoto)
        e.preventDefault()}
      }>cerrar</button>
    </div>

)
  }
  

if(empleados.length==0) {
  return (
    <div className="calendar">
      <div className="header">
         
      </div>
      <h1>No Hay Empleados Disponibles</h1>
    </div>
  );
} 
}

export default Fotografias 
// <button key={index} onClick={()=>{setMostrarNewFoto(!mostrarNewFoto)}} ><img className='imgFotografias espacio' src="../src/assets/usuario.png" alt={empleado.nombre} ></img></button> 