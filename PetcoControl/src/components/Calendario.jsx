import React, { useEffect, useState } from "react";
import "../styles/index.css"
import Swal from "sweetalert2";
import { useShopContext } from '../context/ShopContext'
const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

const Calendar = () => {
  const [diaSeleccionado,setDiaSeleccionado]=useState(null)
 const startDay2=new Date()
  const [startDay, setStartDay] = useState(startDay2);
  const [mostrarFormulario,setMostrarFormulario]=useState(false)
  const [dia,setDia]=useState(null)
  const [hora,setHora]=useState(null)
  const [descanso,setDescanso]=useState(false)
  const [valor,setValor]=useState(false)
  const {empleados,setEmpleados}=useShopContext()
  const [empleadoIndex,setEmpleadoIndex]=useState()
  const [i,setI] = useState()
  const [resultTime, setResultTime] = useState();
  const handleChange = (empleadoIndex, diaIndex, value,hora) => {
    // 
    if(!hora && valor==false){
      Swal.fire(
        'Error!',
        'Ingresa una hora o define si es descanso!',
        'error'
    )
    const updatedEmpleados = [...empleados];
    updatedEmpleados[empleadoIndex].horarios[diaIndex] = "";
    setEmpleados(updatedEmpleados)
    }
    if(!value && !hora){
    const updatedEmpleados = [...empleados];
    updatedEmpleados[empleadoIndex].horarios[diaIndex] = value + hora;
    setEmpleados(updatedEmpleados);
    }
    if(hora=="Descanso" && value){
      
      if(empleados[empleadoIndex].descanso==true){
        Swal.fire(
          'Error!',
          'Ya se a registrado un dia de Descanso!',
          'error'
      )
      return
    }
    const updatedEmpleados = [...empleados];
    updatedEmpleados[empleadoIndex].horarios[diaIndex] = value + "//"+ hora ;
    updatedEmpleados[empleadoIndex].descanso=true;
    
    setEmpleados(updatedEmpleados);
    
    }
    if(value && hora && hora!="Descanso" ){
    const updatedEmpleados = [...empleados];
    updatedEmpleados[empleadoIndex].horarios[diaIndex] = value + "//"+ hora + "-"+ resultTime;
    setEmpleados(updatedEmpleados);
    }
    
  };
  const [mostrarBotonEntrada,setMostrarBotonEntrada]=useState(true)
  const [inputTime,setInputTime]=useState(false)
  const mostrarFormularioHandler=(e,day)=>{
    e.preventDefault()
    setDiaSeleccionado(day.getDate())
    console.log("diaenform: ",day);
    setDia(formatDate(day))
    // console.log("mostrar Formulario"); day es el dia de hoy, hora  ala que se realiza la consulta
    setMostrarFormulario(true)
    document.getElementById("botonGuardar").style.display="none"
  }
  const [menos,setMenos]=useState(0)
  const [mas,setMas]=useState(0)
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
    const options = {  month: "short", day: "numeric" , year:"numeric"};
    return new Intl.DateTimeFormat("es-MX", options).format(date);
  };

  const days = getDaysOfWeek();
  
  function validarMinutos(event) {
    const input = event.target;
    const timeValue = input.value;
  
    // Obtener los minutos ingresados por el usuario
    const minutos = timeValue.slice(3, 5);
  
    // Validar si los minutos son diferentes de '00' y '30'
    if (minutos !== '00' && minutos !== '30') {
      // Modificar los minutos al valor más cercano ('00' o '30')
      const nuevoValor = timeValue.slice(0, 3) + (minutos < '30' ? '00' : '30');
      input.value = nuevoValor;
      setHora(nuevoValor)
    }
    
  }
  const sumarHoras = () => {
    const [horas, minutos] = hora.split(":");
    const horasInt = parseInt(horas);
    const minutosInt = parseInt(minutos);

    let horaSumada = horasInt + 9;
    let minSumados = minutosInt;

    console.log("hora:", horas)
    console.log("minutos:", minutos)
    if (horaSumada >= 24) {
      horaSumada -= 24;
    }
   

    const horaFinalStr = `${horaSumada.toString().padStart(2, "0")}:${minSumados.toString().padStart(2, "0")}`;
    setResultTime(horaFinalStr);
    console.log("horafinal:",horaFinalStr)
  };
  useEffect(()=>{
    setDiaSeleccionado(true)
    // console.log("mostrarBoton: ",mostrarBotonEntrada);
    console.log("empleados: ",empleados);
  
    
   
  },[diaSeleccionado,resultTime,descanso])
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
      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre de Empleado</th>
            {days.map((day, i) => (
              <th key={i}>{daysOfWeek[i]+" "}
              {day.getDate()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
        {/* validacion para empleados de la bd */}
        {empleados.map((empleado,empleadoIndex)=>(
          <tr key={empleadoIndex} className="borderTable2">
            <td > <p>{empleado.nombre}</p></td> 
            {days.map((day, i) => (
              <td  onClick={(e)=>{
                setEmpleadoIndex(empleadoIndex)
                setHora(hora) 
                setI(i)
                mostrarFormularioHandler(e,day)
              console.log("dia:",day);}} id="celdaInfo" className={empleado.horarios[i]?"boderTable sinfondo":"borderTable fondomas"} key={i}>
               <div id="divCelda"  >   {/* <img id="botonMas" src="../src/assets/mas.png" height={"15px"} alt="" /> */}
                { diaSeleccionado &&  <span  style={{height:"100px"}} >{empleado.horarios[i].split("//")[1]}</span>}
                </div>
              </td>
            ))}
          </tr>
        ))}
          
          
        </tbody>
      </table>
      {/* validacion para mostrar formulario */}
       {
                

          mostrarFormulario&&(
            <div className="formularioHorario">
            <div>
              <form className="Formulario">
                <div className="centrar">
                  <div>
                    <h1 style={{color:"#0304f5"}}>Horario</h1>
                  <div className="inLine">
                    <label>Nombre:  </label> <p>{empleados[empleadoIndex].nombre}</p>
                  </div>
                 
                 <div className="inLine">
                  <label>Fecha</label><label>{dia}</label>
                 </div>
                  
                  <div className="inLine">
                  <label>Descanso</label><input value={inputTime} onClick={(e)=>{console.log("valor:  ", e.target.value),setValor(true)
                                                                                              }}  type="checkbox" onChange={(e)=>{setMostrarBotonEntrada(!mostrarBotonEntrada)
                                                                                                                                                                    setInputTime(!inputTime)
                                                                                                                                                                    
                  
                  // if(e.target){
                  //   console.log("botonDescanso: ",mostrarBotonEntrada);
                  // }
                }}
                  />
                  </div>
                
                  <div style={{display:mostrarBotonEntrada?"block":"none"}} className="inLine">
                    <label>Hora Entrada</label><input  id="horarioInput"  type="time" onChange={(e)=>{setHora(e.target.value)
                                                                                                      sumarHoras()
                                                                                                validarMinutos(e)}} step="1800" />
                  </div>
                  
                </div>
                
                <div className="inLine">
                
                <button className="btn2" onClick={(e) =>{
                  e.preventDefault()
                  setMostrarBotonEntrada(true)
                  setMostrarFormulario(false)
                  document.getElementById("botonGuardar").style.display="block"
                  const copy2=[...empleados];
                  copy2[empleadoIndex].horarios[i]="";
                  setEmpleados(copy2)
                  setHora()
                }}>Cancelar</button>
                <button className="btn" type="submit" onClick={(e)=>{
                  e.preventDefault()
                  document.getElementById("botonGuardar").style.display="inline"
                  setMostrarBotonEntrada(true)
                  setMostrarFormulario(false)
                  console.log("hora: ",hora);
                  setHora()
                  setValor(false)
                  if(descanso===true){
                    console.log("ya existe un dia de descanso")
                  }
                  if(valor==false){
                    
                    handleChange(empleadoIndex,i,dia,hora);
                    sumarHoras()
                  }
                  if(valor==true){
                    
                    handleChange(empleadoIndex,i,dia,"Descanso");
                  }
                  }
                  // document.getElementById("botonMas").style.display="none"
                  
              }>Guardar</button>
                </div>
                </div>
                
                
              </form>
            </div>
        </div>
          )
        }
    
        <button id="botonGuardar" className="btn btn-primary botonGuardar" >Guardar</button>
    </div>
  );
};

export default Calendar;
