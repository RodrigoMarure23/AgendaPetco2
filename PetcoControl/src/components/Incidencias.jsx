import React, { useEffect, useState } from "react";
import "../styles/index.css";
import { useShopContext } from "../context/ShopContext";
import Swal from "sweetalert2";
import axios from "axios";
import { format, set } from "date-fns";

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
  const { empleados, setEmpleados } = useShopContext();
  const [diaSeleccionado, setDiaSeleccionado] = useState(null);
  const startDay2 = new Date();
  // const [diaIncio, setDiaIncio] = useState(startDay2);
  // const [diaFin, setDiaFin] = useState(startDay2);
  const [startDay, setStartDay] = useState(startDay2);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [dia, setDia] = useState();
  const [incidencia, setIncidencia] = useState("");
  const [menos, setMenos] = useState(0);
  const [mas, setMas] = useState(0);
  const [fecha, setFecha] = useState(null);
  const [diaincio, setDiaIncio] = useState()
  const respuesta = []
  const [carga,setCarga]=useState(false)
  const incidencias = {
    "103": "EMPLEADO DEL MES",
    "112": "PRIMA DOMINICAL",
    "120": "AYUDA DE TRANSPORTE",
    "511": "ACCIDENTE DE TRANSITO",
    "512": "ACCIDENTE DE TRABAJO",
    "513": "INCAPACIDAD POR MATERNIDAD",
    "515": "ENFERMEDAD GENERAL",
    "525": "FALTANTE DE CAJA",
    "601": "PERMISO SIN GOSE DE SUELDO",
    "602": "FALTA INJUSTIFICADA",
    "603": "SANCION ADMINISTRATIVA",
    "FL": "FESTIVO LABORADO",
    "VA": "VACACIONES"
  };
  // const [semana0,setSemana0]=useState(null)
  // const [semana1,setSemana1]=useState(null)
  // const [semana2,setSemana2]=useState(null)

  // const indicesIncidencias = async () => {
  //   const incidenciasObtenidas = await axios.get(
  //     "https://petcomplete.petco.com.mx/asistencias/catalogoIncidencias"
  //   );
  //   setIndexIncidencia(incidenciasObtenidas.data.data);
  //   //  console.log("incidenciasObtenidas: ",incidenciasObtenidas.data.data)
  // };

  const [empleadoIndex, setEmpleadoIndex] = useState();
  const [i, setI] = useState();
  // const fechaSemanaPasada = startDay2.setDate(startDay2.getDate()); //seteamos la fecha de la semana pasada
  const mostrarFormularioHandler = (e, day) => {
    e.preventDefault();
    // setDiaSeleccionado(day.getDate())
    setDia(formatearFecha(day));

    // console.log("mostrar Formulario"); day es el dia de hoy, hora  ala que se realiza la consulta
    setMostrarFormulario(true);
    // document.getElementById("botonGuardar").style.display = "none";
  };
  const handleChange = (empleadoIndex, diaIndex, value, dia) => {
    // const updatedEmpleados = [...empleados];
    // updatedEmpleados[empleadoIndex].incidencias[diaIndex] = value + "--" +dia;
    // setEmpleados(updatedEmpleados);
    if (!value || value === "default") {
      Swal.fire("Error!", "Ingresa una Incidencia!", "error");
      const updatedEmpleados = [...empleados];
      updatedEmpleados[empleadoIndex].incidencias[diaIndex] = "";
      setEmpleados(updatedEmpleados);
      return;
    }
    switch (value) {
      case "103":
        const updatedEmpleados3 = [...empleados];
        updatedEmpleados3[empleadoIndex].incidencias[diaIndex] =
          value + "--" + "EMPLEADO DEL MES" + "--" + dia;
        setEmpleados(updatedEmpleados3);

        break;

      case "112":
        const updatedEmpleados4 = [...empleados];
        updatedEmpleados4[empleadoIndex].incidencias[diaIndex] =
          value + "--" + "PRIMA DOMINICAL" + "--" + dia;
        setEmpleados(updatedEmpleados4);

        break;

      case "120":
        const updatedEmpleados5 = [...empleados];
        updatedEmpleados5[empleadoIndex].incidencias[diaIndex] =
          value + "--" + "AYUDA DE TRANSPORTE" + "--" + dia;
        setEmpleados(updatedEmpleados5);

        break;

      case "511":
        const updatedEmpleados6 = [...empleados];
        updatedEmpleados6[empleadoIndex].incidencias[diaIndex] =
          value + "--" + "ACCIDENTE DE TRANSITO" + "--" + dia;
        setEmpleados(updatedEmpleados6);

        break;

      case "512":
        const updatedEmpleados7 = [...empleados];
        updatedEmpleados7[empleadoIndex].incidencias[diaIndex] =
          value + "--" + "ACCIDENTE DE TRABAJO" + "--" + dia;
        setEmpleados(updatedEmpleados7);

        break;

      case "513":
        const updatedEmpleados8 = [...empleados];
        updatedEmpleados8[empleadoIndex].incidencias[diaIndex] =
          value + "--" + "INCAPACIDAD POR MATERNIDAD" + "--" + dia;
        setEmpleados(updatedEmpleados8);

        break;

      case "515":
        const updatedEmpleados9 = [...empleados];
        updatedEmpleados9[empleadoIndex].incidencias[diaIndex] =
          value + "--" + "ENFERMEDAD GENERAL" + "--" + dia;
        setEmpleados(updatedEmpleados9);

        break;

      case "525":
        const updatedEmpleados10 = [...empleados];
        updatedEmpleados10[empleadoIndex].incidencias[diaIndex] =
          value + "--" + "FALTANTE DE CAJA" + "--" + dia;
        setEmpleados(updatedEmpleados10);

        break;

      case "601":
        const updatedEmpleados11 = [...empleados];
        updatedEmpleados11[empleadoIndex].incidencias[diaIndex] =
          value + "--" + "PERMISO SIN GOSE DE SUELDO" + "--" + dia;
        setEmpleados(updatedEmpleados11);

        break;

      case "602":
        const updatedEmpleados12 = [...empleados];
        updatedEmpleados12[empleadoIndex].incidencias[diaIndex] =
          value + "--" + "FALTA INJUSTIFICADA" + "--" + dia;
        setEmpleados(updatedEmpleados12);

        break;

      case "603":
        const updatedEmpleados13 = [...empleados];
        updatedEmpleados13[empleadoIndex].incidencias[diaIndex] =
          value + "--" + "SANCION ADMINISTRATIVA" + "--" + dia;
        setEmpleados(updatedEmpleados13);

        break;

      case "FL":
        const updatedEmpleados14 = [...empleados];
        updatedEmpleados14[empleadoIndex].incidencias[diaIndex] =
          value + "--" + "FESTIVO LABORADO" + "--" + dia;
        setEmpleados(updatedEmpleados14);

        break;

      case "VA":
        const updatedEmpleados15 = [...empleados];
        updatedEmpleados15[empleadoIndex].incidencias[diaIndex] =
          value + "--" + "VACACIONES" + "--" + dia;
        setEmpleados(updatedEmpleados15);

        break;
      default:
        break;
    }
    if (!value && !dia) {
      const updatedEmpleados = [...empleados];
      updatedEmpleados[empleadoIndex].incidencias[diaIndex] = value + dia;
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
  const formatearFecha = (fecha) => {
    const formato = "yyyyMMdd";
    const fechaFormateada = format(fecha, formato);
    return fechaFormateada;
  };
  const getDaysOfWeek = () => {
    const days = [];
    const startDate = new Date(startDay);
    startDate.setDate(startDate.getDate() - startDate.getDay() + 1); // Cambiar el inicio de la semana al lunes
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      // console.log(formatearFecha(date))
      days.push(date);
    }
    // console.log("days:", days)
    return days;
  };
  const formatearsemana = () => {
    // days.map((dia, i) => {
    //   console.log("dats", days[i])

    // })
  }

  const formatDate = (date) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    // console.log(new Intl.DateTimeFormat("es-MX", options).format(date))
    return new Intl.DateTimeFormat("es-MX", options).format(date);
  };

  const formatDate2 = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${year}${month}${day}`;
    return formattedDate;
  };
  const days = getDaysOfWeek();
  const days2 = []
  const copyDays = () => {

    for (let i = 0; i < 7; i++) {
      let x = formatDate2(days[i])
      days2.push(x)

    } return days2
  }


  const resetearIncidencias = () => {
    const nuevoArray3 = empleados.map(empleado => ({
      ...empleado,
      incidencias: ["", "", "", "", "", "", ""]
    }))
    setEmpleados(nuevoArray3)

  }

  const consultarIncidenciasDeLaSemana = () => {

   

    if (menos === 0 && mas === 0) {
      addDayDate()
      formatearsemana()
      console.log(startDay)
      const diainico = days[0]
      const diafin = days[6]
      console.log("diainicio", formatearFecha(diainico))
      console.log("diaFin: ", formatearFecha(diafin))
      console.log("semana a consultar pasada")

      return recuperadata(formatearFecha(diainico), formatearFecha(diafin))



    }


    if (menos === -1 && mas === -1) {
      resetearIncidencias()
      console.log(startDay)
      addDayDate()
      const diainico = days[0]
      const diafin = days[6]
      console.log("diainicio", formatearFecha(diainico))
      console.log("diaFin: ", formatearFecha(diafin))
      console.log("semana a consultar pasada")

      return recuperadata(formatearFecha(diainico), formatearFecha(diafin))

    }
    if (menos === -2 && mas === -2) {
      addDayDate()
      resetearIncidencias()
      console.log(startDay)
      const diainico = days[0]
      const diafin = days[6]
      console.log("diainicio", formatearFecha(diainico))
      console.log("diaFin: ", formatearFecha(diafin))
      console.log("semana a consultar pasada")

      return recuperadata(formatearFecha(diainico), formatearFecha(diafin))


    } else {
      console.log("==========")
      console.log("semana no valida")
      window.alert("SEMANA NO VALIDA")
      console.log("///////////////")
      // console.log("valor",value)
      return
    }
  }

  const recuperadata = async (diaincio, diafin) => {
    setCarga(true)
    empleados.map(async (empleado, indexempleado) => {
      try {
        const { data } = await axios.get(
          `https://petcomplete.petco.com.mx/asistencias/consultaIncidencias/${empleado.noemp}/${diaincio}/${diafin}`
        );
        // console.log("incidenciasRecuperadas del empleado " + empleado.nombr, data.data);
        if (data.replyCode == 200) {
          // document.getElementById("loader").style.display="none"
          setCarga(false)
          const newData = [...empleados,];
          newData[indexempleado].incidenciasRecibidas = data.data.incidencias
          const acomodarFechasdeIncidencias = () => {

            let copyEmpleado = empleado
            for (let i = 0; i < 7; i++) {
              if (copyEmpleado.incidenciasRecibidas[i]) {
                // console.log("incidenciaind", data.data.incidencias[i].incid)

                let a = data.data.incidencias[i].fecha
                let incidenciaguardada = data.data.incidencias[i]
                // console.log("incidenciafecha", a)
                for (let f = 0; f < 7; f++) {
                  let b = days2[f]
                  // console.log("B", b)
                  if (a == b) {
                    copyEmpleado.incidencias[f] = incidenciaguardada
                  } else {

                  }

                }

              }

            }


          }
          acomodarFechasdeIncidencias()
          empleado.incidencias.forEach(incidencia => {
            if (incidencia.incid) {
              console.log("incidencia:",incidencia.incid+"fecha:",incidencia.fecha)
              incidencia.incid = getIncidenciaDescripcion(incidencia.incid);
            }
          });
          // consultarIncidenciasDeLaSemana()
          return setEmpleados(newData);

        } if (data.replyCode == 404 || !data.data.incidencias) {
          console.log("no se encontraron incidencias")
          return
        }
        // else{
        //   return console.log('no')
        // }
      } catch (error) {
        return console.log("errorENRecuperarData: ", error)
      }
      // console.log("diaaaainicioyfin", startDay2)


    });
  }
  const enviarIncidencia = async (
    numeroempleado,
    njefe,
    sucur,
    fecha,
    indiceinc
  ) => {
    if (!indiceinc) {
      return;
    }
    const sendend = await axios.post(
      "https://petcomplete.petco.com.mx/asistencias/actualizaInicidencias",
      {
        noemp: `${numeroempleado}`,
        njefe: `${njefe}`,
        sucur: `${sucur}`,
        detal: [
          {
            fecha: `${fecha}`,
            incid: `${indiceinc}`,
          },
        ],
      }
    );
    console.log("respuestaGuardarEnviarIncidencia: ", sendend.data);
    Swal.fire("Success!", "Incidencia Registrada Exitosamente!", "success");
    // console.log("numeroEmpleadoo :",numeroempleado)
    // console.log("njefeee :",njefe)
    // console.log("sucurrrr :",sucur)
    // console.log("fechaaaa :",fecha)
    // console.log("indiceincidencia:",indiceinc)
  };
  const copia3 = [...empleados]
  const addDayDate = () => {

    const nuevoArray2 = copia3.map(empleado => ({
      ...empleado,
      fechas: [{ fecha: days2[0] }, { fecha: days2[1] }, { fecha: days2[2] }, { fecha: days2[3] }, { fecha: days2[4] }, { fecha: days2[5] }, { fecha: days2[6] }]
    }))
    setEmpleados(nuevoArray2)

    return console.log("nuevoArray", nuevoArray2)
  }


  // const compararFechas=()=>{
  //   if()
  // }
  function getIncidenciaDescripcion(incidencia) {
    return incidencias[incidencia] || "DESCONOCIDA";
  }
  useEffect(() => {
    console.log("---------------------------");
    setDiaSeleccionado(true)
    consultarIncidenciasDeLaSemana()
    // console.log("empleados: ", empleados)
    addDayDate()

    // console.log("fechasEmpleado", empleados)
    // console.log("Respuesta:", respuesta)
    // console.log("days", days)
    copyDays()
    // console.log("days2", days2)

    // console.log("dia",diaSeleccionado)

    // console.log("menos",menos)
    // console.log("mas",mas)


    // console.log("copia2",copia2)



  }, [diaSeleccionado, incidencia, dia, menos, mas]);


  if (empleados.length > 0) {

    return (
      <div>
        { carga && <div id="contenedor">
  <div class="contenedor-loader">
    <div class="rueda"></div>
  </div>
  <div class="cargando">Cargando...</div>
  
</div>
          
        }
        
        <div className="calendar">
        
        <div className="header">
          <img
            onClick={() => {
              setPrevWeek();
              setMenos(menos - 1);
              setMas(mas - 1);
              resetearIncidencias()

            }}

            className={menos === -2 ? "imgflecha2 izq" : "imgflecha izq"}
            src="../src/assets/menorque.png"
            alt="menos"
          />
          <p className={menos == 0 ? "semText2" : "semText"}>{`Semana del ${formatDate(
            days[0]
          )} al ${formatDate(days[6])}`}</p>
          <img
            onClick={() => {
              setNextWeek();
              setMenos(menos + 1);
              setMas(mas + 1);
              resetearIncidencias()
            }}

            className={mas === 0 ? "imgflecha2 der" : "imgflecha der"}
            src="../src/assets/mayorque.png"
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
            {empleados.map((empleado, empleadoIndex) => (
              <tr key={empleadoIndex} className="borderTable2">
                <td style={{width:"120px",height:"100px"}}>
                  <p>{empleado.nombr + " " + empleado.apepa}</p>
                </td>
                {days.map((day, i) => (
                  <td
                    onClick={(e) => {
                      menos === -2 ? 
                        Swal.fire("Error!", "Solo Consulta!", "error")
                    :
                        (
                        setEmpleadoIndex(empleadoIndex),
                        setI(i),
                        mostrarFormularioHandler(e, day),
                        setFecha(formatDate(day)),
                        console.log("diapicado: ", formatearFecha(day)),
                        console.log(
                          "empleado.incidencias[i]: ",
                          empleado.incidencias[i]
                        )
                      )
                    }}
                    className={empleado.incidencias[i].incid ? "boderTable sinfondo" : "borderTable fondomas"}
                    style={{width:"120px",height:"100px"}}
                    key={i}>

                    <div>
                      {diaSeleccionado && <span >{empleado.incidencias[i] ? empleado.incidencias[i].incid : ""}</span>}
                    </div>



                  </td>
                ))}
              </tr>
            ))}
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
                      <label>Nombre: </label>{" "}
                      <p>{empleados[empleadoIndex].nombr}</p>
                    </div>
                    <div className="inLine">
                      <label>Fecha</label>
                      <label>{fecha}</label>
                    </div>
                    <div className="inLine">
                      <label>Incidencia: </label>
                      <select
                        id="options"
                        onChange={(e) => {
                          setIncidencia(e.target.value);
                        }}
                      >
                        <option value="default">ninguno</option>
                        <option value="103">EMPLEADO DEL MES</option>
                        <option value="112">PRIMA DOMINICAL</option>
                        <option value="120">AYUDA DE TRANSPORTE</option>
                        <option value="511">ACCIDENTE DE TRAYECTO</option>
                        <option value="512">ACCIDENTE DE TRABAJO</option>
                        <option value="513">INCAPACIDAD POR MATERNIDAD</option>
                        <option value="515">INCAPACIDAD POR ENFERMEDAD GNRAL</option>
                        <option value="525">FALTANTE DE CAJA</option>
                        <option value="601">PERMISO SIN GOSE DE SUELDO</option>
                        <option value="602">FALTA INJUSTIFICADA</option>
                        <option value="603">SANCION ADMINISTRATIVA</option>
                        <option value="FL">FESTIVO LABORADO</option>
                        <option value="VA">VACACIONES</option>
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
                        // document.getElementById("botonGuardar").style.display =
                        //   "block";
                        // const copy2 = [...empleados];
                        // copy2[empleadoIndex].incidencias[i] = "";
                        // setEmpleados(copy2);
                      }}
                    >
                      Cancelar
                    </button>
                    
                    <button
                      className="btn"
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        handleChange(empleadoIndex, i, incidencia, dia);
                        console.log("diaaaaaa",dia)
                        setMostrarFormulario(false);
                        
                        setIncidencia("");
                        enviarIncidencia(
                          empleados[empleadoIndex].noemp,
                          empleados[empleadoIndex].njefe,
                          localStorage.getItem("numeroTienda"),
                          dia,
                          incidencia
                        );
                        consultarIncidenciasDeLaSemana()
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

        
        </div>
    </div>
    );
  }
  if (empleados.length == 0) {
    return (
      <div className="calendar">
        <div className="header">
          <img
            onClick={() => {
              setPrevWeek();
              setMenos(menos - 1);
              setMas(mas - 1);
            }}
            style={{ display: menos == -1 ? "none" : "" }}
            className="imgflecha izq"
            src="../src/assets/anterior.png"
            alt="menos"
          />
          <p className="semText">{`Semana del ${formatDate(
            days[0]
          )} al ${formatDate(days[6])}`}</p>
          <img
            onClick={() => {
              setNextWeek();
              setMenos(menos + 1);
              setMas(mas + 1);
            }}
            style={{ display: mas == 1 ? "none" : "" }}
            className="imgflecha der"
            src="../src/assets/proximo.png"
            alt="mas"
          />
        </div>
        <h1>No Hay Empleados Disponibles</h1>
      </div>
    );
  }
};

export default Incidencias;
