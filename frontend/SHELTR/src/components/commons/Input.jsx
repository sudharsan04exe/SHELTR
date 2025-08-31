import React from "react";

const Input = ({ label, name, type = "text", value, onChange, placeholder = "", required = false, error = "", className = "" }) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && <label htmlFor={name} className="block mb-1 font-medium">{label}</label>}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? "border-red-500" : "border-gray-300"}`}
        aria-invalid={!!error}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
