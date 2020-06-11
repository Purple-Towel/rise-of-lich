import React from 'react';
import styled from 'styled-components';
import './App.css';
import Game from './Game';
//import Navbar from './Navbar';
import Button from "./Button";
import About from "./About";
import Tutorial from "./Tutorial";
import { useToggleHook } from "./hooks/useToggleHook";

const GameCanvas = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
`;

export default function App() {
  const ABOUT = "ABOUT";
  const TUTORIAL = "TUTORIAL";

  const { mode, toggleState } = useToggleHook(ABOUT, TUTORIAL);

  return (
    <div className="App">
      <GameCanvas>
        <Game />
      </GameCanvas>
      <div class="center-div"><Button onClick={toggleState} mode={mode} /></div>
      {mode === TUTORIAL && (<Tutorial />)}
      {mode === ABOUT && (<About />)}   
    </div>
  );
}
