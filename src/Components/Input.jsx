import React from 'react'

const Input = ({value, errors, handleChange, label, name, type, required, disabled, ...props}) => {
  return (
    <div className="form-control">
    {label && <label className="label mb-2">
      <span className="label-text">{label}</span>
    </label>}
    <input
      type={type}
      className="input input-bordered w-full"
      value={value}
      disabled={disabled}
      required={required}
      name={name}
      {...props}
      onChange={(e) => handleChange(e.target.name, e.target.value)}
    />
    {errors[name] && (
      <p className="text-red-500 mt-3">{errors[name]}</p>
    )}
  </div>
  )
}

export default Input