// Victory scene when game beaten

import Phaser from "phaser";
import TextBlink from "../game_components/TextBlink";

export default class Victory extends Phaser.Scene {
  private highScore: boolean = false;

  constructor() {
    super("victory");
  }

  create(steps: { stepsTaken: number }) {
    const width = this.scale.width;
    const height = this.scale.height;

    let finalMoveCount = steps.stepsTaken;
    let playerName = "";

    let highScores = JSON.parse(localStorage.getItem("highScores")!);
    console.log("highScores before IF", highScores);

    if (Array.isArray(highScores) && highScores.length >= 1) {
      // sort highScores from smallest number of steps
      highScores.sort((a, b) => a.score - b.score);
      console.log("highScores after sort", highScores);
    }

    let form = `
    <input type="text" name="nameField" placeholder="Enter your name" style="font-size: 4px"/>
    <input type="button" name="saveButton" value="Save High Score" style="font-size: 4px" />
    `;
    // TODO this text has to be removed after user input
    let myText = this.add.text(10, height * 0.4, "Please enter your name:", {
      color: "red",
      fontSize: "12px",
    });
    myText.visible = true;

    let nameInputForm = this.add.dom(51, 100).createFromHTML(form);
    nameInputForm.addListener("click");
    let setScoreFlag = false;

    nameInputForm.on("click", function (
      this: Phaser.GameObjects.DOMElement,
      event: any
    ) {
      if (event.target.name === "saveButton") {
        let textInput = document.getElementsByTagName("input")[0];
        console.log("Intro -> create -> textInput", textInput.value);

        //  Have they entered anything?
        if (textInput.nodeValue !== "") {
          //  Turn off the click events
          this.removeListener("click");
          //  Hide the login nameInputForm
          this.setVisible(false);
          playerName = textInput.value;
          setScoreFlag = true;
          myText.visible = false;
          for (let i = 0; i <= highScores.length - 1; i++) {
            if (finalMoveCount < highScores[i].score) {
              // Victory.highScore = true;
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

    // Call a function that will save the highScores with player name (set the localStorage)
    if (setScoreFlag) this.setHighScore(playerName, finalMoveCount, highScores);

    // Update highScores and clear save game states:
    // localStorage.setItem("highScores", JSON.stringify(highScores));

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
    if (this.highScore) {
      message += "\nThat's a new High score!!";
    }
    message += "\nPress Enter to play again";

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
  }

  setHighScore(playerName: string, finalMoveCount: number, highScores: any) {
    console.log("setHighScore -> playerName", playerName);
    console.log("setHighScore -> finalMoveCount", finalMoveCount);
    console.log("setHighScore -> highScores", highScores);

    for (let i = 0; i <= highScores.length - 1; i++) {
      if (finalMoveCount < highScores[i].score) {
        this.highScore = true;
        highScores.splice(i, 0, {
          name: `${playerName}`,
          score: finalMoveCount,
        });
        break;
      }
    }
    localStorage.setItem("highScores", JSON.stringify(highScores));
  }
}
