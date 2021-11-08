import React from 'react'
import IconPlus from '../../assets/icon-plus.svg'
import { useDispatch } from 'react-redux'
import './Button.scss'
import { toggleNew } from '../../redux/userSlice'
const Button = ({onClick,type,text,darkMode = false}) => {
    const dispatch = useDispatch()
    switch(type){
        case 1:
            return (
                <button onClick={()=> dispatch(toggleNew())} className="btn btn--type-one"><img src={IconPlus} alt="" />{text}</button>
            )
        case 2:
            return (
                <button className="btn btn--type-two">{text}</button>
            )
        case 3:
            return (
                <button className="btn btn--type-three">{text}</button>
            )
        case 4:
            return (
                <button className="btn btn--type-four">{text}</button>
            )
        case 5:
            return (
                <button className="btn btn--type-five">{text}</button>
            )
        case "google":
            return (
                <button onClick={onClick} className="btn btn--google">{text}</button>
            )
        default:
            return <button className="btn btn--default">{text}</button>;
    }
}

export default Button
