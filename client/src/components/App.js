import React, { Component } from 'react';
import './App.css';
import Tutorial from "./Tutorial";
import Game from "./Game";
import About from './About';

import { useToggleHook } from "./hooks/useToggleHook"

export default function App() {


    return (
      <div className="App">
        <Game></Game>
        <Tutorial></Tutorial>
        <About></About>    
      </div>
    );
  }
