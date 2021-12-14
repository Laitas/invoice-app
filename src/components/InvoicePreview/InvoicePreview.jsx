import React from 'react'
import { Link } from 'react-router-dom'
import {ReactComponent as ArrowIcon} from '../../assets/icon-arrow-right.svg'
import Status from '../Status/Status'
import Date from '../Date/Date'
import './InvoicePreview.scss'
import useWindowWidth from '../../hooks/useWindowWidth'

const InvoicePreview = ({invoice}) => {
    const [width] = useWindowWidth()
    const {id,paymentDue,clientName,total,status} = invoice
    return (
        <Link to={`invoices/${id}`}>
            {width > 426 ?
        <div className="invoice-preview">
            <span className="invoice-preview--id"><span className="hash">#</span>{id}</span>
            <Date className="invoice-preview--date" preview={true} date={paymentDue}/>
            <span className="invoice-preview--name">{clientName}</span>
            <h3 className="invoice-preview--amount">${total}</h3>
            <Status status={status} />
            <ArrowIcon />
        </div>
        :
        <div className="invoice-preview">
            <aside>
            <span className="invoice-preview--id"><span className="hash">#</span>{id}</span>
            <Date className="invoice-preview--date" preview={true} date={paymentDue}/>
            <h3 className="invoice-preview--amount">${total}</h3>
            </aside>
            <aside>
            <span className="invoice-preview--name">{clientName}</span>
            <Status status={status} />
            </aside>
        </div>}
        </Link>
    )
}

export default InvoicePreview
