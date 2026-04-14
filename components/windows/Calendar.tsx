import React, { useState } from 'react'
import { Calendar } from '../ui/calendar'
const CalendarComp = () => {
  const [date, setDate] = useState <Date | undefined>(new Date())
  return (
      <Calendar mode='single' selected={date} onSelect={setDate} className='rounded-md border' />
   
  )
}

export default CalendarComp