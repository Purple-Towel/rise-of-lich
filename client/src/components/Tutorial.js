import React, { Component } from 'react';
import './Tutorial.css';

class Tutorial extends Component {
  render() {
    return (
      <div>
        <h1>Tutorial</h1>
        <div className="grid2x3">
          <img src="assets/empty.png" alt="empty" />
          <img src="assets/up_arr.png" alt="up-arrow" />
          <img src="assets/empty.png" alt="empty" />
          <img src="assets/left_arr.png" alt="left-arrow" />
          <img src="assets/down_arr.png" alt="down-arrow" />
          <img src="assets/right_arr.png" alt="right-arrow" />
        </div>
        <p>
          Movement: You may press any of the above indicated keys to move the
          character in the corresponding direction. Moving takes Stamina, and
          once you reach 0 Stamina it will be game over.
        </p>
      </div>
    );
  }
}

export default Tutorial;
