import React from 'react'
import IconPlus from '../../assets/icon-plus.svg'
import './Button.scss'
const Button = ({type,text,darkMode = false}) => {
    switch(type){
        case 1:
            return (
                <button className="btn btn--type-one"><img src={IconPlus} alt="" />{text}</button>
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
        default:
            return <button className="btn btn--default">{text}</button>;
    }
}

export default Button
