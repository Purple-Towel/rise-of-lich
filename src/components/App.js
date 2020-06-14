import React from 'react';
import styled from 'styled-components';
import './App.css';
import Game from './Game';
import Navbar from './Navbar';

const GameCanvas = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
`;

export default function App() {
  return (
    <div className="App">
      <GameCanvas>
        <Game />
      </GameCanvas>
      <Navbar />
    </div>
  );
}
