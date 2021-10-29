import React, { useState, useEffect } from "react";
import { ReactComponent as ArrowIcon } from "../../assets/icon-arrow-down.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useSelector } from "react-redux";
import "./FilterButton.scss";

const options = [
  { id: 1, value: "Draft" },
  { id: 2, value: "Pending" },
  { id: 3, value: "Paid" },
  { id: 4, value: "All", active: true },
];
const FilterButton = () => {
  const [dropdown, setDropdown] = useState(false);
  const [update,setUpdate] = useState(false)
  const currentStatus = useSelector((state) => state.filter.current);

  const toggleCheckbox = () => {
      setUpdate(!update)
    console.log(options);
    console.log(currentStatus);
    options.map((option) => {
      if (currentStatus === option.value) {
        option.active = true;
      } else {
        option.active = false;
      }
    },[update]);
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
        Filter by status
        <span>
          <ArrowIcon />
        </span>
      </button>
      {dropdown && (
        <div className="filter-btn--dropdown">
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
