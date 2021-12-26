import React, { useState, useEffect, useRef } from "react";
import { ReactComponent as ArrowIcon } from "../../assets/icon-arrow-down.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useSelector } from "react-redux";
import "./FilterButton.scss";
import useWindowWidth from "../../hooks/useWindowWidth";
import useOutsideClick from "../../hooks/useOutsideClick";
const options = [
  { id: 1, value: "Draft" },
  { id: 2, value: "Pending" },
  { id: 3, value: "Paid" },
  { id: 4, value: "All", active: true },
];
const FilterButton = () => {
  const [width] = useWindowWidth()
  const [dropdown, setDropdown] = useState(false);
  const [update,setUpdate] = useState(false)
  const currentStatus = useSelector((state) => state.filter.current);
  const dropdownRef = useRef()
  useOutsideClick(dropdownRef, ()=> setDropdown(false))
  const toggleCheckbox = () => {
      setUpdate(!update)
    options.forEach((option) => {
      if (currentStatus === option.value) {
        option.active = true;
      } else {
        option.active = false;
      }
    });
  };
  useEffect(() => {
    toggleCheckbox();
  }, [currentStatus]);
  return (
    <div className="filter-btn">
      <button
        onClick={() => setDropdown(!dropdown)}
        className="filter-btn--btn"
      >
        {width > 426 ? 'Filter by status' : 'Filter'}
        <span>
          <ArrowIcon />
        </span>
      </button>
      {dropdown && (
        <div ref={dropdownRef} className="filter-btn--dropdown">
          <ul>
            {options.map((option) => (
              <FilterCheckbox
                key={option.id}
                text={option.value}
                active={option.active}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterButton;
