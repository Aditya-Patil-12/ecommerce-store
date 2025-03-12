import React from "react";

const PasswordGuideLines = () => {
  return (
      <ul className="px-2 text-sm/6 font-medium text-gray-900">
        <li>Atleast 8 characters long</li> <li></li>
        <li>Atleast One UpperCase & LowerCase character </li>
        <li>Atleast One Digit </li>
        <li>Atleast One Special Letter # @ $ % ^ & * </li>
      </ul>
  );
};

export default PasswordGuideLines;
