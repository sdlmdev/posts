import React from 'react';
import './MyIconButton.css';

function MyIconButton({ ...props }) {
  return (
    <button
      {...props}
      type="button"
      className={`custom-icon
        ${
          props.className
            ? props.className
            : ''
        }
      `}
    />
  );
}

export default MyIconButton;
