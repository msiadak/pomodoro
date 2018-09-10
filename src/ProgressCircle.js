import React from 'react';
import './ProgressCircle.css';

const ProgressCircle = ({ progress, className, mode }) => {
  const classes = `${className} progress-circle`;
  return (
    <svg
      className={classes}
      viewBox="0 0 120 120"
      preserveAspectRatio="xMidYMid meet"
    >
      <circle
        className={`progress-circle__circle--${mode}`}
        cx="60"
        cy="60"
        r="54"
        fill="none"
        strokeWidth="12"
      />
      <circle
        className="progress-circle__circle--gray"
        cx="60"
        cy="60"
        r="54"
        fill="none"
        stroke="#e6e6e6"
        strokeWidth="12"
        strokeDasharray="339.292 339.292"
        strokeDashoffset={339.292 * progress}
      />
    </svg>
  );
};

export default ProgressCircle;
