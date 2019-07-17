import React from "react";

const DropDownGroup = ({
  name,
  label,
  info,
  onChange,
  disabled = false,
  selected,
  options
}) => {
  return (
    <div className="input">
      <label className="input__label" htmlFor={name}>
        {label}
      </label>
      <select
        className="select__field"
        name={name}
        onChange={onChange}
        disabled={disabled}
        defaultValue={selected}
      >
        {options.map(opt => {
          return (
            <option key={opt.val} value={opt.val}>
              {opt.display}
            </option>
          );
        })}
      </select>
      {info && <p className="input__info">{info}</p>}
    </div>
  );
};

export default DropDownGroup;
