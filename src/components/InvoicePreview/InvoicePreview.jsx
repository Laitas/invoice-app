import React from 'react'
import {ReactComponent as ArrowIcon} from '../../assets/icon-arrow-right.svg'
import Status from '../Status/Status'
import './InvoicePreview.scss'

const InvoicePreview = ({invoice}) => {
    const {id,paymentDue,clientName,total,status} = invoice
    return (
        <div className="invoice-preview">
            <span className="invoice-preview--id"><span className="hash">#</span>{id}</span>
            <span className="invoice-preview--date">{paymentDue}</span>
            <span className="invoice-preview--name">{clientName}</span>
            <h3 className="invoice-preview--amount">${total}</h3>
            <Status status={status} />
            <ArrowIcon />
        </div>
    )
}

export default InvoicePreview
