import { createContext, useContext, useEffect, useState } from 'react'
//contexto para guardar horario de la semana e incidencias
const ShopContext= createContext(null)
ShopContext.displayName="tiendaPetco"

const methods=()=>{
  const [sms, setSms] = useState({ type: '' })
  // const [empleados,setEmpleados]=useState([
  //   {nombre:"Rodrigo Marure Sanchez",imagen:"../src/assets/ad.png",horarios:["22 may 2023//Descanso","23 may 2023//00:00-09:00","24 may 2023//00:00-09:00","","26 may 2023//00:00-09:00","",""],descanso:true,incidencia:["Permiso sin Gose de Sueldo--15 may 2023","","","","","",""]},
  //   {nombre:"Sanchez Rodrigo Marure", imagen:"",horarios:["22 may 2023//Descanso","","","","","",""],descanso:true,incidencia:["","","","","","",""]},
  //   {nombre:"Lizbeth Franco Llana", imagen:"../src/assets/caramujer.png",horarios:["","","","","","",""],descanso:"",incidencia:["","","","","","",""]},
  //   {nombre:"Messi Messi messi", gerente:true,imagen:"../src/assets/mesi.png",horarios:["22 may 2023//Descanso","23 may 2023//00:00-09:00","","25 may 2023//00:00-09:00","","",""],descanso:true,incidencia:["","","","","","",""]},
  //   {nombre:"Will Smith ", imagen:"../src/assets/willsmit.png",horarios:["","","","","","",""],descanso:"",incidencia:["","","","","","",""]},
  //   {nombre:"Will Smith2 ", imagen:"../src/assets/willsmit.png",horarios:["22 may 2023//00:00-09:00","","","","","",""],descanso:"",incidencia:["Permiso sin Gose de Sueldo--15 may 2023","Permiso sin Gose de Sueldo--16 may 2023","Permiso sin Gose de Sueldo--17 may 2023","Permiso sin Gose de Sueldo--18 may 2023","Permiso sin Gose de Sueldo--19 may 2023","Permiso sin Gose de Sueldo--20 may 2023","Permiso sin Gose de Sueldo--21 may 2023"]},
  //   {nombre:"empleado imaginario 4 ", imagen:"",horarios:["","","","","","",""],descanso:"",incidencia:["","","","","","",""]},
  //   {nombre:"Will Smith3 ", imagen:"../src/assets/cara.png",horarios:["22 may 2023//00:00-09:00","","","","","",""],descanso:"",incidencia:["","","","","","",""]},
  //   {nombre:"empleado imaginario 2 ", imagen:"../src/assets/cara4.png",horarios:["","","","","","",""],descanso:"",incidencia:["","","","","","",""]},
  //   {nombre:"anonima sanchez ", imagen:"",horarios:["","","","","","",""],descanso:"",incidencia:["","","","","","",""]},
  // ])
const [empleados,setEmpleados]=useState([])
const [total,setTotal]=useState(null)
const [infoTiendaGlobal,setInfoTiendaGlobal]=useState("Tienda numero 9999 MIYANA");
  const [textoRuta,setTextoRuta]=useState("Agenda")
  const [data,setData]=useState(()=>{
    const cache=window.localStorage.data ? JSON.parse(window.localStorage.data) :[]
    return cache
  })
  const isCache = data.length===0
  const saveSchedule=(entries=[])=>{
    if(isCache){ //convierte cache en un objeto tipo JSON
      setData(entries)
      window.localStorage.data=JSON.stringify(entries)
      setSms({
        type:"success",
        message:"Horario guardado exitosamente"
      })
    }else{
      setData(data)
    }
  }

  const saveTextDash=(text)=>{
    setTextoRuta(text)
  }
  return{
    empleados,setEmpleados,
    infoTiendaGlobal,
    data,
    isCache,setTextoRuta,
    saveSchedule,
    sms,
    saveTextDash,
    textoRuta,setTextoRuta,
    total,setTotal
  }
}

const ShopProvider = ({children})=>{
  const initialValues=methods()
  return(
    <ShopContext.Provider value={initialValues}>
      {children}
    </ShopContext.Provider>
  )
}

const useShopContext = () =>{
  return useContext(ShopContext)
}

export {useShopContext,ShopProvider}