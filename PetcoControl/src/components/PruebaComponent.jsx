import React, { useState } from 'react';
import moment from 'moment';

const Calendar = () => {
  const [weekStart, setWeekStart] = useState(moment().startOf('week'));

  const days = [];
  for (let i = 0; i < 7; i++) {
    days.push(moment(weekStart).add(i, 'days'));
  }

  return (
    <div>
      <h3>Semana del {weekStart.format('D')} al {moment(days[6]).format('D MMMM')}</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            {days.map(day => (
              <th key={day.format('dddd, MMMM Do YYYY')}>
                {day.format('dddd, MMMM Do YYYY')}
                <br />
                {day.format('D')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Horario 1</td>
            {days.map(day => (
              <td key={day.format('dddd, MMMM Do YYYY')}>
                <input type="text" />
              </td>
            ))}
          </tr>
          <tr>
            <td>Horario 2</td>
            {days.map(day => (
              <td key={day.format('dddd, MMMM Do YYYY')}>
                <input type="text" />
              </td>
            ))}
          </tr>
          {/* agregar más filas para más horarios */}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
