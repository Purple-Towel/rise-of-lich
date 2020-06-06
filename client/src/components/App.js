import React, { Component } from 'react';
import './App.css';
import Tutorial from "./Tutorial";
import Game from "./Game";
import About from './About';

import { useToggleHook } from "./hooks/useToggleHook"

export default function App() {
  const ABOUT = "ABOUT";
  const TUTORIAL = "TUTORIAL";

  const { mode, toggleState} = useToggleHook(ABOUT, TUTORIAL);

    return (
      <div className="App">
        <Game></Game>
        <button onClick={toggleState}>Toggle</button>
        <Tutorial></Tutorial>
        <About></About>    
      </div>
    );
  }
