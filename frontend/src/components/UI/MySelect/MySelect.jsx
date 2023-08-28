import React from 'react';
import './MySelect.css';

function MySelect({
  options,
  defaultValue,
  value,
  onChange,
  ...props
}) {
  const handleChangeSelect = (e) => {
    onChange(e.target.value);
  };

  return (
    <select
      className={`custom-select ${
        props.className
          ? props.className
          : ''
      }`}
      value={value}
      onChange={handleChangeSelect}
    >
      <option disabled value="">{defaultValue}</option>
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.name}
        </option>
      ))}
    </select>
  );
}

export default MySelect;
