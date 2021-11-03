import React from 'react'
import './InvoiceHeader.scss'

const InvoiceHeader = ({invoice}) => {
    const {senderAddress, description,id} = invoice
    return (
      <header>
        <div className="left-side">
          <h3>
            <span className="hash">#</span>
            {id}
          </h3>
          <p>{description}</p>
        </div>
        <div className="address">
          <span>{senderAddress?.street}</span>
          <span>{senderAddress?.city}</span>
          <span>{senderAddress?.postCode}</span>
          <span>{senderAddress?.country}</span>
        </div>
      </header>
    );
}

export default InvoiceHeader
