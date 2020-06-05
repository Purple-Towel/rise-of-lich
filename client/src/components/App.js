import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="App">
        <h1>Play Game!</h1>
        <div id="phaser-example"/>       
      </div>
    );
  }
}

export default App;
