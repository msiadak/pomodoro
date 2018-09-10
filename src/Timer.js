import React from 'react';
import './Timer.css';

import ProgressCircle from './ProgressCircle';

export function formatTime(ms) {
  const minutes = Math.floor(ms / 60);
  const seconds = ms % 60;

  return `${minutes}:${
    seconds.toString(10).length === 1 ? '0' + seconds.toString(10) : seconds
  }`;
}

const Timer = ({ startTime, timeLeft, mode }) => {
  return (
    <div className="timer">
      <ProgressCircle
        className="timer__progress-circle"
        progress={timeLeft / startTime}
        mode={mode}
      />
      <div className="timer__timeleft">{formatTime(timeLeft)}</div>
      <div className={`timer__modetext timer__modetext--${mode}`}>{mode}</div>
    </div>
  );
};

export default Timer;
