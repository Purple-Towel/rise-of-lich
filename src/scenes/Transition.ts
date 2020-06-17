import Phaser from "phaser";
import TextBlink from "../game_components/TextBlink";

export default class Transition extends Phaser.Scene {
  constructor() {
    super("transition");
  }

  create(d: { currentLevel: number; stepsTaken: number; muted: boolean }) {
    const { currentLevel, stepsTaken, muted } = d;

    const width = this.scale.width;
    const height = this.scale.height;

    localStorage.setItem("level", currentLevel.toString());

    const currentMoveCount = parseInt(localStorage.getItem("numOfMoves")!);
    const updatedMoveCount = (currentMoveCount || 0) + stepsTaken;
    localStorage.setItem("numOfMoves", updatedMoveCount.toString());

    this.add
      .text(width * 0.5, height * 0.25, "Level Completed", {
        fontSize: 24,
        fontFamily: "Metal Mania",
        color: "#f00",
      })
      .setOrigin(0.5);

    this.add
      .text(
        width * 0.5,
        height * 0.5,
        `Steps taken: ${stepsTaken}\nTotal Moves: ${updatedMoveCount}`,
        {
          fontSize: 16,
          fontFamily: "Metal Mania",
          color: "#f00",
        }
      )
      .setOrigin(0.5);

    const next = this.add
      .text(
        width * 0.5,
        height * 0.75,
        "Press enter to continue or r to retry",
        {
          fontFamily: "Metal Mania",
          fontSize: 16,
          color: "#f00",
        }
      )
      .setOrigin(0.5);

    TextBlink.flashElement(this, next);

    this.input.keyboard.once(
      "keydown-R",
      () => {
        this.scene.start("game", {
          currentLevel: currentLevel - 1,
          steps: 0,
          muted: muted,
        });
      },
      this
    );
    this.input.keyboard.once(
      "keydown-ENTER",
      () => {
        this.scene.start("game", {
          currentLevel: currentLevel,
          steps: 0,
          muted: muted,
        });
      },
      this
    );
  }
}
