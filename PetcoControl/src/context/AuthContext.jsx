import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import { isValidToken, setSession } from '../utils/jwt'

const AuthContext = createContext({
  authed: false,
  init: false,
  loginAuth: () => new Promise(),
  numeroEmpleado:null
})

const AuthProvider = ({ children }) => { // todo lo que se exporta como funciones o valores va a al initialState
  const [authed, setAuthed] = useState(() => {
    return isValidToken(window.localStorage.token)
  })
  const [numeroEmpleado,setNumeroEmpleado]=useState(null)
  const [init, setInit] = useState(false) // esta es para cuando el usuario recarga el navegador sirve para saber el estado iniical del proyecto
  // funciones para modificar el contexto (estado global)
  const loginAuth = async (noEmpleado, tipoNotificacion) => {
    const response = await axios.post('https://app.petco.com.mx/generaCodigo', { noEmpleado, tipoNotificacion }, {headers:{"x-api-pe-wss": "681ae67106810684b039e48aa9aa2c6d440ef1867e71f96bb98515a104c77c5b"}})
    const user = response.data // extraemos los datos del usuario
    // setSession(user.token) // guardamos el token en localStorage
    // setAuthed(true) // iniicio la sesiomk
    console.log("RespuestaPetco: ",user)
  }

  // logout
  const logOut = () => {
    setSession(null)
    setAuthed(false)
    setNumeroEmpleado(null)
  }
  // cuando se actualize el navegador va a setear el login
  useEffect(() => {
    // const token = window.localStorage.token || ''
    // setInit(true) // se recargo el navegador
    // try {
    //   if (token && isValidToken) {
    //     setSession(token)
    //     setAuthed(true)
    //   } else {
    //     setAuthed(false)
    //   }
    // } catch (error) {
    //   setAuthed(false)
    // }
  }, [])

  const initialState = {
    loginAuth,
    authed,
    init,
    logOut,
    numeroEmpleado,
    setNumeroEmpleado
  }
  // console.log(authed)
  return (
    <AuthContext.Provider value={initialState}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuthContext = () => {
  return useContext(AuthContext)
}

export { AuthProvider, useAuthContext}