import React from 'react'
import './Status.scss'

const Status = ({status}) => {
    return (
        <span className={`status status--${status}`}>&#x25CF; {status}</span>
    )
}

export default Status
