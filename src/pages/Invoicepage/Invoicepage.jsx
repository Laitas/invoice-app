import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import InvoiceHeader from "../../components/InvoiceHeader/InvoiceHeader";
import InvoiceItems from "../../components/InvoiceItems/InvoiceItems";
import InvoiceMain from "../../components/InvoiceMain/InvoiceMain";
import './Invoicepage.scss'

const Invoicepage = () => {
  const [invoice, setInvoice] = useState({});
  const invoicesSelector = useSelector((state) => state.user.invoices);
  const params = useLocation();
  useEffect(() => {
    const id = params.pathname.slice(10, params.length);
    setInvoice(invoicesSelector.find((invoice) => invoice.id === id));
    console.log(invoicesSelector.find((invoice) => invoice.id === id));
  }, [params]);
  return (
    <div className="invoice-page">
      <div className="invoice-page--invoice">
        <InvoiceHeader invoice={invoice} />
        <InvoiceMain  invoice={invoice}/>
        <InvoiceItems invoice={invoice} />
      </div>
    </div>
  );
};

export default Invoicepage;
