import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
// import playGame from './phaser/scene';
import Phaser from "phaser";
import Game from "./scenes/GameScene";

const config = {
  type: Phaser.AUTO,
  width: 256,
  height: 192,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: [Game],
  scale: {
    zoom: 3,
  },
};

export default new Phaser.Game(config);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
