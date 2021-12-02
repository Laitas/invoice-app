import React,{useState,useEffect} from 'react'
import Calendar from 'react-calendar'
import IconCalendar from '../../assets/icon-calendar.svg'
import { useDispatch, useSelector } from 'react-redux'
import { setCreatedAt, setPaymentDue } from '../../redux/formSlice'
import './CalendarComponent.scss'
import { useLocation } from 'react-router'

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
    const [date,setCalendarDate] = useState(new Date())
    const [month,setMonth] = useState(0)
    const paymentTerms = useSelector(state => state.form.paymentTerms)
    const invoicesSelector = useSelector(state => state.user.invoices)
    const dispatch = useDispatch()
    const location = useLocation()

    const addDays = (date, days) => {
      let result = new Date(date);
      result.setDate(result.getDate() + days);
      dispatch(setPaymentDue({
        day : result.getDate(),
        month : result.getMonth() + 1,
        year : result.getUTCFullYear()
      }))
    }
    
    useEffect(() =>{
        setMonth(monthNames[date.getMonth()])
        dispatch(setCreatedAt({
          day : date.getDate(),
          month : date.getMonth() + 1,
          year : date.getUTCFullYear()
        }))
    },[date])
    useEffect(()=>{
      const id = location.pathname.slice(10,location.length)
      const current = invoicesSelector.find(invoice => invoice.id === id)
      if(current){
        setCalendarDate(new Date(current.createdAt))
      }
      console.log(date);
      console.log(current);
    },[location])
    useEffect(() =>{
      addDays(date,paymentTerms)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[paymentTerms,date])
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
          <Calendar value={date} onChange={setCalendarDate} />
        )}
      </div>
    );
}

export default CalendarComponent
