import React from 'react';
import './MyInput.css';

function MyInput({ longText, ...props }) {
  return (
    props.longText
      // eslint-disable-next-line react/jsx-props-no-spreading
      ? <textarea {...props} className={`custom-input ${props.className ? props.className : ''}`} />
      // eslint-disable-next-line react/jsx-props-no-spreading
      : <input {...props} className={`custom-input ${props.className ? props.className : ''}`} />
  );
}

export default MyInput;
