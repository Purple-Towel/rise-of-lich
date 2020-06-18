import Phaser from "phaser";

export default class HighScores extends Phaser.Scene {
  constructor() {
    super("game");
  }
  create() {
    let highScores = [];
    if (localStorage.getItem("highScores")) {
      highScores = JSON.parse(localStorage.getItem("highScores")!);
    }

    for (const score of highScores) {
      console.log(score);
    }
  }

  update() {}
}
