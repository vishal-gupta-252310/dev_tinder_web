import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "./Input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { HaveValue } from "../Services/helper";

const PasswordInput = ({
  className,
  label,
  forgetPasswordLink,
  forgetPasswordLabel,
  errors,
  isRequesting,
  handleChange,
  name = "password",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`form-control ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <Link
          to={forgetPasswordLink}
          className="label-text-alt link link-hover text-sm"
        >
          {forgetPasswordLabel}
        </Link>
      </div>
      <div className="relative w-full">
        <Input
          type={showPassword ? "text" : "password"}
          name={name}
          placeholder="••••••••"
          disabled={isRequesting}
          className="input input-bordered w-full pr-12"
          required
          handleChange={handleChange}
          errors={errors}
        />
        <span
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </span>
      </div>
    </div>
  );
};

export default PasswordInput;
