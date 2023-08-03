import React from 'react';
import './MyButton.css';

function MyButton({ ...props }) {
  return (
    // eslint-disable-next-line react/button-has-type, react/jsx-props-no-spreading
    <button {...props} className={`custom-button ${props.className ? props.className : ''}`}>{props.text}</button>
  );
}

export default MyButton;
