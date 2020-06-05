import React, { Component } from 'react';
import './App.css';
import Tutorial from "./Tutorial";
import Aout from "./About";
import About from './About';

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
        <About></About>    
      </div>
    );
  }
}

export default App;
