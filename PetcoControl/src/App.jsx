import { Outlet, useNavigate } from "react-router-dom"
import "../src/styles/index.css"
import Agenda from "./components/Agenda"
import { ShopProvider, useShopContext } from "./context/ShopContext"
import NavBar from "./components/NavBar.jsx"
function App() {
  // const navigate=useNavigate()
  // const {textoRuta,setTextoRuta}=useShopContext()
 return(
//  <div>
//   <nav className="navbar navbar-expand-lg bg-body-tertiary bg-light">
    
//       <ul className="navbar-nav me-auto ">
        
        
//         <li className="nav-item dropdown">
//           <a className="nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//             <img src="../src/assets/imagen3.png" height={"25px"} />
//           </a>
//           <ul className="dropdown-menu ms-auto">
//             <li><a className="dropdown-item" href="#">Action</a></li>
//             <li><a className="dropdown-item" href="#">Another action</a></li>
//             <li><hr className="dropdown-divider"/></li>
//             <li><a className="dropdown-item" onClick={()=>{navigate("/")}}>Salir</a></li>
//           </ul>
//         </li>
//       </ul>
//       <ul className="navbar-nav petco"> <li className="">
//           <img src="../src/assets/logoPetco1.png" alt="LogoDePetco" height={"35px"} />
//         </li></ul>
//   </nav>
  
//   <div className='total'>
//       <h2 className='azul' style={{right:"20px"}}>{textoRuta}</h2>
//   </div>
//   <Agenda/>
     
  
 
//  </div>
<div>
    <ShopProvider>
      <NavBar></NavBar>
    </ShopProvider>
    
</div>
  )
  
}

export default App
