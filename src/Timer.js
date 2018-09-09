import React from 'react';
import './Timer.css';

import ProgressCircle from './ProgressCircle';

function formatTime(ms) {
  const minutes = Math.floor(ms / 60);
  const seconds = ms % 60;

  return `${minutes}:${
    seconds.toString(10).length === 1 ? '0' + seconds.toString(10) : seconds
  }`;
}

const Timer = ({ startTime, timeLeft }) => {
  return (
    <div className="timer">
      <ProgressCircle
        className="timer__progress-circle"
        progress={timeLeft / startTime}
      />
      <span className="timer__span">{formatTime(timeLeft)}</span>
    </div>
  );
};

export default Timer;
