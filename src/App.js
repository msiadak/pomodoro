import React, { Component, Fragment } from 'react';
import './App.css';

import Timer, { formatTime } from './Timer';

class App extends Component {
  constructor() {
    super();

    this.state = {
      mode: 'stopped',
      paused: false,
      timeLeft: null,
      intervalID: null,
      settings: {
        workSessionLength: 25,
        shortBreakLength: 5,
        longBreakLength: 15,
      },
    };

    this.handleStartClick = this.handleStartClick.bind(this);
    this.countDown = this.countDown.bind(this);
    this.handlePauseClick = this.handlePauseClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
  }

  handleStartClick = mode => {
    let timeLeft;
    switch (mode) {
      case 'workSession':
        timeLeft = this.state.settings.workSessionLength * 60;
        break;
      case 'shortBreak':
        timeLeft = this.state.settings.shortBreakLength * 60;
        break;
      case 'longBreak':
        timeLeft = this.state.settings.longBreakLength * 60;
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
  };

  countDown = () => {
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
  };

  handlePauseClick = () => {
    this.setState(({ paused, intervalID }) => {
      if (paused) {
        intervalID = setInterval(this.countDown, 1000);
      } else {
        clearInterval(intervalID);
        intervalID = null;
      }
      return {
        paused: !paused,
        intervalID: intervalID,
      };
    });
  };

  handleCancelClick = () => {
    if (this.state.intervalID) {
      clearInterval(this.state.intervalID);
    }
    this.setState({
      mode: 'stopped',
      timeLeft: null,
      intervalID: null,
    });
  };

  componentDidUpdate() {
    document.title = `${this.state.mode} - ${formatTime(this.state.timeLeft)}`;
  }

  render() {
    const buttons =
      this.state.mode === 'stopped' ? (
        <Fragment>
          <button
            className="buttons__button buttons__button--worksession"
            onClick={() => {
              this.handleStartClick('workSession');
            }}
          >
            Work Session
          </button>
          <button
            className="buttons__button buttons__button--shortbreak"
            onClick={() => {
              this.handleStartClick('shortBreak');
            }}
          >
            Short Break
          </button>
          <button
            className="buttons__button buttons__button--longbreak"
            onClick={() => {
              this.handleStartClick('longBreak');
            }}
          >
            Long Break
          </button>
        </Fragment>
      ) : (
        <Fragment>
          <button className="buttons__button" onClick={this.handlePauseClick}>
            Pause
          </button>
          <button className="buttons__button" onClick={this.handleCancelClick}>
            Cancel
          </button>
        </Fragment>
      );

    return (
      <div className="app">
        <Timer
          timeLeft={this.state.timeLeft}
          startTime={this.state.startTime}
          mode={this.state.mode}
        />
        <div className="buttons">{buttons}</div>
      </div>
    );
  }
}

export default App;
