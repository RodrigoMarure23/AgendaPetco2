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
  const [empleadosCopia, setEmpleadosCopia] = useState([...empleados]);
  const [diaSeleccionado, setDiaSeleccionado] = useState(null);
  const startDay2 = new Date();
  // const [diaIncio, setDiaIncio] = useState(startDay2);
  // const [diaFin, setDiaFin] = useState(startDay2);
  const [startDay, setStartDay] = useState(startDay2);
  const copia2=[...empleados]
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [dia, setDia] = useState();
  const [incidencia, setIncidencia] = useState("");
  const [menos, setMenos] = useState(0);
  const [mas, setMas] = useState(0);
  const [fecha, setFecha] = useState(null);
  const respuesta=[]
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
    document.getElementById("botonGuardar").style.display = "none";
  };
  const handleChange = (empleadoIndex, diaIndex, value, dia) => {
    // const updatedEmpleados = [...empleados];
    // updatedEmpleados[empleadoIndex].incidencias[diaIndex] = value + "--" +dia;
    // setEmpleados(updatedEmpleados);
    if (!value || value === "default" ) {
      Swal.fire("Error!", "Ingresa una Incidencia!", "error");
      const updatedEmpleados = [...empleados];
      updatedEmpleados[empleadoIndex].incidencias[diaIndex] ="" ;
      setEmpleados(updatedEmpleados);
      return;
    }
    switch (value) {
      case "103":
        const updatedEmpleados3 = [...empleados];
        updatedEmpleados3[empleadoIndex].incidencias[diaIndex] =
        value + "--" + "EMPLEADO DEL MES" + "--" + dia ;
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
      days.push(date);
    }
    return days;
  };

  const formatDate = (date) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    return new Intl.DateTimeFormat("es-MX", options).format(date);
  };

  const days = getDaysOfWeek();

 
  const resetearIncidencias=()=>{
    const nuevoArray3=empleados.map(empleado=>({
      ...empleado,
      incidencias:["","","","","","",""]
    }))
    setEmpleados(nuevoArray3)

  }

  const consultarIncidenciasDeLaSemana=()=>{
   
    // setEmpleadosCopia([...empleados])
    // function convertirFecha(fecha) {
    //   const fechaObjeto = new Date(fecha);
    //   const año = fechaObjeto.getFullYear();
    //   const mes = String(fechaObjeto.getMonth() + 1).padStart(2, '0');
    //   const dia = String(fechaObjeto.getDate()).padStart(2, '0');
      
    //   return `${año}${mes}${dia}`;
    // }
   
    if(menos===0  && mas===0){
      console.log(startDay)
      let diainico=days[0]
      let diafin =days[6]
      console.log("diainicio",formatearFecha(diainico))
      console.log("diaFin: ",formatearFecha(diafin))
      console.log("semana a consultar pasada")
      
      return recuperadata(formatearFecha(diainico),formatearFecha(diafin))

      

    }
 
    
    if(menos===-1 && mas===-1){
      resetearIncidencias()
      console.log(startDay)
      let diainico=days[0]
      let diafin =days[6]
      console.log("diainicio",formatearFecha(diainico))
      console.log("diaFin: ",formatearFecha(diafin))
      console.log("semana a consultar pasada")
      
      return recuperadata(formatearFecha(diainico),formatearFecha(diafin))

    }
    if(menos===-2 && mas===-2){
      resetearIncidencias()
      console.log(startDay)
      let diainico=days[0]
      let diafin =days[6]
      console.log("diainicio",formatearFecha(diainico))
      console.log("diaFin: ",formatearFecha(diafin))
      console.log("semana a consultar pasada")
      
      return recuperadata(formatearFecha(diainico),formatearFecha(diafin))


    }else{
      console.log("==========")
      console.log("semana no valida")
      window.alert("SEMANA NO VALIDA")
      console.log("///////////////")
      // console.log("valor",value)
      return
    }
  }
  
  const recuperadata = async (diaincio,diafin) => {
  
        empleados.map(async (empleado, indexempleado) => {
          try {
            const {data} = await axios.get(
            `https://petcomplete.petco.com.mx/asistencias/consultaIncidencias/${empleado.noemp}/${diaincio}/${diafin}`
          );
          console.log("incidenciasRecuperadas del empleado "+empleado.nombr, data.data);
          if (data.replyCode == 200) {
            const newData = [...empleados,
              
            ];
           console.log("data.data",data.data.incidencias[0].fecha)
           respuesta.push({
            noemp:empleado.noemp,
            incidencias:data.data.incidencias
           })
          //  data.data.incidencias.map((incidd,inciddIndex)=>{
          //   if(incidd.fecha==empleado.fechas[])
          //  })
           newData[indexempleado].incidencias=data.data.incidencias
           return setEmpleados(newData); 
           
          }if(data.replyCode==404 || !data.data.incidencias){
            console.log("no se encontraron incidencias")
            return
          }
          // else{
          //   return console.log('no')
          // }
          } catch (error) {
           return console.log("errorENRecuperarData: ",error)
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
  const copia3=[...empleados]
  const addDayDate=()=>{
    console.log("daysenADD",days)
    console.log("COPIAEMPLEADOS: ",copia3
    )
    const nuevoArray2= copia3.map(empleado=>({
      ...empleado,
      fechas:[{fecha:formatearFecha(days[0])},{fecha:formatearFecha(days[1])},{fecha:formatearFecha(days[2])},{fecha:formatearFecha(days[3])},{fecha:formatearFecha(days[4])},{fecha:formatearFecha(days[5])},{fecha:formatearFecha(days[6])}]
    }))
   
    console.log("nuevoArray",nuevoArray2)
     return setEmpleados(nuevoArray2)
  }
  

  // const compararFechas=()=>{
  //   if()
  // }
  useEffect(() => {
    console.log("---------------------------");
    setDiaSeleccionado(true)
    consultarIncidenciasDeLaSemana()
    addDayDate()
    console.log("days",days)
    console.log("fechasEmpleado",empleados)
    console.log("Respuesta:",respuesta)
    // setDiaIncio(days[0])
    // setDiaFin(days[6])
    // console.log("dia",diaSeleccionado)
    
    // console.log("menos",menos)
    // console.log("mas",mas)
    
    
  // console.log("copia2",copia2)
  
    
    
  }, [diaSeleccionado,dia,menos,mas,incidencia]);

  
  if (empleados.length > 0) {
    return (
      <div className="calendar">
        <div className="header">
          <img
            onClick={() => {
              setPrevWeek();
              setMenos(menos - 1);
              setMas(mas - 1);
              resetearIncidencias()
              
            }}
            
            className={menos===-2?"imgflecha2 izq":"imgflecha izq"}
            src="../src/assets/menorque.png"
            alt="menos"
          />
          <p className={menos==0?"semText2":"semText"}>{`Semana del ${formatDate(
            days[0]
          )} al ${formatDate(days[6])}`}</p>
          <img
            onClick={() => {
              setNextWeek();
              setMenos(menos + 1);
              setMas(mas + 1);
              
            }}
            
            className={mas===0?"imgflecha2 der":"imgflecha der"}
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
                <td>
                  <p>{empleado.nombr + " " + empleado.apepa}</p>
                </td>
                {days.map((day, i) => (
                  <td
                    onClick={(e) => {
                      setEmpleadoIndex(empleadoIndex);
                      setI(i);
                      mostrarFormularioHandler(e, day);
                      setFecha(formatDate(day));
                      console.log("diapicado: ", formatearFecha(day));
                      console.log(
                        "empleado.incidencias[i]: ",
                        empleado.incidencias[i]
                      );
                    }}
                    className={empleado.incidencias[i]?"boderTable sinfondo":"borderTable fondomas"}
                    key={i}>
                    
                     <div>
                     { diaSeleccionado &&  <span >{empleado.incidencias[i]?empleado.incidencias[i].incid:""}</span>}
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
                        document.getElementById("botonGuardar").style.display =
                          "block";
                        const copy2 = [...empleados];
                        copy2[empleadoIndex].incidencias[i] ="";
                        setEmpleados(copy2);
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
                        setMostrarFormulario(false);
                        document.getElementById("botonGuardar").style.display =
                          "block";
                        setIncidencia("");
                        // enviarIncidencia(
                        //   empleadosCopia[empleadoIndex].noemp,
                        //   empleadosCopia[empleadoIndex].njefe,
                        //   localStorage.getItem("numeroTienda"),
                        //   dia,
                        //   incidencia
                        // );
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

        <button id="botonGuardar" className="btn  botonGuardar">
          GuardarTODO
        </button>
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
