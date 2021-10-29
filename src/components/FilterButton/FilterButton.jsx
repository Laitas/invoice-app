import React from 'react'
import {ReactComponent as ArrowIcon} from '../../assets/icon-arrow-down.svg'
import './FilterButton.scss'
const FilterButton = () => {
    return (
        <>
        <button className="filter-btn">
            Filter by status <span><ArrowIcon/></span>
        </button>
        </>
    )
}

export default FilterButton
