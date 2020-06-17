import Phaser from "phaser";
import TextBlink from "../game_components/TextBlink";

export default class Victory extends Phaser.Scene {
  constructor() {
    super("victory");
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    // localStorage.clear();
    const finalMoveCount = localStorage.getItem("numOfMoves");
    let highScores = localStorage.getItem("highScores");
    if (highScores) highScores = JSON.parse(highScores);
    console.log(typeof highScores);
    console.log(highScores);

    let highScore = true;

    let playerName = "Diogo"; //we'll ask player for input

    let message = `You took ${finalMoveCount} steps to escape the dungeon.`;

    if (highScore) {
      message += "\nThat's a new High score!!";
    }

    message += "\nPress Enter to play again";

    const music = this.sound.add("victory", {
      mute: false,
      volume: 0.5,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    });

    music.play();

    this.add
      .text(width * 0.5, height * 0.25, "You escaped the Lich King!", {
        fontSize: 24,
        fontFamily: "Metal Mania",
        color: "#f00",
      })
      .setOrigin(0.5);

    const enter = this.add
      .text(width * 0.5, height * 0.75, message, {
        fontFamily: "Metal Mania",
        fontSize: 14,
        color: "#f00",
      })
      .setOrigin(0.5);

    TextBlink.flashElement(this, enter);

    this.input.keyboard.once(
      "keydown-ENTER",
      () => {
        this.scene.start("intro");
        music.stop();
      },
      this
    );
  }
}
