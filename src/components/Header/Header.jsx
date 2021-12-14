import React from "react";
import FilterButton from "../FilterButton/FilterButton";
import Button from "../Button/Button";
import "./Header.scss";
import useWindowWidth from "../../hooks/useWindowWidth";

const Header = ({ filteredInvoices }) => {
  const [width] = useWindowWidth();
  return (
    <div className="header-main">
      <div className="header-main--left-side">
        <h1>Invoices</h1>
        <p>
          There 
          {filteredInvoices.length > 1 ? " are " : " is "} 
          {filteredInvoices ? filteredInvoices.length : "0"} total{" "}
          {filteredInvoices.length > 1 ? "invoices" : "invoice"}
        </p>
      </div>
      <div className="header-main--buttons">
        <FilterButton />
        {width > 426 ? (
          <Button v={1} text="New Invoice" />
        ) : (
          <Button v={1} text="New" />
        )}
      </div>
    </div>
  );
};

export default Header;
