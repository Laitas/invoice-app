import React, {useState} from 'react'
import {ReactComponent as IconArrow} from '../../assets/icon-arrow-down.svg'
import './Dropdown.scss'

const options = [
    {value : 'Net 1 Day', id : 1},
    {value : 'Net 7 Days', id : 2},
    {value : 'Net 14 Days', id : 3},
    {value : 'Net 30 Days', id : 4},
]

const Dropdown = () => {
    const [dropdown,setDropdown] = useState(false)
    return (
        <>
        <div onClick={()=>setDropdown(!dropdown)} className="dropdown--input">
            Net 30 days <IconArrow />
        </div>
        {dropdown && 
        <div className="dropdown--input-dropdown">
            <ul>
                {options.map(option => (
                    <li key={option.id}>{option.value}</li>
                ))}
            </ul>
        </div>
        }
        </>
    )
}

export default Dropdown
