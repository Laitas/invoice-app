import React from 'react'
import FilterButton from '../FilterButton/FilterButton'
import Button from '../Button/Button'
import { useSelector } from 'react-redux'
import './Header.scss'

const Header = () => {
    const invoices = useSelector(state => state.user.invoices)
    return (
        <div className="header-main">
            <div className="header-main--left-side">
                <h1>Invoices</h1>
                <p>There are {invoices? invoices.length : '0'} total invoices</p>
            </div>
            <div className="header-main--buttons">
                <FilterButton/>
                <Button type={1} text="New Invoice"/>
            </div>
        </div>
    )
}

export default Header
