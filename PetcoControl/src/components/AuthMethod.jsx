import React, { useState } from 'react'
import "../styles/index.css"
const AuthMethod = () => {
    const [mostrarForm,setMostrarForm]=useState(false)
    const [mostrarInput,setMostrarInput]=useState(false)
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
        <button className='btn5'>Validar codigo</button>
    </div>
}
    </div>
  )
}

export default AuthMethod