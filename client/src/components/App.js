import React, { Component } from 'react';
import './App.css';
import Tutorial from "./Tutorial";

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="App">
        <h1>Play Game!</h1>
        <div id="phaser-example"/>
        <Tutorial></Tutorial>       
      </div>
    );
  }
}

export default App;
