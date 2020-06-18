import Phaser from "phaser";
import TextBlink from "../game_components/TextBlink";

export default class HighScores extends Phaser.Scene {
  constructor() {
    super("highscores");
  }
  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    let highScores = [];
    if (localStorage.getItem("highScores")) {
      highScores = JSON.parse(localStorage.getItem("highScores")!);
    }

    if (Array.isArray(highScores) && highScores.length >= 1) {
      // sort highScores from smallest number of steps
      highScores.sort((a, b) => a.score - b.score);
    }

    const textStyle = {
      fontFamily: "Metal Mania",
      fontSize: 14,
      color: "#f00",
    };
    this.add
      .text(width * 0.5, height * 0.25, "- High Scores -", { textStyle })
      .setOrigin(0.5);

    // Display the 5 highest scores spreading them out evenly to the screen
    for (let i = 0; i <= 4; i++) {
      if (highScores[i]) {
        let { name, score } = highScores[i];
        this.add.text(50, 15 * i + 60, `${i + 1} - `, {
          ...textStyle,
          fontsize: 8,
        });
        this.add.text(120, 15 * i + 60, name, {
          ...textStyle,
          fontsize: 8,
        });
        this.add.text(190, 15 * i + 60, score, {
          ...textStyle,
          fontsize: 8,
        });
      }
    }

    const message = "Press Enter to start game";

    const enter = this.add
      .text(width * 0.5, height * 0.9, message, {
        fontFamily: "Metal Mania",
        fontSize: 14,
        color: "#f00",
      })
      .setOrigin(0.5);

    TextBlink.flashElement(this, enter);
    // restart the game
    this.input.keyboard.once(
      "keydown-ENTER",
      () => {
        this.scene.start("intro");
        this.sound.stopAll();
      },
      this
    );
  }
  update() {}
}
