import React, { Component } from 'react';
import './App.css';
import Tutorial from "./Tutorial";
import Game from "./Game";
import About from './About';

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="App">
        <Game></Game>
        <Tutorial></Tutorial>
        <About></About>    
      </div>
    );
  }
}

export default App;
