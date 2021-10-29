import React, {useRef} from "react";
import { ReactComponent as IconCheck } from "../../assets/icon-check.svg";
import { useDispatch } from "react-redux";
import "./FilterCheckbox.scss";
import { setFilter } from "../../redux/filterSlice";

const FilterCheckbox = ({ text, active }) => {
  const dispatch = useDispatch();
  const ref = useRef()
  return (
    <li
      className="checkbox-li"
      onClick={() => {
        dispatch(setFilter(ref.current.innerText));
      }}
    >
      <div className={active ? "checkbox checked" : "checkbox"}>
        {active && <IconCheck />}
      </div>
      <span ref={ref}>{text}</span>
    </li>
  );
};

export default FilterCheckbox;
