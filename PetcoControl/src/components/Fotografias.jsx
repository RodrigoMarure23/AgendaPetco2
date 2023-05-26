import React, { useEffect, useState } from 'react'
import NewPhoto from './NewPhoto'
import "../styles/index.css"
import { useShopContext } from '../context/ShopContext'
const Fotografias = () => {
  useEffect(()=>{},[])
  const {empleados,setEmpleados}=useShopContext()
  const [nombre2,setNombre2]=useState()
  const [i,setI]=useState(0)
  const [mostrarNewFoto,setMostrarNewFoto]=useState(false)
  // const imagenDefault="../src/assets/usuario.png"
  return (
    <div>
      <div>
        <h3>Fotografias</h3>
      </div>
      <div>
        <h5>Gerente</h5>
        <img src="../src/assets/cara4.png" alt="Gerente"  height={"150px"} width={"150px"} style={{borderRadius:"50%"}}/>
      </div>
      <div className='fotosContenedor'>
        {
          empleados.map((empleado,index)=>(
            <div key={index} >
              <img className={empleado.imagen?"newPhoto":"backGroundDefault"}  onClick={(e)=>{empleado.imagen?null:setMostrarNewFoto(!mostrarNewFoto)
              setNombre2(empleado.nombre)
              e.preventDefault()
              console.log("NombreEmpleado: ",empleado.nombre)}}  src={empleado.nombre?empleado.imagen:""}  height={"100px"} width={"100px"} />
               <div style={{display:mostrarNewFoto?"inline":"none"}} className='nuevaFoto' >
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

export default Fotografias 
// <button key={index} onClick={()=>{setMostrarNewFoto(!mostrarNewFoto)}} ><img className='imgFotografias espacio' src="../src/assets/usuario.png" alt={empleado.nombre} ></img></button> 