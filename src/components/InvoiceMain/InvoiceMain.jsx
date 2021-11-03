import React from 'react'
import './InvoiceMain.scss'

const InvoiceMain = ({invoice}) => {
    const {createdAt,paymentDue,clientName,clientAddress,clientEmail} = invoice
    return (
      <main>
        <div className="dates">
          <div className="invoice-date">
            <span>Invoice Date</span>
            <span className="bold">{createdAt}</span>
          </div>
          <div className="payment-due">
            <span>Payment Due</span>
            <span className="bold">{paymentDue}</span>
          </div>
        </div>
        <div className="bill-to">
          <span>Bill To</span>
          <span className="bold">{clientName}</span>
          <ul>
          <li>{clientAddress?.street}</li>
          <li>{clientAddress?.city}</li>
          <li>{clientAddress?.postCode}</li>
          <li>{clientAddress?.country}</li>
          </ul>
        </div>
        <div className="sent-to">
          <span>Sent to</span>
          <span className="bold">{clientEmail}</span>
        </div>
      </main>
    );
}

export default InvoiceMain
