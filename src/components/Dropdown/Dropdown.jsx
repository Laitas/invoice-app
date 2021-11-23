import React, {useState, useEffect} from 'react'
import {ReactComponent as IconArrow} from '../../assets/icon-arrow-down.svg'
import { useSelector, useDispatch } from 'react-redux'
import { setPaymentTerms } from '../../redux/formSlice'
import './Dropdown.scss'

const options = [
    {value : 'Net 1 Day', id : 1, active : true},
    {value : 'Net 7 Days', id : 7},
    {value : 'Net 14 Days', id : 14},
    {value : 'Net 30 Days', id : 30},
]

const Dropdown = () => {
    const [dropdown,setDropdown] = useState(false)
    const [currentOption,setCurrentOption] = useState('Net 1 Day')
//   const [update,setUpdate] = useState(false)
    const paymentTerms = useSelector(state => state.form.paymentTerms);
    const dispatch = useDispatch()
    const toggleActive = () => {
        // setUpdate(!update)
      options.map((option) => {
        if (paymentTerms === option.id) {
          option.active = true;
        } else {
          option.active = false;
        }
      });
    };
    useEffect(()=>{
        toggleActive()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[paymentTerms])
    return (
        <>
        <div onClick={()=>setDropdown(!dropdown)} className="dropdown--input">
            {currentOption} <IconArrow />
        </div>
        {dropdown && 
        <div className="dropdown--input-dropdown">
            <ul>
                {options.map(option => (
                    <li onClick={()=> {dispatch(setPaymentTerms(option.id)); 
                        setCurrentOption(option.value)}} 
                        key={option.id}>{option.value}</li>
                ))}
            </ul>
        </div>
        }
        </>
    )
}

export default Dropdown
