import React, { useEffect, useState } from "react";
import "../styles/index.css";
import { useShopContext } from '../context/ShopContext'
import Swal from "sweetalert2";
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
  const [startDay, setStartDay] = useState(startDay2);
  const {empleados,setEmpleados}=useShopContext()
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [dia,setDia]=useState()
  const [incidencia,setIncidencia]=useState("")
  const [menos,setMenos]=useState(0)
  const [mas,setMas]=useState(0)
  //funcion para obtener la semana completa con su dia 
  //   Date.prototype.getWeek = function() {
    useEffect(()=>{
      
        setDiaSeleccionado(true)
      console.log("incidencia: ",incidencia);
      // (async () => { DETENER CAMARA WEB  
      //       navigator.mediaDevices.getUserMedia({ video: false }).then((stream) => {
      //             videoRef.current.srcObject = stream;
      //             videoRef.current.stop();
      //           });
      //   })();
      
  
      
      
    },[incidencia,dia,diaSeleccionado])

    //   const onejan = new Date(this.getFullYear(), 0, 1);
    //   return Math.ceil(((this - onejan) / 86400000 + onejan.getDay() + 1) / 7);
    // };
    const [empleadoIndex,setEmpleadoIndex]=useState()
    const [i,setI]=useState()
    const fechaSemanaPasada=startDay2.setDate(startDay2.getDate()) //seteamos la fecha de la semana pasada
    const mostrarFormularioHandler = (e,day) => {
    e.preventDefault();
    setDiaSeleccionado(day.getDate())
    setDia(formatDate(day))
    // console.log("mostrar Formulario"); day es el dia de hoy, hora  ala que se realiza la consulta
    setMostrarFormulario(true);
    document.getElementById("botonGuardar").style.display = "none";
  };
  const handleChange = (empleadoIndex,diaIndex, value,dia) => {
    const updatedEmpleados = [...empleados];
    updatedEmpleados[empleadoIndex].incidencia[diaIndex] = value +"--"+ dia ;
    setEmpleados(updatedEmpleados);
    if(!value){
      Swal.fire(
        'Error!',
        'Ingresa una Incidencia!',
          'error'
    )
    const updatedEmpleados = [...empleados];
    updatedEmpleados[empleadoIndex].incidencia[diaIndex] = value + "";
    setEmpleados(updatedEmpleados)
    }
    
    if(!value & !dia){
      const updatedEmpleados = [...empleados];
    updatedEmpleados[empleadoIndex].incidencia[diaIndex] = value + dia;
    setEmpleados(updatedEmpleados);
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

  return (
    <div className="calendar">
      <div className="header">
        <img
          onClick={()=>{setPrevWeek()
        
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
          onClick={()=>{setNextWeek()
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
        <tbody className="">
          {/* validacion para empleados de la bd */}
          {
            empleados.map((empleado,empleadoIndex)=>(
              <tr key={empleadoIndex} className="borderTable2">
                <td>
                  <p>{empleado.nombre}</p>
                </td>
                {
                  days.map((day,i)=>(
                    <td onClick={(e)=>{
                      setEmpleadoIndex(empleadoIndex)
                      setI(i)
                      mostrarFormularioHandler(e,day)
                      console.log("diapicado: ",day);
                      }}
                      className={empleado.incidencia[i]?"boderTable sinfondo":"borderTable fondomas"} key={i}>
                        <div>
                          {
                            diaSeleccionado && <span>{empleado.incidencia[i].split("--")[0]}</span>
                          }
                        </div>
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
        <div className="formularioHorario">
          <div>
            <form className="Formulario">
              <div className="centrar">
                <div>
                  <h1 style={{ color: "#0304f5" }}>Incidencia</h1>
                  <div className="inLine">
                    <label>Nombre: </label> <p>{empleados[empleadoIndex].nombre}</p>
                  </div>
                  <div className="inLine">
                  <label>Fecha</label><label>{dia}</label>
                 </div>
                  <div className="inLine">
                    <label>Incidencia: </label>
                      <select id="options" onChange={(e)=>{setIncidencia(e.target.value)
                      ;}}> 
                        <option value="ninguno">ninguno</option>
                        <option value="Empleado del Mes">Empleado del Mes</option>
                        <option value="Prima Dominical">Prima Dominical</option>
                        <option value="Ayuda de Transporte">Ayuda de Transporte</option>
                        <option value="Accidente de Trayecto">Accidente de Trayecto</option>
                        <option value="Accidente de Trabajo">Accidente de Trabajo</option>
                        <option value="Incapacidad por Maternidad">Incapacidad por Maternidad</option>
                        <option value="Incapacidad por Enfermedad Gral">Incapacidad por Enfermedad Gral</option>
                        <option value="Faltante de Caja">Faltante de Caja</option>
                        <option value="Permiso sin Gose de Sueldo">Permiso sin Gose de Sueldo</option>
                        <option value="Falta Injustificada">Falta Injustificada</option>
                        <option value="Sancion Administrativa">Sancion Administrativa</option>
                      </select>
                    
                  </div>
                </div>

                <div className="inLine">
                  <button
                    className="btn2"
                    onClick={(e) => {
                      e.preventDefault();
                      setMostrarFormulario(false);
                      setIncidencia("")
                      // handleChange(empleadoIndex,i,"","")
                      document.getElementById("botonGuardar").style.display =
                        "block";
                      const copy2=[...empleados];
                      copy2[empleadoIndex].incidencia[i]="";
                      setEmpleados(copy2)
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
};

export default Incidencias;
