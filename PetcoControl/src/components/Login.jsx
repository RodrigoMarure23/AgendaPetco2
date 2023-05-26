import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import "../styles/index.css"
import Swal from "sweetalert2"
import {navigate} from "../services/navigate"
const Login = () => {
    const {loginAuth}=useAuthContext()
    const [userData,setUserData]=useState({
        username:"kminchelle",
        password:"0lelplR",
        expiresInMins:60 //tiempo para que expire el token
    })
    
    const handleForm=async(e)=>{
        e.preventDefault()
        try {
            const username=e.target.username.value
            const password=e.target.password.value 
            await loginAuth(username,password)
        } catch (error) {
            console.log("Error!!",error)
            Swal.fire({
                icon:"error",
                title:"Uuups...",
                text:"User/Password are wrong",
                background:"white",
                buttonsStyling:false,
                customClass:{
                    confirmButton:"custom-button"
                }
            })
        }
    }
  return (
    <form className=" form-login contenedorPrincipal" onSubmit={(e)=>handleForm(e)}>
        <div className="mb-3 text-center">
            <div>

            </div>
            <h3>Welcome</h3>
            <div className="mb-3">
                <input  className="form-control" defaultValue={userData.username} type="text" name="username" placeholder="Correo/Usuario" autoFocus />
            </div>
            <div>
                <input className="form-control" defaultValue={userData.password} type="password" name="password" placeholder="Password"/>
            </div>
            <div>
                <button onClick={navigate("/home/agenda")} className="btn btn-primary w-100" type="submit" >Ingresar</button>
            </div>
        </div>

    </form>
  )
}

export default Login