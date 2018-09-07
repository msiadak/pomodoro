import React, { Component, Fragment } from 'react';
import './App.css';

import Timer from './Timer';

class App extends Component {
  constructor() {
    super();

    this.state = {
      mode: 'stopped',
      paused: false,
      timeLeft: null,
      intervalID: null,
    };

    this.handleStartClick = this.handleStartClick.bind(this);
    this.countDown = this.countDown.bind(this);
    this.handlePauseClick = this.handlePauseClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
  }

  handleStartClick(mode) {
    let timeLeft;
    switch (mode) {
      case 'pomodoro':
        timeLeft = 25 * 60;
        break;
      case 'shortBreak':
        timeLeft = 5 * 60;
        break;
      case 'longBreak':
        timeLeft = 15 * 60;
        break;
      default:
        throw new Error(`Invalid mode passed to handleStartClick: ${mode}`);
    }

    this.setState({
      mode,
      paused: false,
      timeLeft,
      startTime: timeLeft,
      intervalID: setInterval(this.countDown, 1000),
    });
  }

  countDown() {
    this.setState(state => {
      const timeLeft = state.timeLeft - 1;
      let intervalID = state.intervalID;

      if (timeLeft <= 0) {
        clearInterval(intervalID);
        intervalID = null;
      }

      return {
        timeLeft,
        intervalID,
      };
    });
  }

  handlePauseClick() {
    clearInterval(this.state.intervalID);
    this.setState(state => ({
      paused: true,
      intervalID: null,
    }));
  }

  handleCancelClick() {
    if (this.state.intervalID) {
      clearInterval(this.state.intervalID);
    }
    this.setState({
      mode: 'stopped',
      timeLeft: null,
      intervalID: null,
    });
  }

  render() {
    return (
      <div>
        <Timer
          timeLeft={this.state.timeLeft}
          startTime={this.state.startTime}
        />

        {this.state.mode !== 'stopped' ? (
          <Fragment>
            <button
              onClick={() => {
                this.handlePauseClick();
              }}
            >
              Pause
            </button>
            <button
              onClick={() => {
                this.handleCancelClick();
              }}
            >
              Cancel
            </button>
          </Fragment>
        ) : (
          <Fragment>
            <button
              onClick={() => {
                this.handleStartClick('pomodoro');
              }}
            >
              Start Pomodoro
            </button>
            <button
              onClick={() => {
                this.handleStartClick('shortBreak');
              }}
            >
              Start Short Break
            </button>
            <button
              onClick={() => {
                this.handleStartClick('longBreak');
              }}
            >
              Start Long Break
            </button>
          </Fragment>
        )}
      </div>
    );
  }
}

export default App;
