import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function MyCalendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const today = new Date();

  const redDates = [
    new Date(2024, 0, 1), // January 1, 2024
    new Date(2024, 0, 15), // January 15, 2024
  ];

  const greenDates = [
    new Date(2024, 0, 5), // January 5, 2024
    new Date(2024, 0, 20), // January 20, 2024
  ];

  const tileContent = ({ date }) => {
    const isRed = redDates.some((redDate) => date.getTime() === redDate.getTime());
    const isGreen = greenDates.some((greenDate) => date.getTime() === greenDate.getTime());
    const isToday =
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate();

    const isSelected =
      selectedDate &&
      date.getFullYear() === selectedDate.getFullYear() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getDate() === selectedDate.getDate();

    return (
      <div
        className={`tile-content ${isGreen ? 'green' : ''} ${isRed ? 'red' : ''} ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
        style={{
          backgroundColor: isGreen ? 'lightgreen' : isRed ? 'lightcoral' : isToday ? 'yellow' : isSelected ? 'blue' : 'transparent',
          color: isToday ? 'black' : 'white',
        }}
      >
        {/* You can add any content inside the cell if needed */}
      </div>
    );
  };

  return (
    <div className='flex justify-center items-center'>
      <Calendar
        tileContent={tileContent}
        onChange={setSelectedDate}
        value={selectedDate || today}
      />
    </div>
  );
}

export default MyCalendar;
