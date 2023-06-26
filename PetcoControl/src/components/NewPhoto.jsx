import React, { useEffect, useRef, useState } from 'react'
import "../styles/index.css"
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2"
import { useShopContext } from '../context/ShopContext'

const NewPhoto = ({ nombre }) => {
  const { empleados, setEmpleados } = useShopContext()
  const empleados2 = empleados
  const [nombre2, setNombre2] = useState()
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [bin, setBin] = useState()
  const [urlImagen, setUrlImagen] = useState()
  const [img, setImg] = useState(null);
  useEffect(() => {
    setNombre2(nombre)
    console.log("nombredesdeNew", nombre)
    setImg(null)
    try {
      //  startVideo()
      (async () => {
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        });
      })();

      // APAGAR CAMARA WEB
      //   (async () => {
      //     navigator.mediaDevices.getUserMedia({ video: false }).then((stream) => {
      //           videoRef.current.srcObject = stream;
      //           videoRef.current.stop();
      //         });
      // })();
      //  setNombre2(nombre)
      //  const resultado= empleados.filter(empleado=>(empleado.nombre==nombre2))
      //  console.log("resultado",resultado)

    } catch (error) {
      console.log(Error);
    }

    // console.log("imagen: ",imgDataUrl);
    // document.getElementById("botones3").style.display="none"
    console.log("imgenuseE: ", img);
    console.log("bin: ", bin)
  }, [img, nombre]);
  // function startVideo(){
  //   navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
  //     videoRef.current.srcObject = stream;
  //     videoRef.current.play();
  //   });
  // }
  const cloud_name = 'dksxgetto';
  const preset = 'qpjbjife';

  const capture = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    setBin(canvas.value)
    const img = (canvas.toDataURL("image/png"));

    console.log("imagenglobal: ", img);
    console.log("imagen: ", img);
    return setImg(img)
  }
  // console.log("imagenGlobal: ",imgDataUrl );
  const mostrarVentanaEmergente = () => {
    Swal.fire({
      text: 'Foto tomada correctamente',
      showCancelButton: true,
      confirmButtonText: 'Guardar y salir',
    }).then((result) => {
      if (result.isConfirmed) {
        capture()
        // sendToBD()  
        Swal.fire('Guardado exitosamente', 'La imagen se ha guardado correctamente.', 'success');
      } else {
        Swal.fire("Error en al guardar imagen", "no se puedo guardar", "warning")
      }
    });
  };

  const fileUpload = async () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const img = (canvas.toDataURL("image/png"));
    console.log("imagesEnSentoBD: ", img);
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`
    const formData = new FormData();
    formData.append('upload_preset', `${preset}`)
    if (!img) {
      window.alert("no hay imagen!")
    }
    formData.append('file', img);

    try {
      const res = await fetch(cloudinaryUrl, {
        method: 'POST',
        body: formData
      });

      if (!res.ok) return null;

      const data = await res.json();
      setUrlImagen(data.secure_url)
      console.log("urlImagenGuardada: ", data.secure_url)
      const copiaEmpleados = [...empleados]
      const resultado = copiaEmpleados.find(empleado => empleado.nombr === nombre2)
      //  console.log("resultado: ",resultado)
      if (resultado) {
        resultado.imagen = data.secure_url
        // console.log("imagennuevaaaaaaaa")
        setEmpleados(copiaEmpleados)
      } else {
        console.log("no se encotro ningun resultado")
      }
      return data.secure_url;


    } catch (error) {
      return null;
    }
  };




  return (
    <div id='Fotonueva' className='contenedorPrincipal2'>
      <img style={{ marginTop: "5px" }} src="../src/assets/logoPetco1.png" alt="" height={"50px"} />
      <div style={{ height: "250px" }}>

        <h5>PhotoID</h5>
        {/* <h1>{nombre}</h1> */}
        {/*  */}
        <video className='fotoInput2' ref={videoRef} width="auto" height="320" />
        {img && (
          <div className='fotoInput2'
            style={{
              width: "240",
              height: "320",
              backgroundImage: `url(${img

                })`,
              backgroundSize: "cover",
              position: "fixed",
              left: "380px",
              top: "-63px"
            }}
          />
        )}
        <div style={{ width: "240px" }}>
          <canvas id='canvas' className='positionPhoto' ref={canvasRef} style={{ display: "none", height: "320", width: "240" }} />
        </div>
      </div>
      <button id="boton1" className='btn' onClick={(e) => {
        e.preventDefault()
        capture()
        fileUpload()
        mostrarVentanaEmergente()
        // document.getElementById("btncancelar").style.display="none"

      }}>Tomar Fotografia</button>
      {/* <button id='btncancelar' className='btn gris' onClick={()=>{
        document.getElementById("Fotonueva").style.display="100px"
        // window.location.reload()
        // finishVideo();
      }}>Cerrar</button> */}
      {/* <button className='btn' id='botones3'>Guardar Fotografia</button> */}
    </div>
  )
}

export default NewPhoto