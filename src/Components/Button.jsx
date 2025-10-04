import React from "react";

const Button = ({ isRequesting, type, className, label, ...props }) => {
  return (
    <button
      className={`btn btn-neutral mt-4 w-full ${className}`}
      disabled={isRequesting}
      type="submit"
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
