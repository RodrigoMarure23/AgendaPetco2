import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import { isValidToken, setSession } from '../utils/jwt'

const AuthContext = createContext({
  authed: false,
  init: false,
  loginAuth: () => new Promise()
})

const AuthProvider = ({ children }) => { // todo lo que se exporta como funciones o valores va a al initialState
  const [authed, setAuthed] = useState(() => {
    return isValidToken(window.localStorage.token)
  })
  const [init, setInit] = useState(false) // esta es para cuando el usuario recarga el navegador sirve para saber el estado iniical del proyecto
  // funciones para modificar el contexto (estado global)
  const loginAuth = async (username, password) => {
    const response = await axios.post('https://dummyjson.com/auth/login', { username, password })
    const user = response.data // extraemos los datos del usuario
    setSession(user.token) // guardamos el token en localStorage
    setAuthed(true) // iniicio la sesiom
    console.log(user.token)
  }

  // logout
  const logOut = () => {
    setSession(null)
    setAuthed(false)
  }
  // cuando se actualize el navegador va a setear el login
  useEffect(() => {
    const token = window.localStorage.token || ''
    setInit(true) // se recargo el navegador
    try {
      if (token && isValidToken) {
        setSession(token)
        setAuthed(true)
      } else {
        setAuthed(false)
      }
    } catch (error) {
      setAuthed(false)
    }
  }, [])

  const initialState = {
    loginAuth,
    authed,
    init,
    logOut
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