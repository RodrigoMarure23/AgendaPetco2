import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Photo from "../components/Photo"
import App from '../App'
import ErrorPage from '../components/ErrorPage'
import Incidencias from '../components/Incidencias'
import Fotografias from '../components/Fotografias'
import Calendar from '../components/Calendario'
import Calendario2 from "../components/Calendario2"
import Login from '../components/Login'
import Public from '../guards/Public'
import Private from "../guards/Private"
const Paths = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Login/>} replace/>
            <Route path="/login" element={<Public><Login/></Public>}index/>

              <Route path='/home'  element={<Private><App/></Private>}>
              <Route path='agenda' element={<Calendar/>}/>
              <Route path='incidencias' element={<Incidencias/>}/>
              <Route path='fotografias' element={<Fotografias/>}/>
              {/* <Route path='*' element={<ErrorPage/>} /> */}
            </Route>
            <Route path='/calendario' element={<Calendario2/>}/>
            <Route path='*' element={<ErrorPage/>}/>
        </Routes>
    </Router>
  )
}

export default Paths