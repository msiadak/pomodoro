import React from 'react';
import './Timer.css';

function formatTime(ms) {
  const minutes = Math.floor(ms / 60);
  const seconds = ms % 60;

  return `${minutes}:${
    seconds.toString(10).length === 1 ? '0' + seconds.toString(10) : seconds
  }`;
}

const Timer = ({ startTime, timeLeft }) => {
  const circumference = 2 * 40 * Math.PI;
  return (
    <div style={{ width: '100px', height: '100px' }}>
      <span>{formatTime(timeLeft)}</span>
      <svg viewBox="0 0 100 100" width="80%" height="80%">
        <circle
          className="timer__circle"
          cx="50"
          cy="50"
          r="40"
          strokeDasharray={circumference}
          strokeDashoffset={`${(timeLeft / startTime) * circumference +
            circumference}%`}
        />
      </svg>
    </div>
  );
};

export default Timer;
