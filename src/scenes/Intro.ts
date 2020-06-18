// Introduction scene
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

    // Restart level when R is pressed
    this.input.keyboard.once(
      "keydown-R",
      () => {
        this.sound.add("audio_scream").play();
        this.scene.start("game", { currentLevel, steps: 0 });
      },
      this
    );

    // Play next level when ENTER is pressed
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
