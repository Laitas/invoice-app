import React from "react";
import { useSelector } from "react-redux";
import CalendarComponent from "../CalendarComponent/CalendarComponent";
import Dropdown from "../Dropdown/Dropdown";
import "./NewInvoice.scss";
const NewInvoice = () => {
  const toggleNewInvoice = useSelector((state) => state.user.toggleNewInvoice);

  return (
    <div
      className={
        toggleNewInvoice
          ? "new-invoice new-invoice--show"
          : "new-invoice new-invoice--hide"
      }
    >
      <h2>New Invoice</h2>
      <section className="bill-from">
        <h4>Bill From</h4>
        <div className="input">
          <label htmlFor="street">Street Address</label>
          <input type="text" name="street" id="street" />
        </div>
        <div className="multiple-inputs">
          <div className="input">
            <label htmlFor="city">City</label>
            <input type="text" name="city" id="city" />
          </div>
          <div className="input">
            <label htmlFor="pcode">Post Code</label>
            <input type="text" name="pcode" id="pcode" />
          </div>
          <div className="input">
            <label htmlFor="country">Country</label>
            <input type="text" name="country" id="country" />
          </div>
        </div>
      </section>
      <section className="bill-to">
        <h4>Bill To</h4>
        <div className="input">
          <label htmlFor="clientname">Client's Name</label>
          <input type="text" name="clientname" id="clientname" />
        </div>
        <div className="input">
          <label htmlFor="clientemail">Client's Email</label>
          <input type="email" name="clientemail" id="clientemail" />
        </div>
        <div className="input">
          <label htmlFor="clientaddress">Street Address</label>
          <input type="text" name="clientaddress" id="clientaddress" />
        </div>
        <div className="multiple-inputs">
          <div className="input">
            <label htmlFor="clientcity">City</label>
            <input type="text" name="clientcity" id="clientcity" />
          </div>
          <div className="input">
            <label htmlFor="clientpcode">Post Code</label>
            <input type="text" name="clientpcode" id="clientpcode" />
          </div>
          <div className="input">
            <label htmlFor="clientcountry">Country</label>
            <input type="text" name="clientcountry" id="clientcountry" />
          </div>
        </div>
        <div className="date-inputs">
          <div className="input">
          <span className="label">Invoice Date</span>
          <CalendarComponent />
          </div>
          <div className="input">
            <span className="label">Payment Terms</span>
            <Dropdown />
          </div>
        </div>
        <div className="input">
          <label htmlFor="projectdescription">Project Description</label>
          <input type="text" name="projectdescription" id="projectdescription" />
        </div>
      </section>
      <section className="item-list">
        <span className="item-list--heading">Item List</span>
      </section>
    </div>
  );
};

export default NewInvoice;
