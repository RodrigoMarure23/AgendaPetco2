import React, { useEffect, useState } from "react";
import "../styles/index.css"
import Swal from "sweetalert2";
import { useShopContext } from '../context/ShopContext'
import axios from "axios";
import { format, set } from "date-fns"
import CountdownComponent from "./CountDownComponent";
const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

const Calendar = () => {
  const [diaSeleccionado, setDiaSeleccionado] = useState(null)
  const startDay2 = new Date()
  const [startDay, setStartDay] = useState(startDay2);
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [dia, setDia] = useState(null)
  const [hora, setHora] = useState(null)
  const [descanso, setDescanso] = useState(false)
  const [valor, setValor] = useState(false)
  const [semanaActual,setSemanaActual]=useState()
  const { empleados, setEmpleados } = useShopContext()
  const [empleadoIndex, setEmpleadoIndex] = useState()
  const [i, setI] = useState()
  const [resultTime, setResultTime] = useState();
  const [day, setDay] = useState(null)
  const { total, setTotal } = useShopContext()
  const [x, setX] = useState(null)
  const [empleadosCopia, setEmpleadosCopia] = useState(null)
  const [semanaAConsultar, setSemanaAConsultar] = useState(null)
  const [carga, setCarga] = useState(false)
//   const handleChange = (empleadoIndex, diaIndex, value, hora) => {
//     console.log("value",value)
//     console.log("hora",hora)
    
//     if (hora === "000000" ) {
// console.log("mandaste un descanso")

//     let respuesta2=  empleados[empleadoIndex].horarios.filter(horario=>horario.hoini==="000000")
//     if(respuesta2){
//     Swal.fire(
//       'Error!',
//       '!Ya has registrado un dia de Descanso!',
//       'error'
//     ) 
//     return
     

//     }
  
//     }
    

//   };
  const [mostrarBotonEntrada, setMostrarBotonEntrada] = useState(true)
  const [inputTime, setInputTime] = useState(false)
  const mostrarFormularioHandler = (e, day) => {
    e.preventDefault()
    setDay(day)
    setDiaSeleccionado(day.getDate())
    // console.log("diaenform: ", day);
    setDia(formatearFecha(day))
    // console.log("mostrar Formulario"); day es el dia de hoy, hora  ala que se realiza la consulta
    setMostrarFormulario(true)
    // document.getElementById("botonGuardar").style.display = "none"
  }
  const [menos, setMenos] = useState(0)
  const [mas, setMas] = useState(0)
  const setPrevWeek = () => {
    const newDate = new Date(startDay);
    newDate.setDate(startDay.getDate() - 7);
   return setStartDay(newDate);

  };

  const setNextWeek = () => {
    const newDate = new Date(startDay);
    newDate.setDate(startDay.getDate() + 7);
   return setStartDay(newDate);


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
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Intl.DateTimeFormat("es-MX", options).format(date);
  };
  const formatDate2 = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${year}${month}${day}`;
    return formattedDate;
  };
  const formatearFecha = (fecha) => {
    const formato = 'yyyyMMdd';
    const fechaFormateada = format(fecha, formato);
    return fechaFormateada;
  };
  const days = getDaysOfWeek();
  const days2 = []
  const copyDays = () => {

    for (let i = 0; i < 7; i++) {
      let x = formatDate2(days[i])
      days2.push(x)

    }
    console.log("days2", days2)
    return days2
  }
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

  const getWeekNumber = () => {
    const now = startDay;
    function getCurrentYear() {
      const now = new Date();
      const currentYear = now.getFullYear();

      return currentYear;
    }
    const year = getCurrentYear();
    const inicioDelAnio = new Date(now.getFullYear(), 0, 1);
    const diff = now.getTime() - inicioDelAnio.getTime();
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    const weekNumber = Math.ceil(diff / oneWeek)
    setSemanaAConsultar(year + "" + weekNumber)
    console.log("SemanaAConsultar!!>:", semanaAConsultar)

    return weekNumber;
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
     return horaSumada = horaSumada - 24;
    }
    if (minSumados == 0 || minSumados == 30) {

    }



    const horaFinalStr = `${horaSumada.toString().padStart(2, "0")}:${minSumados.toString().padStart(2, "0")}`;
    console.log("resultTime", horaFinalStr)
  return  setResultTime(horaFinalStr);

    // console.log("horafinal:", horaFinalStr)
  };

  // const acomodarFechasHorarios = () => {
  //   empleados.map((emplead, empleadIndex) => {
  //     for (let i = 0; emplead.horariosRecibidos.length; i++) {
  //       if (emplead.horariosRecibidos[i]) {
  //         console.log("mplead.horariosRecibidos[i]", emplead.horariosRecibidos[i])
  //       }
  //     }
  //   })
  // }
  const consultarHorariosDeLaSemana = async () => {
    setCarga(true)
   
    // obtenerPorcentajesBarra()
    // const horariosdata = []=====================================================================> ${localStorage.getItem("numeroTienda")} ARREGLA LA SUCUR
    const { data } = await axios.get(`https://petcomplete.petco.com.mx/asistencias/consultaAgenda/${localStorage.getItem("numeroEmpleado")}/${localStorage.getItem("numeroTienda")}/${semanaAConsultar}`)
    console.log("datosRecibidosdesdeConsutarHorarios:", data.data)
    empleados.map((empleado, empleadoIndex) => {
      const newData = [...empleados];
      // return console.log("RespuestaEnConsultarHorarios:", empleado.nombr, data)
      if (data.replyCode == 200) {
        const horarioADD = []
        data.data.agenda.map((horario, horarioIndex) => {
          // console.log("hjw", horario)
          if (horario.noemp === empleado.noemp) {
            horarioADD.push(horario)
            // console.log("horarioadd", horarioADD)
            newData[empleadoIndex].horariosRecibidos = horarioADD
            // acomodarFechasHorarios()
            const acomodarFechasHorarios = () => {
              // setCarga(false)
              for (let i = 0; i < empleado.horariosRecibidos.length; i++) {
                if (empleado.horariosRecibidos[i]) {
                  for (let b = 0; b < 7; b++) {
                    if (empleado.horariosRecibidos[i].fecha == days2[b]) {
                      // console.log(empleado.horariosRecibidos[i].fecha, days2[b])
                       empleado.horarios[b] = empleado.horariosRecibidos[i]
                    }
                  }
                  // console.log("mplead.horariosRecibidos[i]", empleado.nombr, empleado.horariosRecibidos[i])
                }
              }

            }
            setEmpleados(newData)
            acomodarFechasHorarios()
            setCarga(false)
                  return
          }

        })
        setCarga(false)

      } if (data.replyCode == 404 || !data.data.agenda) {
        // setCarga(false)
        console.log("no se encontraron horarios registrados en esta semana")
        return
      }
    })
    // return console.log("horariosObtenidos: ", horariosdata)
   return setCarga(false)
  }


  const obtenerPorcentajesBarra = () => {

    // console.log("empleadoslength", empleados.length)
    var xs = 100 / (empleados.length * 7)
    setX(xs)
    console.log("x",x)
    return
    // console.log("x", xs)

  }
  // const copia3 = [...empleados]

