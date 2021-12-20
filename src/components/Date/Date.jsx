import React from "react";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Date = ({ className, date, preview = false }) => {
  const year = date.slice(0, 4);
  const month = isNaN(date.slice(5, 7) - 1)
    ? date.slice(5, 6) - 1
    : date.slice(5, 7) - 1;
  const day = date.slice(7, date.length).includes('-')
      ? date.slice(8, date.length)
      : date.slice(7, date.length);
  // Above code is used to remove hyphens from date e.g 2021-12-12 to 2021 12 12
  return (
    <span className={className}>
      {preview && "Due"}{" "}
      {`${year} ${monthNames[month]} ${day?.length < 2 ? "0" + day : day}`}
    </span>
  );
};

export default Date;
