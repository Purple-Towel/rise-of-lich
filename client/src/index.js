import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import playGame from "./phaser/scene";
import Phaser from 'phaser'

const config = {
  type: Phaser.AUTO,
  parent: "game",
  width: 800,
  height: 600,
  scene: playGame
};

const game = new Phaser.Game(config);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
