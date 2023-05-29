import React, { useState } from 'react';

const Calendar = () => {
  const [startDay, setStartDay] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [event, setEvent] = useState('');
  const [events, setEvents] = useState([]);
  const [empleados,setEmpleados]=useState([
    {nombre:"Rodrigo Marure Sanchez",imagen:"../src/assets/ad.png",horarios:["22 may 2023//Descanso","23 may 2023//00:00-09:00","24 may 2023//00:00-09:00","","26 may 2023//00:00-09:00","",""],descanso:true,incidencia:["Permiso sin Gose de Sueldo--15 may 2023","","","","","",""]},
    {nombre:"Sanchez Rodrigo Marure", imagen:"",horarios:["22 may 2023//Descanso","","","","","",""],descanso:true,incidencia:["","","","","","",""]},
    {nombre:"Lizbeth Franco Llana", imagen:"../src/assets/caramujer.png",horarios:["","","","","","",""],descanso:"",incidencia:["","","","","","",""]},
    {nombre:"Messi Messi messi", gerente:true,imagen:"../src/assets/mesi.png",horarios:["22 may 2023//Descanso","23 may 2023//00:00-09:00","","25 may 2023//00:00-09:00","","",""],descanso:true,incidencia:["","","","","","",""]},
    {nombre:"Will Smith ", imagen:"../src/assets/willsmit.png",horarios:["","","","","","",""],descanso:"",incidencia:["","","","","","",""]},
    {nombre:"Will Smith2 ", imagen:"../src/assets/willsmit.png",horarios:["22 may 2023//00:00-09:00","","","","","",""],descanso:"",incidencia:["Permiso sin Gose de Sueldo--15 may 2023","Permiso sin Gose de Sueldo--16 may 2023","Permiso sin Gose de Sueldo--17 may 2023","Permiso sin Gose de Sueldo--18 may 2023","Permiso sin Gose de Sueldo--19 may 2023","Permiso sin Gose de Sueldo--20 may 2023","Permiso sin Gose de Sueldo--21 may 2023"]},
    {nombre:"empleado imaginario 4 ", imagen:"",horarios:["","","","","","",""],descanso:"",incidencia:["","","","","","",""]},
    {nombre:"Will Smith3 ", imagen:"../src/assets/cara.png",horarios:["22 may 2023//00:00-09:00","","","","","",""],descanso:"",incidencia:["","","","","","",""]},
    {nombre:"empleado imaginario 2 ", imagen:"../src/assets/cara4.png",horarios:["","","","","","",""],descanso:"",incidencia:["","","","","","",""]},
    {nombre:"anonima sanchez ", imagen:"",horarios:["","","","","","",""],descanso:"",incidencia:["","","","","","",""]},
  ])

  const weekdays = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

  const handleClickDay = (date) => {
    console.log("date: ",date)
    setSelectedDate(date);
  };

  const handleSaveEvent = () => {
    if (selectedDate && event) {
      const newEvent = { date: selectedDate, event };
      setEvents([...events, newEvent]);
      setSelectedDate(null);
      setEvent('');
    }
  };

  const handleCancelEvent = () => {
    setSelectedDate(null);
    setEvent('');
  };

  const setPrevWeek = () => {
    const newDate = new Date(startDay);
    newDate.setDate(startDay.getDate() - 7);
    setStartDay(newDate);
  };

  const setNextWeek = () => {
    const newDate = new Date(startDay);
    newDate.setDate(startDay.getDate() + 7);
    setStartDay(newDate);
  };

  const renderCalendar = () => {
    const calendar = [];
    const currentDate = new Date(startDay);

    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      const isToday = date.toDateString() === new Date().toDateString();
      const isEventDate = events.some((event) => event.date.toDateString() === date.toDateString());

      calendar.push(
        <div
          key={i}
          style={{border:"solid", width:"auto"}}
          className={`calendar-day ${isToday ? 'today' : ''} ${isEventDate ? 'event-date' : ''}`}
          onClick={() => handleClickDay(date)}
        >
          <div className="date">{date.getDate()}</div>
          <div className="event-marker">{isEventDate ? '•' : ''}</div>
        </div>
      );

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return calendar;
  };

  return (
    <div style={{border:"solid", width:"auto", display:"inline-flex"}} className="calendar">
      <div className="calendar-header">
        <button onClick={setPrevWeek}>Previous Week</button>
        <button onClick={setNextWeek}>Next Week</button>
      </div>
      <div style={{border:"solid", width:"auto"}} className="calendar-weekdays">
        {weekdays.map((day) => (
          <div style={{border:"solid", width:"auto"}} key={day} className="weekday">{day}</div>
        ))}
      </div>
      <div style={{border:"solid", width:"auto"}} className="calendar-days">{renderCalendar()}</div>
      {selectedDate && (
        <div className="event-form">
          <div className="event-date">{selectedDate.toLocaleDateString()}</div>
          <input
            type="text"
            placeholder="Enter event description"
            value={event}
            onChange={(e) => setEvent(e.target.value)}
          />
          <div className="event-buttons">
            <button onClick={handleSaveEvent}>Save</button>
            <button onClick={handleCancelEvent}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
