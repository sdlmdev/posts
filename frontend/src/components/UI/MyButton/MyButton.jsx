import React from 'react';
import './MyButton.css';

function MyButton({ ...props }) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      // eslint-disable-next-line react/jsx-props-no-multi-spaces, react/jsx-props-no-spreading
      {...props}
      className={`custom-button
      ${
        props.className
          ? props.className
          : ''
      }
      ${
        props.disabled === true
          ? 'custom-button_disabled'
          : ''
      }
      `}
    >
      {props.text}
    </button>
  );
}

export default MyButton;
