import React,{useState,useEffect} from 'react'
import Calendar from 'react-calendar'
import IconCalendar from '../../assets/icon-calendar.svg'
import './CalendarComponent.scss'

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const CalendarComponent = () => {
    const [showCalendar,setShowCalendar] = useState(false)
    const [date,setDate] = useState(new Date())
    const [month,setMonth] = useState(0)
    useEffect(() =>{
        setMonth(monthNames[date.getMonth()])
        console.log(date.getDate())
    },[date])
    return (
      <div>
        <div
          onClick={() => setShowCalendar(!showCalendar)}
          className="calendar--input"
        >
          <span>
          {date.getDate()} {month} {date.getUTCFullYear()}
          </span>
          <img src={IconCalendar} alt="" />
        </div>
        {showCalendar && (
          <Calendar value={date} onChange={setDate} />
        )}
      </div>
    );
}

export default CalendarComponent
