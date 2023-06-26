import React, { useEffect, useState } from 'react';

const CountdownComponent = () => {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const nextSunday = new Date();
      nextSunday.setDate(now.getDate() + ((7 - now.getDay()) % 7 + 0) % 7); // Obtiene el próximo domingo
      nextSunday.setHours(23, 59, 59, 999); // Establece la hora a las 23:59:59

      const timeRemaining = nextSunday - now;
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);

      if (timeRemaining <= 0) {
        clearInterval(interval);
        setCountdown('Ya ha pasado el próximo domingo a las 23:59:59');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <label style={{ fontWeight: "bolder", color: "black" }}>Tiempo restante para completar semana de horarios: <span style={{ color: "red" }}>{countdown}</span> </label>
    </div>
  );
};

export default CountdownComponent;
