import React from 'react';
import './ProgressCircle.css';

const ProgressCircle = ({ progress, className }) => {
  const classes = `${className} progress-circle`;
  return (
    <svg
      className={classes}
      viewBox="0 0 120 120"
      preserveAspectRatio="xMidYMid meet"
    >
      <circle
        cx="60"
        cy="60"
        r="54"
        fill="none"
        stroke="#f77a22"
        strokeWidth="12"
      />
      <circle
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
