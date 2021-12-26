import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router";
import BackButton from "../../components/BackButton/BackButton";
import EditInvoice from "../../components/EditInvoice/EditInvoice";
import InvoiceHeader from "../../components/InvoiceHeader/InvoiceHeader";
import InvoiceItems from "../../components/InvoiceItems/InvoiceItems";
import InvoiceMain from "../../components/InvoiceMain/InvoiceMain";
import InvoiceNav from "../../components/InvoiceNav/InvoiceNav";
import './Invoicepage.scss'

const Invoicepage = () => {
  const [invoice, setInvoice] = useState({});
  const [loading,setLoading] = useState(true);
  const invoicesSelector = useSelector((state) => state.user.invoices);
  const params = useLocation();
  const history = useHistory()
  useEffect(() => {
    const id = params.pathname.slice(10, params.length);
    if(!invoicesSelector.find((invoice) => invoice.id === id)){
      history.push('/')
    }
    setInvoice(invoicesSelector.find((invoice) => invoice.id === id));
    setLoading(false)
  }, [params, invoicesSelector,history]);
  return (
    <>
    {!loading &&
    <div className="invoice-page">
      <EditInvoice invoice={invoice}/>
      <BackButton/>
      <InvoiceNav invoice={invoice} />
      <div className="invoice-page--invoice">
        <InvoiceHeader invoice={invoice} />
        <InvoiceMain  invoice={invoice}/>
        <InvoiceItems invoice={invoice} />
      </div>
    </div>
      }
    </>
  );
};

export default Invoicepage;
