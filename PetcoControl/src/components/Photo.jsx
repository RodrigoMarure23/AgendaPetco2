import React, { useEffect, useRef, useState } from 'react'
import "../styles/index.css"
import { useNavigate } from 'react-router-dom'
const Photo = () => {
  const navigate = useNavigate()
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [imgDataUrl, setImgDataUrl] = useState(null);
  useEffect(() => {
    // startVideo()
  }, []);
  // function startVideo(){
  //   navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
  //     videoRef.current.srcObject = stream;
  //     videoRef.current.play();
  //   });
  // }

  // function finishVideo(){
  //   navigator.mediaDevices.getUserMedia({ video: true })
  //   .then((stream) => {
  //     // Mostrar el video de la webcam en el elemento de video
  //     videoRef.current.srcObject = stream;
  //   })
  //   .catch((error) => {
  //     console.log('Error al acceder a la webcam:', error);
  //   });

  // // Limpieza al desmontar el componente
  // return () => {
  //   // Detener el video de la webcam y liberar recursos
  //   const videoElement = videoRef.current;
  //   const stream = videoElement.srcObject;
  //   const tracks = stream.getTracks();

  //   tracks.forEach((track) => {
  //     track.stop();
  //   });

  //   videoElement.srcObject = null;
  //   apagarWebcam()
  // };
  // const apagarWebcam = () => {
  //   // Ocultar el video de la webcam
  //   const videoElement = videoRef.current;
  //   videoElement.style.display = 'none';
  // };

  // }
  function capture() {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    setImgDataUrl(canvas.toDataURL("image/png"));
  }
  return (
    // <div className='contenedorPrincipal'>
    //   <img style={{height:"20px"}} src="../src/assets/logoPetco1.png" alt="" height="100px"/>
    //   <div style={{height:"500px"}}>

    //     <h5>PhotoID</h5>
    //   <video className='fotoInput' ref={videoRef} width="320" height="240" />
    //   {/* <button onClick={capture}>Capturar imagen</button> */}
    //   {imgDataUrl && (
    //     <div className='fotoInput'
    //       style={{
    //         width: "640px",
    //         height: "480px",
    //         backgroundImage: `url(${imgDataUrl})`,
    //         backgroundSize: "cover",
    //       }}
    //     />
    //   )}
    //   <canvas ref={canvasRef} style={{ display: "none" }} />
    // <</div>
    //   <button className='btn3' onClick={()=>{
    //     navigate("/home/agenda")

    //   }}>Ingresar</button>
    // </div>>
    <div className='contenedorPrincipal'>
      <div>
        <div style={{ display: "grid", justifyContent: "center" }} className=''>
          <h1>Bienvenido</h1>
          <label>Usuario: <input type="text" /></label>
          <label>Password: <input type="password" /></label>
        </div>
      </div>
      <div>
        <button className='btn3' onClick={() => {
          navigate("/home/agenda")
        }}>Ingresar</button>
      </div>
    </div>
  )
}

export default Photo