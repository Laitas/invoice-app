import React, {useState} from 'react'

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

const Date = ({className, date, preview = false}) => {
    const year = date.slice(0, 4)
    const month = date.slice(5, 7) - 1
    const day = date.slice(8, date.length)
    return (
        <span className={className}>
           {preview && 'Due'} {`${year} ${monthNames[month]} ${day.length < 2 ? '0' + day : day}`}
        </span>
    )
}

export default Date
