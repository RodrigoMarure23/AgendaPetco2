import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import {  setSession } from '../utils/jwt'
// import { useNavigate } from 'react-router-dom'
// isValidToken,
const AuthContext = createContext({
  authed: false,
  init: false,
  numeroEmpleado:null
})

const AuthProvider = ({ children }) => { // todo lo que se exporta como funciones o valores va a al initialState
  const [authed, setAuthed] = useState(
    // return isValidToken(window.localStorage.token)
  )
  const [numeroEmpleado,setNumeroEmpleado]=useState(null)
  const [init, setInit] = useState(false) // esta es para cuando el usuario recarga el navegador sirve para saber el estado iniical del proyecto
  // funciones para modificar el contexto (estado global)
  

  // logout
  const logOut = () => {
    setSession(null)
    setAuthed(false)
    setInit(false)
    setNumeroEmpleado(null)
    localStorage.setItem("numeroTienda",null)
    localStorage.setItem("numeroEmpleado",null)
    localStorage.setItem("empleadosRecuperadosAgenda",null)
  }
  // cuando se actualize el navegador va a setear el login
  useEffect(() => {
    const token = window.localStorage.token || ''
    setInit(true) // se recargo el navegador     va abajo=>&& isValidToken
    try {
      if (token ) {
        setAuthed(true)
        setSession(token)
        console.log("ya existe un token")
      } else {
        setAuthed(false)
        console.log("no existe un token")
      }
    } catch (error) {
      setAuthed(false)
      console.log("error al crear un token")
    }


  }, [])



  const initialState = {
    authed,
    setAuthed,
    setInit,
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