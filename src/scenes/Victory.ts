import Phaser from "phaser";
import TextBlink from "../game_components/TextBlink";

export default class Victory extends Phaser.Scene {
  constructor() {
    super("victory");
  }

  create(steps: { stepsTaken: number }) {
    const width = this.scale.width;
    const height = this.scale.height;

    let finalMoveCount = steps.stepsTaken;
    let playerName = "Diogo";

    console.log("Victory -> create -> finalMoveCount", finalMoveCount);

    // if (localStorage.getItem("numOfMoves")) {
    //   finalMoveCount = parseInt(localStorage.getItem("numOfMoves")!);
    //   console.log("Victory -> create -> finalMoveCount", finalMoveCount);
    // }

    interface Scores {
      name: string;
      score: number;
    }
    let highScores: Scores = JSON.parse(localStorage.getItem("highScores")!);
    console.log("highScores before IF", highScores);
    let highScore = false;

    if (!highScores) {
      console.log("High Scores were not retrieved properly.");
    } else if (Array.isArray(highScores)) {
      // sort highScores from smallest number of steps
      highScores.sort((a, b) => a.score - b.score);

      console.log("highScores after if Array.isArray", highScores);

      // let insertionIndex = 0;
      for (let i = 0; i <= highScores.length - 1; i++) {
        if (finalMoveCount < highScores[i].score) {
          highScore = true;
          highScores.splice(i, 0, {
            name: `${playerName}`,
            score: finalMoveCount,
          });
          break;
        }
      }
    }

    console.log("Victory -> create -> highScores", highScores);

    //now we have the object. THEN:
    // 1. When user finishes the game, we sort the array
    // 2. Loop over the sorted array and see if his score is less than the current ones, starting with the pos.1

    // 3. Then we will add a new score to the list appending the position key with right position
    // 4. Save the new high scores to localStorage and clear the level and steps
    // localStorage.removeItem("level");
    // localStorage.removeItem("numOfMoves");

    const tempVarNewHighScore = 996;

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
      .setOrigin(0.4);

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
