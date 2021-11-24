import React from 'react'
import Status from '../Status/Status';
import Button from '../Button/Button'
import './InvoiceNav.scss'

const InvoiceNav = ({invoice}) => {
    const { status } = invoice
    return (
        <nav className="invoice-nav">
            <div className="invoice-nav--status">
                <span>Status</span>
                <Status status={status} />
            </div>
            <div className="invoice-nav--buttons">
                <Button v={2} text='Edit' />
                <Button v={4} text='Delete' />
                <Button text='Mark as Paid' />
            </div>
        </nav>
    )
}

export default InvoiceNav
