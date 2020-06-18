// Victory scene when game beaten

import Phaser from "phaser";
import TextBlink from "../game_components/TextBlink";

export default class Victory extends Phaser.Scene {
  // private highScore: boolean = false;

  constructor() {
    super("victory");
  }

  create(steps: { stepsTaken: number }) {
    const width = this.scale.width;
    const height = this.scale.height;

    let finalMoveCount = steps.stepsTaken;
    let playerName = "";

    let highScores = JSON.parse(localStorage.getItem("highScores")!);

    if (Array.isArray(highScores) && highScores.length >= 1) {
      // sort highScores from smallest number of steps
      highScores.sort((a, b) => a.score - b.score);
    }
    let highScore = false;

    let form = `
    <input class="user-input" type="text" name="nameField" placeholder="Enter your name" style="font-size: 4px"/>
    <input class="user-input" type="button" name="saveButton" value="Save Your Score" style="font-size: 4px" />
    `;

    let nameInputForm = this.add.dom(51, 80).createFromHTML(form);
    nameInputForm.addListener("click");

    nameInputForm.on("click", function (
      this: Phaser.GameObjects.DOMElement,
      event: any
    ) {
      if (event.target.name === "saveButton") {
        let textInput = document.getElementsByTagName("input")[0];

        if (textInput.value !== "") {
          //  Turn off the click events
          this.removeListener("click");
          //  Hide the login nameInputForm
          this.setVisible(false);

          playerName = textInput.value.trim().replace(/ /g, "").substr(0, 10);
          // myText.visible = false;
          // Checks if the users score is a high score and inserts it appropriately
          for (let i = 0; i <= highScores.length - 1; i++) {
            if (finalMoveCount < highScores[i].score) {
              highScores.splice(i, 0, {
                name: `${playerName}`,
                score: finalMoveCount,
              });
              break;
            }
          }
          localStorage.setItem("highScores", JSON.stringify(highScores));
        } else {
          //  Flash the prompt
          this.scene.tweens.add({
            targets: nameInputForm,
            alpha: 0.2,
            duration: 250,
            ease: "Power3",
            yoyo: true,
          });
        }
      }
    });

    // Checks if the users score is a high score and change the flag
    for (let i = 0; i <= highScores.length - 1; i++) {
      if (finalMoveCount < highScores[i].score) {
        highScore = true;
        break;
      }
    }

    // Update highScores and clear save game states:
    localStorage.removeItem("level");
    localStorage.removeItem("numOfMoves");

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

    let message = `You took ${finalMoveCount} steps to escape the dungeon.`;
    if (highScore) {
      message += "\nThat's a new High score!!";
    }
    message += "\nPress Enter to play again\nPress H to see the High Scores";

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

    // restart the game
    this.input.keyboard.once(
      "keydown-ENTER",
      () => {
        this.scene.start("intro");
        music.stop();
      },
      this
    );

    // load High Scores
    this.input.keyboard.once("keydown-H", () => this.scene.start("highscores"));
  }
}
