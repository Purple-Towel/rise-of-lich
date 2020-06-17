import Phaser from "phaser";
import TextBlink from "../game_components/TextBlink";

export default class Intro extends Phaser.Scene {
  constructor() {
    super("intro");
  }

  preload() {
    this.load.audio("audio_scream", "assets/audio/intro_scream.ogg");
  }
  create() {
    const width = this.scale.width;
    const height = this.scale.height;
    const title = "Rise of Lich: Revengeance";
    const currentLevel = parseInt(localStorage.getItem("level") as string) || 1;

    const highScores = [
      { name: "jack", score: 995 },
      { name: "jill", score: 2 },
      { name: "joe", score: 6 },
      { name: "jane", score: 18 },
      { name: "john", score: 39 },
    ];

    localStorage.setItem("highScores", JSON.stringify(highScores));

    /* --- START OF TESTING --- */
    /* 
    let form = `
    <input id="textInput" type="text" name="nameField" placeholder="Enter your name" style="font-size: 4px"/>
    <input type="button" name="saveButton" value="Save High Score" style="font-size: 4px" />
    `;
    this.add.text(10, height * 0.5, "Please enter your name:", {
      color: "red",
      fontSize: "10px",
    });

    let playerName = "";
    let nameInputForm = this.add.dom(50, 120).createFromHTML(form);
    nameInputForm.addListener("click");

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
          console.log("Victory -> create -> playerName", playerName);
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
    }); */
    /* --- END OF TESTING --- */

    let message: string;
    if (localStorage.getItem("level")) {
      message = "Press ENTER to start or R to resume";
    } else {
      message = "Press Enter to start";
    }
    this.anims.create({
      key: "lich-idle",
      frames: this.anims.generateFrameNumbers("lich", { start: 0, end: 5 }),
      frameRate: 5,
      repeat: -1,
    });

    this.add.sprite(width * 0.5, height * 0.5, "lich").play("lich-idle");

    this.add
      .text(width * 0.5, height * 0.25, title, {
        fontSize: 24,
        fontFamily: "Metal Mania",
        color: "#f00",
      })
      .setOrigin(0.5);

    const enter = this.add
      .text(width * 0.5, height * 0.75, message, {
        fontFamily: "Metal Mania",
        fontSize: 16,
        color: "#f00",
      })
      .setOrigin(0.5);

    TextBlink.flashElement(this, enter);

    this.input.keyboard.once(
      "keydown-R",
      () => {
        this.sound.add("audio_scream").play();
        this.scene.start("game", { currentLevel, steps: 0 });
      },
      this
    );
    this.input.keyboard.once(
      "keydown-ENTER",
      () => {
        this.sound.add("audio_scream").play();
        this.scene.start("game", { currentLevel: 1, steps: 0 });
      },
      this
    );
  }
}
