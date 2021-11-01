import React from 'react'
import './Status.scss'

const Status = ({status}) => {
    return (
        <li className={`status status--${status}`}>{status}</li>
    )
}

export default Status
