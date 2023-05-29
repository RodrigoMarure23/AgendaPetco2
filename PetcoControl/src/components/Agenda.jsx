import React, { useState } from "react";
import "../styles/index.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useShopContext } from "../context/ShopContext";
const Agenda = () => {
  const {setTextoRuta}=useShopContext()
 
  const {infoTiendaGlobal}=useShopContext()
  const navigate = useNavigate();
  const [componenteActivo,setComponenteActivo]=useState("A")
  const handleClick=(componente)=>{
    setComponenteActivo(componente)
  }

  return (
    <div className="Border">
      <div className="NBorder">
        <div className="TextoDashboard">
          <p style={{ fontWeight: "bold", marginLeft: "5px" }}>
            {infoTiendaGlobal}
          </p>
          <div className="gap">
            <button id="boton1"
            className={componenteActivo==="A"?"btn":"btn gris"}
              onClick={(e) => {navigate("/home/agenda")
            handleClick("A")
            setTextoRuta("Agenda")
            }}
              
            >
              Agenda
            </button>
            <button id="boton2"
            className={componenteActivo==="B"?"btn":"btn gris"}
              onClick={(e) => {navigate("/home/incidencias")
              handleClick("B")
              setTextoRuta("Incidencias")
            }
            }
              
            >
              Incidencias
            </button>
            <button id="boton3"
            className={componenteActivo==="C"?"btn":"btn gris"}
              onClick={(e) => {navigate("/home/fotografias")
              handleClick("C")
              setTextoRuta("Fotografias")}}
              
            >
              Fotografias
            </button>
          </div>
        </div>

        <div className="NBorder">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Agenda;
