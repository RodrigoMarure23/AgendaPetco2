import React, { useEffect, useState } from "react";
import "../styles/index.css";
import { useShopContext } from '../context/ShopContext'
import Swal from "sweetalert2";
import axios from "axios";
import {format, set} from "date-fns"
const daysOfWeek = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

const Incidencias = () => {
  const [diaSeleccionado,setDiaSeleccionado]=useState(null)
  const startDay2=new Date()
  const [diaIncio,setDiaIncio]=useState(startDay2)
  const [diaFin,setDiaFin]=useState(startDay2)
  const [startDay, setStartDay] = useState(startDay2);
  const {empleados,setEmpleados}=useShopContext()
  const [empleadosCopia,setEmpleadosCopia]=useState([...empleados])
 

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [dia,setDia]=useState()
  const [incidencia,setIncidencia]=useState("")
  const [menos,setMenos]=useState(0)
  const [mas,setMas]=useState(0)
  const [indexIncidencia,setIndexIncidencia]=useState("")
  const [fecha,setFecha]=useState(null)
  const [semana0,setSemana0]=useState(null)
  const [semana1,setSemana1]=useState(null)
  const [semana2,setSemana2]=useState(null)

  const indicesIncidencias=async()=>{
     const incidenciasObtenidas = await axios.get("https://petcomplete.petco.com.mx/asistencias/catalogoIncidencias") 
     setIndexIncidencia(incidenciasObtenidas.data.data)
    //  console.log("incidenciasObtenidas: ",incidenciasObtenidas.data.data)

  }
  
  
    const [empleadoIndex,setEmpleadoIndex]=useState()
    const [i,setI]=useState()
    const fechaSemanaPasada=startDay2.setDate(startDay2.getDate()) //seteamos la fecha de la semana pasada
    const mostrarFormularioHandler = (e,day) => {
    e.preventDefault();
    // setDiaSeleccionado(day.getDate())
    setDia(formatearFecha(day))
    // console.log("mostrar Formulario"); day es el dia de hoy, hora  ala que se realiza la consulta
    setMostrarFormulario(true);
    document.getElementById("botonGuardar").style.display = "none";
  };
  const handleChange = (empleadoIndex,diaIndex, value,dia) => {
    const updatedEmpleados = [...empleados];
    updatedEmpleados[empleadoIndex].incidencias[diaIndex] = value +"--"+ dia ;
    setEmpleadosCopia(updatedEmpleados);
    if(!value || value=="default"){
      Swal.fire(
        'Error!',
        'Ingresa una Incidencia!',
          'error'
    )
    const updatedEmpleados = [...empleados];
    updatedEmpleados[empleadoIndex].incidencias[diaIndex] = "" ;
    setEmpleadosCopia(updatedEmpleados)
    return
    }
    switch (value) {
      case "103":
        const updatedEmpleados3 = [...empleados];
        updatedEmpleados[empleadoIndex].incidencias[diaIndex] = value + "--" +"EMPLEADO DEL MES"+ "--" + dia;
        setEmpleadosCopia(updatedEmpleados3 )
        
        break;
        
      case "112":
        const updatedEmpleados4 = [...empleados];
        updatedEmpleados[empleadoIndex].incidencias[diaIndex] = value + "--" +"PRIMA DOMINICAL"+ "--" + dia;
        setEmpleadosCopia(updatedEmpleados4)
          
          break;

      case "120":
        const updatedEmpleados5 = [...empleados];
        updatedEmpleados[empleadoIndex].incidencias[diaIndex] = value + "--" +"AYUDA DE TRANSPORTE"+ "--" + dia;
        setEmpleadosCopia(updatedEmpleados5)
          
          break;
      
      case "511":
        const updatedEmpleados6 = [...empleados];
        updatedEmpleados[empleadoIndex].incidencias[diaIndex] = value + "--" +"ACCIDENTE DE TRANSITO"+ "--" + dia;
        setEmpleadosCopia(updatedEmpleados6)
              
          break;

        case "512":
          const updatedEmpleados7 = [...empleados];
         updatedEmpleados[empleadoIndex].incidencias[diaIndex] = value + "--" +"ACCIDENTE DE TRABAJO"+ "--" + dia;
         setEmpleadosCopia(updatedEmpleados7)
                      
         break;

        case "513":
          const updatedEmpleados8 = [...empleados];
          updatedEmpleados[empleadoIndex].incidencias[diaIndex] = value + "--" +"INCAPACIDAD POR MATERNIDAD"+ "--" + dia;
          setEmpleadosCopia(updatedEmpleados8)
                              
            break;

        case "515":
          const updatedEmpleados9 = [...empleados];
          updatedEmpleados[empleadoIndex].incidencias[diaIndex] = value + "--" +"ENFERMEDAD GENERAL"+ "--" + dia;
          setEmpleadosCopia(updatedEmpleados9)
                    
            break;
          
        case "525":
          const updatedEmpleados10 = [...empleados];
         updatedEmpleados[empleadoIndex].incidencias[diaIndex] = value + "--" +"FALTANTE DE CAJA"+ "--" + dia;
         setEmpleadosCopia(updatedEmpleados10)
                            
          break

        case "601":
          const updatedEmpleados11 = [...empleados];
          updatedEmpleados[empleadoIndex].incidencias[diaIndex] = value + "--" +"PERMISO SIN GOSE DE SUELDO"+ "--" + dia;
          setEmpleadosCopia(updatedEmpleados11)
                                  
          break;


        case "602":
          const updatedEmpleados12 = [...empleados];
         updatedEmpleados[empleadoIndex].incidencias[diaIndex] = value + "--" +"FALTA INJUSTIFICADA"+ "--" + dia;
         setEmpleadosCopia(updatedEmpleados12)
              
          break;

        case "603":
          const updatedEmpleados13 = [...empleados];
         updatedEmpleados[empleadoIndex].incidencias[diaIndex] = value + "--" +"SANCION ADMINISTRATIVA"+ "--" + dia;
         setEmpleadosCopia(updatedEmpleados13)
              
          break;

       case "FL":
        const updatedEmpleados14 = [...empleados];
        updatedEmpleados[empleadoIndex].incidencias[diaIndex] = value + "--" +"FESTIVO LABORADO"+ "--" + dia;
        setEmpleadosCopia(updatedEmpleados14)
              
              break;

        case "VA":
          const updatedEmpleados15 = [...empleados];
        updatedEmpleados[empleadoIndex].incidencias[diaIndex] = value + "--" +"VACACIONES"+ "--" + dia;
        setEmpleadosCopia(pdatedEmpleados15)
              
              break;
      default:
    
        break;
        
    }
    if(!value & !dia){
      const updatedEmpleados = [...empleados];
    updatedEmpleados[empleadoIndex].incidencias[diaIndex] = value + dia;
    setEmpleadosCopia(updatedEmpleados);
    }
  };
  const setPrevWeek = () => {
    const newDate = new Date(startDay);
    newDate.setDate(startDay.getDate() - 7);
    setStartDay(newDate);
  };

  const setNextWeek = () => {
    const newDate = new Date(startDay);
    newDate.setDate(startDay.getDate() + 7);
    setStartDay(newDate);
  };

  const getDaysOfWeek = () => {
    const days = [];
    const startDate = new Date(startDay);
    startDate.setDate(startDate.getDate() - startDate.getDay() + 1); // Cambiar el inicio de la semana al lunes
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const formatDate = (date) => {
    const options = { month: "short", day: "numeric", year:"numeric"};
    return new Intl.DateTimeFormat("es-MX", options).format(date);
  };

  const days = getDaysOfWeek();
  const formatearFecha = (fecha) => {
    const formato = 'yyyyMMdd';
    const fechaFormateada = format(fecha, formato);
    return fechaFormateada;
  };

  
  function consultarIncidenciasDeLaSemana(fechaSeleccionada) {
    var incidenciasPorEmpleado = {};
  
    for (var i = 0; i < listaIncidencias.length; i++) {
      var incidencia = [i];
      var fechaIncidencia = new Date(incidencia.fecha);
  
      // Verificar si la fecha de la incidencia coincide con la fecha seleccionada
      if (
        fechaIncidencia.getFullYear() === fechaSeleccionada.getFullYear() &&
        fechaIncidencia.getMonth() === fechaSeleccionada.getMonth() &&
        fechaIncidencia.getDate() === fechaSeleccionada.getDate()
      ) {
        var empleado = incidencia.empleado;
  
        if (incidenciasPorEmpleado.hasOwnProperty(empleado)) {
          incidenciasPorEmpleado[empleado].push(incidencia);
        } else {
          incidenciasPorEmpleado[empleado] = [incidencia];
        }
      }
    }
  
    return incidenciasPorEmpleado;
  }
  

  const enviarIncidencia=async(numeroempleado,njefe,sucur,fecha,indiceinc)=>{
    if(!indiceinc){
      return
    }
    const sendend= await axios.post("https://petcomplete.petco.com.mx/asistencias/actualizaInicidencias",{
      "noemp":`${numeroempleado}`,
      "njefe":`${njefe}`,
      "sucur":`${sucur}`,
      "detal":[{
          "fecha":`${fecha}`,
          "incid":`${indiceinc}`
      }]
  })
  console.log("respuestaGuardarEnviarIncidencia: ",sendend.data)
  // console.log("numeroEmpleadoo :",numeroempleado)
  // console.log("njefeee :",njefe)
  // console.log("sucurrrr :",sucur)
  // console.log("fechaaaa :",fecha)
  // console.log("indiceincidencia:",indiceinc)

  }
  useEffect(()=>{
  console.log("---------------------------")
  // console.log("daaays: ",days)
  setDiaIncio(days[0])
  setDiaFin(days[6])
  consultarIncidenciasDeLaSemana()
  setDiaSeleccionado(dia)
  // setDia(dia)
  indicesIncidencias()
  // console.log("diainicio: ",diaIncio)
  // console.log("diafin: ",diaFin)


  // (async () => { DETENER CAMARA WEB  
  //       navigator.mediaDevices.getUserMedia({ video: false }).then((stream) => {
  //             videoRef.current.srcObject = stream;
  //             videoRef.current.stop();
  //           });
  //   })();
  
  
  
},[fecha,diaIncio,diaFin,diaSeleccionado,incidencia,startDay])

  if(empleadosCopia.length>0){
    return (
    <div className="calendar">
      <div className="header">
        <img
          onClick={()=>{
            
            setPrevWeek()
            setMenos(menos-1)
            setMas(mas-1)
            
            }}
            
          style={{display:menos==-2?"none":""}}
          className="imgflecha izq"
          src="../src/assets/anterior.png"
          alt="menos"
        />
        <p className="semText">{`Semana del ${formatDate(
          days[0]
        )} al ${formatDate(days[6])}`}</p>
        <img
          onClick={()=>{
            
            setNextWeek()
            setMenos(menos+1)
            setMas(mas+1)
            }} style={{display:mas==0?"none":""}}
          className="imgflecha der"
          src="../src/assets/proximo.png"
          alt="mas"
        />
      </div>
      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre de Empleado</th>
            {days.map((day, i) => (
              <th key={i}>
                {daysOfWeek[i] + " "}
                {day.getDate()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="borderR">
          {/* validacion para empleadosCopia de la bd */}
          {
            empleadosCopia.map((empleado,empleadoIndex)=>(
              <tr key={empleadoIndex} className="borderTable2">
                <td>
                  <p>{empleado.nombr+" "+empleado.apepa}</p>
                </td>
                {
                  days.map((day,i)=>(
                    <td onClick={(e)=>{
                      setEmpleadoIndex(empleadoIndex)
                      setI(i)
                      mostrarFormularioHandler(e,day)
                      setFecha(formatDate(day))
                      console.log("diapicado: ",formatearFecha(day) );
                      console.log("empleado.incidencias[i]: ",empleado.incidencias[i] );

                      }}
                      className={empleado.incidencias[i]?"boderTable sinfondo":"borderTable fondomas"} key={i}>
                      {
                     
                      }
                        
                      </td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
      {/* validacion para mostrar formulario */}
      {mostrarFormulario && (
        <div className="formularioHorario ">
          <div>
            <form className="Formulario">
              <div className="centrar">
                <div>
                  <h1 style={{ color: "#0304f5" }}>Incidencia</h1>
                  <div className="inLine">
                    <label>Nombre: </label> <p>{empleadosCopia[empleadoIndex].nombr}</p>
                  </div>
                  <div className="inLine">
                  <label>Fecha</label><label>{fecha}</label>
                 </div>
                  <div className="inLine">
                    <label>Incidencia: </label>
                      <select id="options" onChange={(e)=>{setIncidencia(e.target.value)
                      ;}}> 
                        <option value="default">ninguno</option>
                        <option value="103">Empleado del Mes</option>
                        <option value="112">Prima Dominical</option>
                        <option value="120">Ayuda de Transporte</option>
                        <option value="511">Accidente de Trayecto</option>
                        <option value="512">Accidente de Trabajo</option>
                        <option value="513">Incapacidad por Maternidad</option>
                        <option value="515">Incapacidad por Enfermedad Gral</option>
                        <option value="525">Faltante de Caja</option>
                        <option value="601">Permiso sin Gose de Sueldo</option>
                        <option value="602">Falta Injustificada</option>
                        <option value="603">Sancion Administrativa</option>
                        <option value="FL">Festivo Laborado</option>
                        <option value="VA">Vacaciones</option>
                      </select>
                    
                  </div>
                </div>

                <div className="inLine">
                  <button
                    className="btn2"
                    onClick={(e) => {
                      e.preventDefault();
                      setMostrarFormulario(false);
                      // setIncidencia("")
                      // handleChange(empleadoIndex,i,"","")
                      document.getElementById("botonGuardar").style.display =
                        "block";
                      const copy2=[...empleadosCopia];
                      copy2[empleadoIndex].incidencias[i]="";
                      setEmpleadosCopia(copy2)
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    className="btn"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      handleChange(empleadoIndex,i,incidencia,dia)
                      setMostrarFormulario(false)
                      document.getElementById("botonGuardar").style.display =
                        "block";
                        setIncidencia("")
                          enviarIncidencia(empleadosCopia[empleadoIndex].noemp,empleadosCopia[empleadoIndex].njefe,localStorage.getItem("numeroTienda"),dia,incidencia)
                    }}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <button id="botonGuardar" className="btn btn-primary botonGuardar">
        Guardar
      </button>
    </div>
  );
  }
  if(empleadosCopia.length==0) {
    return (
      <div className="calendar">
        <div className="header">
          <img onClick={()=>{setPrevWeek()
          setMenos(menos-1)
          setMas(mas-1)}} style={{display:menos==-1?"none":""}} className="imgflecha izq" src="../src/assets/anterior.png" alt="menos" />
          <p className="semText">{`Semana del ${formatDate(days[0])} al ${formatDate(days[6])}`}</p>
          <img onClick={()=>{setNextWeek()
          setMenos(menos+1)
          setMas(mas+1)}} style={{display:mas==1?"none":""}} className="imgflecha der" src="../src/assets/proximo.png" alt="mas" />
        </div>
        <h1>No Hay Empleados Disponibles</h1>
      </div>
    );
  } 
  
};

export default Incidencias;
