import React, { useState } from 'react'
import "../styles/index.css"
import axios from 'axios'
import { useAuthContext } from '../context/AuthContext'
const AuthMethod = () => {
    const [mostrarForm,setMostrarForm]=useState(false)
    const [mostrarInput,setMostrarInput]=useState(false)
    const {noEmpleado}=useAuthContext()
    const noEmpleado2=noEmpleado
    const [codigo,setCodigo]=useState("05430197")
    
    const getToken=async()=>{
        const res=await axios.post("https://app.petco.com.mx/validaCodigo",{noEmpleado:"69607",codigo:"05430"},
        {headers :{ "x-api-pe-wss": "681ae67106810684b039e48aa9aa2c6d440ef1867e71f96bb98515a104c77c5b","content-type":"text/json" }})
        console.log("respuestaAuthMethod: ",res)
    }
  return (
    <div className='contenedorAuthMethod component-container'>
        <div style={{marginTop:"10px"}}>
            <h3>Selecciona el Metodo de autenticacion</h3></div>
        <div className='sepAuth' >
            <div className='cajaMetodo' onClick={(e)=>{
                e.preventDefault()
                setMostrarForm(true)
            }}>
                <a className='cajaMetodo' href="">
                    <img style={{marginLeft:"10px"}} src="../src/assets/tel.png" alt="ImgTel" height={"50px"} />
                <h3 style={{marginLeft:"10px"}}>App Clientes</h3>
                </a>
                
            </div>
            <div className='cajaMetodo' onClick={(e)=>{
                e.preventDefault()
                setMostrarForm(true)
            }}>
                <a className='cajaMetodo' href=""> 
                    <img style={{marginLeft:"10px"}} src="../src/assets/correo.png" alt="ImgTel" height={"50px"} />
                    <h3 style={{marginLeft:"10px"}}>Correo electronico</h3>
                </a>
            </div>
        </div>



{mostrarForm && 
    <div>
        <form className='formAuthMethod ' action="">
            <h5>Pet Partner</h5>
            <p>Codigo de accesso enviado a tu correo Petco</p>
            <button className='btn4' onClick={(e)=>{
                e.preventDefault()
                setMostrarForm(false)
                setMostrarInput(true)
            }} >Aceptar</button>
        </form>
    </div>
    }

{
    mostrarInput && 
    <div className=' formAuthMethod' style={{display:"grid",justifyItems:"center"}}>
        <h5>Proporciona el codigo de verificacion enviado</h5>
        <input className='inputWelcome2' type="text" />
        <a href="">Reenviar código</a>
        <button
        onClick={(e)=>{
            e.preventDefault()
            getToken()
            
        }} className='btn5'>Validar codigo</button>
    </div>
}
    </div>
  )
}

export default AuthMethod