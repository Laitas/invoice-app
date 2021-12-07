import React from "react";
import './InvoiceItems.scss'

const InvoiceItems = ({ invoice }) => {
    const { items } = invoice;
  return (
    <section className="invoice-items">
      <div className="invoice-items--items">
        <ul className="item-name">
          <p className="label">Item Name</p>
          {items?.map((item,idx) => (
            <li key={idx}>{item.name}</li>
          ))}
        </ul>
        <ul className="item-qty">
          <p className="label">QTY.</p>
          {items?.map((item,idx) => (
            <li key={idx}>{item.quantity}</li>
          ))}
        </ul>
        <ul className="item-price">
          <p className="label">Price</p>
          {items?.map((item,idx) => (
            <li key={idx}>${item.price}</li>
          ))}
        </ul>
        <ul className="item-total">
          <p className="label">Total</p>
          {items?.map((item,idx) => (
            <li key={idx}>${item.total}</li>
          ))}
        </ul>
      </div>
      <footer>
          <p>Amount Due</p>
          <h2>${invoice.total}</h2>
      </footer>
    </section>
  );
};

export default InvoiceItems;
