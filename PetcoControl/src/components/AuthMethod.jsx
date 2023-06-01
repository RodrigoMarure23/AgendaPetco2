import React, { useEffect, useState } from 'react'
import "../styles/index.css"
import axios from 'axios'
import { useAuthContext } from '../context/AuthContext'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
const AuthMethod = () => {
    const navigate = useNavigate()
    const [mostrarForm,setMostrarForm]=useState(false)
    const {authed,setAuthed,setInit}=useAuthContext()
    const texto1="Codigo enviado a tu aplicacion Club Petco"
    const texto2="Codigo enviado a tu correo"
    const [textoMostrado,setTextoMostrado]=useState(null)
    const [mostrarInput,setMostrarInput]=useState(false)
    const {numeroEmpleado}=useAuthContext(null)
    const [codigo2,setCodigo2]=useState("")
    const [notificacion,setNotificacion]=useState(null)
    useEffect(()=>{
       if(!numeroEmpleado){
        navigate("/")
    } 
    },[numeroEmpleado])
    
    console.log("numerodeEmpleado: ",numeroEmpleado)
    const getAccessNumber=async(notificacion)=>{
        
        try {
          const res = await axios.post('https://app.petco.com.mx/generaCodigo', { noEmpleado:numeroEmpleado, tipoNotificacion:notificacion }, {headers:{"x-api-pe-wss": "681ae67106810684b039e48aa9aa2c6d440ef1867e71f96bb98515a104c77c5b"}})
          const user = res.data
          console.log("RepuestapetcoWelcome: ",user)
          Swal.fire('Success!',
          'Codigo de acceso generado Correctamente',
          'success').then((result)=>{
            if(result.isConfirmed){
              navigate("/authMethod")
            }
          })
        } catch (error) {
          console.log("Error!",error)
          Swal.fire('Error!',
                      'Error al generar el codigo de acceso',
                      'error')
        }
         
      }
    const getToken=async()=>{
        try {
            const res = await axios.post('https://app.petco.com.mx/validaCodigo', { noEmpleado:numeroEmpleado, codigo:codigo2 }, {headers:{"x-api-pe-wss": "681ae67106810684b039e48aa9aa2c6d440ef1867e71f96bb98515a104c77c5b"}})
            const user = res.data
            console.log("RepuestapetcoAuthMethod: ",user)
            Swal.fire('Success!',
            'token generado exitosamente',
            'success').then((result)=>{
              if(result.isConfirmed){
               console.log("todo chido")
               navigate("/home/agenda")
                localStorage.setItem("token",user.data.access_token)
                localStorage.setItem("numeroTienda",user.data.noTienda)
                setAuthed(true)
                setInit(true)
                console.log("token: ",res.data.data.access_token)
                console.log("numeroDeTieda: ",res.data.noTienda)
                localStorage.setItem("numeroEmpleado",numeroEmpleado)
              }
            })
          } catch (error) {
            Swal.fire('Error!',
                      'Codigo de Acceso incorrecto',
                      'error')
            console.log("Error!",error)
          }
    }
    const reEnviarCodigoAcceso =(notificacion)=>{
        getAccessNumber(notificacion)
    }
  
  return (
    <div className='contenedorAuthMethod component-container'>
        <div style={{marginTop:"10px"}}>
            <h3>Selecciona el Metodo de autenticacion</h3></div>
        <div className='sepAuth' >
            <div className='cajaMetodo' onClick={(e)=>{
                e.preventDefault()
                setMostrarForm(true)
                setTextoMostrado(1)
                getAccessNumber("1")
                setNotificacion("1")

            }}>
                <a  className='cajaMetodo' href="">
                    <img style={{marginLeft:"10px"}} src="../src/assets/tel.png" alt="ImgTel" height={"50px"} />
                <h3 style={{marginLeft:"10px"}}>App Clientes</h3>
                </a>
                
            </div>
            <div className='cajaMetodo' onClick={(e)=>{
                e.preventDefault()
                setMostrarForm(true)
                setTextoMostrado(2)
                getAccessNumber("2")
                setNotificacion("2")
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
            <p>{textoMostrado==1?texto1:texto2}</p>
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
        <input onChange={(e)=>{ 
            e.preventDefault()
            setCodigo2(e.target.value)
        }} className='inputWelcome2' type="text" />
        <a onClick={(e)=>{
            e.preventDefault()
            reEnviarCodigoAcceso(notificacion)
        }} href="">Reenviar código</a>
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