import React from "react";

const Divider = ({ label, className }) => {
  return <div className={`divider my-6 ${className}`}>{label}</div>;
};

export default Divider;