const [emor2,setemor2]=useState(null)

const ordenarEmpleados = () => {
    const emOr = empleados.sort((a, b) => a.nombr.localeCompare(b.nombr));
    console.log("empleadosOrdenars:", emOr)
    setemor2(emOr)
    return setEmpleados(emOr)
  }
  
  
  function convertirFormatoHora(hora) {
    // Separar las horas y minutos
    const partes = hora.split(':');
    const horas = parseInt(partes[0]);
    const minutos = parseInt(partes[1]);

    // Construir el formato hhmmss
    const formatoHora = `${horas.toString().padStart(2, '0')}${minutos.toString().padStart(2, '0')}00`;

    return formatoHora;
  }

  const resetearHorarios = () => {
    const nuevoArray3 = empleados.map(empleado => ({
      ...empleado,
      horarios: ["", "", "", "", "", "", ""]
    }))
   return setEmpleados(nuevoArray3)

  }
  const enviarHorario = async (njefe, sucur, semanaAConsultar, numeroempleado, fecha, hoini, hofin) => {
    if (!hoini || !hofin) {
      return;
    }
    
    const sendend = await axios.post("https://petcomplete.petco.com.mx/asistencias/actualizaAgenda",
      {
        "njefe": njefe,
        "sucur": sucur,
        "seman": semanaAConsultar,
        "detal": [
          {
            "noemp": numeroempleado,
            "fecha": fecha,
            "hoini": hoini,
            "hofin": hofin
          }
        ]
      });
    console.log("RespuestaEnviarHorario:", sendend.data)
    Swal.fire("Exitoso!", "Horario Registrado Exitosamente!", "success");
 
    return consultarHorariosDeLaSemana()
    
    
  
  
  }

  useEffect(() => {
    if(empleados){
console.log("++++++++++++++++++++++++")
    console.log("menos", menos)
    console.log("mas", mas)
    setDiaSeleccionado(true)
    ordenarEmpleados()
    consultarHorariosDeLaSemana()
    copyDays()
    // setCarga(false)
    console.log("empleados: ", empleados);
    console.log("semana a consultar:", semanaAConsultar)
    obtenerPorcentajesBarra()
    getWeekNumber()
    }
    
   

  }, [diaSeleccionado,dia, menos, mas,semanaAConsultar,hora])
  if (empleados.length > 0) {
    return (
      <div>
        {carga && <div className="contenedorr">
          <div class="contenedor-loader">
            <div class="rueda"></div>
          </div>
          <div class="cargando">Cargando...</div>

        </div>

        }
      <div className="calendar" style={{ top: "-200px" }}>

        <div className="header">
          <img onClick={() => {
            getWeekNumber()
            setPrevWeek()
            setMenos(menos - 1)
            setMas(mas - 1)
            resetearHorarios()


          }} className={menos === -1 ? "imgflecha2 izq" : "imgflecha izq"} src="../src/assets/menorque.png" alt="menos" />
          <div>
            <p className={menos === 0 ? "semText2" : "semText"}>{`Semana del ${formatDate(days[0])} al ${formatDate(days[6])}`}</p>

          </div>
          <img onClick={() => {
            getWeekNumber()
            setNextWeek()
            setMenos(menos + 1)
            setMas(mas + 1)
            resetearHorarios()


          }} className={mas === 1 ? "imgflecha2 der" : "imgflecha der"} src="../src/assets/mayorque.png" alt="mas" />
        </div>
        <table className="tabla">
          <thead>
            <tr>
              <th>Nombre de Empleado</th>
              {days.map((day, i) => (
                <th key={i}>{daysOfWeek[i] + " "}
                  {day.getDate()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="">
            {/* validacion para empleados de la bd */}
            {empleados.map((empleado, empleadoIndex) => (
              <tr key={empleadoIndex} className="borderTable2">
                <td className="colorNombre" style={{ width: "120px", height: "100px" }} > <p>{empleado.nombr + " " + empleado.apepa}</p></td>
                {days.map((day, i) => (
                  <td onClick={(e) => {
                    menos === -1 ?
                      Swal.fire("Error!", "Solo Consulta!", "error")
                      : (
                        setEmpleadoIndex(empleadoIndex),

                        setHora(hora),
                        setI(i),
                        mostrarFormularioHandler(e, day)

                        // console.log("dia:", day)
                      )

                  }} id="celdaInfo" className={empleado.horarios[i] ? "boderTable sinfondo" : "borderTable fondomas"} key={i} style={{ width: "120px", height: "100px" }}>
                    <div id="divCelda"  >   {/* <img id="botonMas" src="../src/assets/mas.png" height={"15px"} alt="" /> */}
                      {diaSeleccionado && <span style={{ height: "100px" }} >{empleado.horarios[i].hoini==="000000"? "DESCANSO" :(empleado.horarios[i]?empleado.horarios[i].hoini.slice(0,5)+"-"+empleado.horarios[i].hofin.slice(0,5):"")}</span>}
                    </div>
                  </td>
                ))}
              </tr>
            ))}


          </tbody>
        </table>  <div>

        </div>
        {/* validacion para mostrar formulario */}
        {
          mostrarFormulario && (
            <div className="b formularioHorario">
              <div>
                <form className="Formulario">
                  <div className="centrar">
                    <div>
                      <h1 style={{ color: "#0304f5" }}>Horario</h1>
                      <div className="inLine">
                        <label>Nombre:  </label> <p>{empleados[empleadoIndex].nombr}</p>
                      </div>

                      <div className="inLine">
                        <label>Fecha</label><label>{formatDate(day)}</label>
                      </div>

                      <div className="inLine">
                        <label>Descanso</label><input value={inputTime} onClick={(e) => {
                          // console.log("valor:  ", e.target.value)
                          // ,
                          setValor(true)
                        }} type="checkbox" onChange={(e) => {
                          setMostrarBotonEntrada(!mostrarBotonEntrada)
                          setInputTime(!inputTime)
                          setHora("000000")
                          setResultTime("000000")
                          // if(e.target){
                          //   console.log("botonDescanso: ",mostrarBotonEntrada);
                          // }
                        }}
                        />
                      </div>

                      <div style={{ display: mostrarBotonEntrada ? "block" : "none" }} className="inLine">
                        <label>Hora Entrada</label><input id="horarioInput" type="time" onChange={(e) => {
                          e.preventDefault()
                          setHora(e.target.value)
                          validarMinutos(e)
                          sumarHoras()
                        }} step="1800" />

                      </div>

                    </div>

                    <div className="inLine">

                      <button className="btn2" onClick={(e) => {
                        e.preventDefault()
                        setMostrarBotonEntrada(true)
                        setMostrarFormulario(false)
                        // document.getElementById("botonGuardar").style.display = "block"
                        const copy2 = [...empleados];
                        copy2[empleadoIndex].horarios[i] = "";
                        setEmpleados(copy2)
                        setHora()
                        setTotal(total => total - x)

                      }}>Cancelar</button>
                      <button className="btn" type="submit" onClick={(e) => {
                        e.preventDefault()
                        const handleChange = (empleadoIndex, diaIndex, value, hora) => {
                              console.log("value",value)
                              console.log("hora",hora)
                              
                              if (hora === "000000" ) {
                          console.log("mandaste un descanso")
                          
                              let respuesta2=  empleados[empleadoIndex].horarios.filter(horario=>horario.hoini==="000000")
                              if(respuesta2){
                               return Swal.fire(
                                'Error!',
                                '!Ya has registrado un dia de Descanso!',
                                'error'
                              ) 
                             
                              
                            }
                            
                            enviarHorario(localStorage.getItem("numeroEmpleado"), empleados[empleadoIndex].sucur, semanaAConsultar, empleados[empleadoIndex].noemp, formatearFecha(day), hora, resultTime)
                              }
                              
                          
                            };
                        // document.getElementById("botonGuardar").style.display = "inline"
                        setMostrarBotonEntrada(true)
                        setMostrarFormulario(false)
                        // console.log("hora: ", hora);
                        setValor(false)
                        if (inputTime === true) {
                          // console.log("ya existe un dia de descanso")
                          console.log("numeroJefe", localStorage.getItem("numeroEmpleado")),
                          console.log("empleadoIndice",empleadoIndex),
                            console.log("sucur", empleados[empleadoIndex].sucur),
                            console.log("semanaAconsultar", semanaAConsultar),
                            console.log("numeroEmpleado", empleados[empleadoIndex].noemp),
                            console.log("fecha", formatearFecha(day)),
                            console.log("hoini", hora),
                            console.log("hofin", resultTime)
                            setHora(null)
                            setResultTime(null)
                            
                          } else {
                            
                         handleChange(empleadoIndex, i, formatearFecha(day), "000000"),
                            console.log("empleadoIndice",empleadoIndex),
                            console.log("numeroJefe", localStorage.getItem("numeroEmpleado")),
                            console.log("sucur", empleados[empleadoIndex].sucur),
                            console.log("semanaAconsultar", semanaAConsultar),
                            console.log("numeroEmpleado", empleados[empleadoIndex].noemp),
                            console.log("fecha", formatearFecha(day)),
                            console.log("hoini", convertirFormatoHora(hora)),
                            console.log("hofin", convertirFormatoHora(resultTime))
                            // enviarHorario(localStorage.getItem("numeroEmpleado"), empleados[empleadoIndex].sucur, semanaAConsultar, empleados[empleadoIndex].noemp, formatearFecha(day), hora, resultTime)
                            setHora(null)
                            setResultTime(null)
                          }
                          if(!hora && !inputTime===false){
                          return Swal.fire("Registra un Horario o Descanso","Error","error")
                          }
                          // enviarHorario(localStorage.getItem("numeroEmpleado"), empleados[empleadoIndex].sucur, semanaAConsultar, empleados[empleadoIndex].noemp, formatearFecha(day), hora, resultTime)

                        // enviarHorario(localStorage.getItem("numeroEmpleado"), empleados[empleadoIndex].sucur, semanaAConsultar, empleados[empleadoIndex].noemp, formatearFecha(day), hora, resultTime),
                        consultarHorariosDeLaSemana()
                        setHora(null)
                        setResultTime(null)
                        // setTotal(total => total + x)
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




      </div>
      {
                total <= "99.8" ?
                  <div className="CuentaAtras">
                    <CountdownComponent ></CountdownComponent>
                  </div> :
                  <div className="CuentaAtras">
                    <p className="btn">Copiar Horario a siguiente semana</p>
                  </div>

              }
      </div>
    );
  }
  if (empleados.length == 0) {
    return (
      <div className="calendar">
        <div className="header">
          <img onClick={() => {
            setPrevWeek()
            setMenos(menos - 1)
            setMas(mas - 1)
            consultarHorariosDeLaSemana()
          }} style={{ display: menos == -1 ? "none" : "" }} className="imgflecha izq" src="../src/assets/anterior.png" alt="menos" />
          <p className="semText">{`Semana del ${formatDate(days[0])} al ${formatDate(days[6])}`}</p>
          <img onClick={() => {
            setNextWeek()
            setMenos(menos + 1)
            setMas(mas + 1)
            consultarHorariosDeLaSemana()
          }} style={{ display: mas == 1 ? "none" : "" }} className="imgflecha der" src="../src/assets/proximo.png" alt="mas" />
        </div>
        <h1>No Hay Empleados Disponibles</h1>
      </div>
    );
  }


};

export default Calendar;