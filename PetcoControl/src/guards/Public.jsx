import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
const Public = ({ children }) => {
  // useNavigate() -> hook, funcion
  // <Navigate> -> Componente
  const { authed } = useAuthContext()
  if (authed) {
    return <Navigate to='/home/agenda' replace />
  }
  return (
    <>
      {children}
    </>
  )
}
export default Public
// para todas las rutas publicas, se carga cuando se genera un cambio de estado
