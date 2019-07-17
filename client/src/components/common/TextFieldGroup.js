import React from "react";

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  type = "text",
  info,
  onChange,
  disabled = false
}) => {
  return (
    <div className="input">
      <label className="input__label" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        className="input__field"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <p className="input__info">{info}</p>}
    </div>
  );
};

export default TextFieldGroup;
