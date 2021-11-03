import React from 'react'
import {ReactComponent as IconArrow} from '../../assets/icon-arrow-left.svg'
import {useHistory} from 'react-router-dom'
import './BackButton.scss'
const BackButton = () => {
    const history = useHistory()
    return (
        <button onClick={()=> history.push('/')} className="back-btn"><IconArrow/> Go back</button>
    )
}

export default BackButton
