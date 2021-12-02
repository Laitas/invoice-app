import React from 'react'
import FilterButton from '../FilterButton/FilterButton'
import Button from '../Button/Button'
import './Header.scss'

const Header = ({filteredInvoices}) => {
    return (
        <div className="header-main">
            <div className="header-main--left-side">
                <h1>Invoices</h1>
                <p>There are {filteredInvoices? filteredInvoices.length : '0'} total invoices</p>
            </div>
            <div className="header-main--buttons">
                <FilterButton/>
                <Button v={1} text="New Invoice"/>
            </div>
        </div>
    )
}

export default Header
