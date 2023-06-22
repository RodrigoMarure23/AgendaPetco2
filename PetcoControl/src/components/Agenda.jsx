import React, { useEffect, useState } from "react";
import "../styles/index.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useShopContext } from "../context/ShopContext";
import axios from "axios";
import Swal from "sweetalert2"
import CountdownComponent from "./CountDownComponent";
const Agenda = () => {
  const {textoRuta,setTextoRuta,total,setTotal}=useShopContext()
  const {empleados,setEmpleados}=useShopContext()
  // const {empleadosDefault,setEmpleadosDefault} = useShopContext()
  const {numeroEmpleado}=useShopContext()
  const navigate = useNavigate();
  const [componenteActivo,setComponenteActivo]=useState("A")
  const [textoTienda,setTextoTienda] = useState("")
  const [aux,setAux]=useState("")

  const [empleadosRecuperados,setEmpleadosRecuperados]=useState("")
  const [empleadosFinales,setEmpleadosFinales]=useState("")
  const [fechaLimite,setFechaLimite]=useState(null)
  
  const handleClick=(componente)=>{
    setComponenteActivo(componente)
  }
  const getInfoData=async()=>{
    try {
      const res = await axios.post('https://app.petco.com.mx/recuperaEmpleado', { noEmpleado:localStorage.numeroEmpleado }, {headers:{"x-api-pe-wss": "681ae67106810684b039e48aa9aa2c6d440ef1867e71f96bb98515a104c77c5b",Authorization: `Bearer ${localStorage.token}` 
    }})
      const user = res.data
      console.log("res",res)
      console.log("RepuestapetcoAgenda: ",user.data)
      setTextoTienda(user.data.textoSucursal)
      Swal.fire('Success!',
      'informacion de usuario recuperada correctamente',
      'success')
    } catch (error) {
      console.log("Error!",error)
      Swal.fire('Error!',
                  'Error al recuperar informacion del usuario',
                  'error')
    }
  }
  
  
    const getdata=async()=>{
      try {
        console.log("numeroENAGENDA: ", localStorage.getItem("numeroEmpleado"))
        const respuesta=await axios.get(`https://petcomplete.petco.com.mx/vacaciones/${localStorage.getItem("numeroEmpleado")}/getsubordinados`)
        
        const data2=respuesta
        console.log("respuestaPetcoAgendaSubordinados: ", data2)
        setEmpleadosRecuperados(data2)
        localStorage.setItem("empleadosRecuperadosAgenda",JSON.stringify(data2.data.data))
        validarEmpledadosPorTiendaGerente()
        
      

      } catch (error) {
        console.log("errorenAGENDASubordinados: ", error)
      }
 
    }
 
  const validarEmpledadosPorTiendaGerente=async()=>{
    const empleados=JSON.parse(localStorage.getItem("empleadosRecuperadosAgenda"))
   const resultadoEmpleados= empleados.empleados.filter(empleado=>empleado.njefe==localStorage.getItem("numeroEmpleado"))
   console.log("resultadoEmpleados: ",resultadoEmpleados)
   const nuevoArray= await resultadoEmpleados.map(empleado=>({
    ...empleado,
    horarios:["","","","","","",""],
    imagen:"",
    incidencias:["","","","","","",""],
    
   }))
   setEmpleados(nuevoArray)
  //  setEmpleadosDefault(nuevoArray)
   return resultadoEmpleados
  }

  useEffect(()=>{
    
    setAux(true)
    getInfoData()
    getdata()
  },[numeroEmpleado,aux])
  return (
    <div>
      <div className="Border">
      <div className={textoRuta==="Fotografias"?"NBorder2":"NBorder1"} >
        <div className="TextoDashboard">
          <p style={{ fontWeight: "bold", marginLeft: "5px" }}>
            Tienda Número: {localStorage.getItem("numeroTienda")}
            <span style={{marginLeft:"10px"}}>-{textoTienda.split("-")[0]}</span>
            <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow={total} aria-valuemin="0" aria-valuemax="100">
             <div class="progress-bar progress-bar-striped custom-color progress-bar-animated" style={{width:`${total}%`}}></div>
          </div>  
          </p>
         {
          textoRuta==="Agenda"?
          <div>
            <nav class="navbar navbar-light bg-light">
              <form class=" enlinea" style={{gap:"5px"}} >
                <input class="form-control mr-sm-2" type="search" placeholder="Ingresa fecha a buscar" aria-label="Search"/>
                <button class="btn  my-2 my-sm-0" type="submit" onClick={(e)=>{
                  e.preventDefault()
                }}>Buscar</button>
              </form>
            </nav>
          </div>:null
         } 
          <div className="gap">
            <button id="boton1"
            className={componenteActivo==="A"?"btn":"btn gris"}
              onClick={(e) => {navigate("/home/agenda")
            handleClick("A")
            setTextoRuta("Agenda")
            }}
              
            >
              Agenda
            </button>
            <button id="boton2"
            className={componenteActivo==="B"?"btn":"btn gris"}
              onClick={(e) => {navigate("/home/incidencias")
              handleClick("B")
              setTextoRuta("Incidencias")
            }
            }
              
            >
              Incidencias
            </button>
            <button id="boton3"
            className={componenteActivo==="C"?"btn":"btn gris"}
              onClick={(e) => {navigate("/home/fotografias")
              handleClick("C")
              setTextoRuta("Fotografias")}}
              
            >
              Fotografias
            </button>
          </div>
        </div>

        <div >
          <Outlet /> 
{
  total<="99.8"?
  <div className="CuentaAtras">
          <CountdownComponent ></CountdownComponent>
        </div>:
        <div className="CuentaAtras">
          <p className="btn">Copiar Horario a siguiente semana</p>
        </div>
      
}       
        
        </div>
      </div>
    </div>
            
     
    </div>
    
  );
};

export default Agenda;
