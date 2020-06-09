import Phaser from 'phaser';
import TextBlink from '../game_components/TextBlink';

export default class Intro extends Phaser.Scene {
  private player?: Phaser.GameObjects.Sprite;
  constructor() {
    super('intro');
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;
    const title = 'Rise of Lich: Revengeance';
    this.anims.create({
      key: 'lich-idle',
      frames: this.anims.generateFrameNumbers('lich', { start: 0, end: 5 }),
      frameRate: 5,
      repeat: -1,
    });

    this.player = this.add
      .sprite(width * 0.5, height * 0.5, 'lich')
      .play('lich-idle');

    this.add
      .text(width * 0.5, height * 0.25, title, {
        fontSize: 24,
        fontFamily: 'Metal Mania',
        color: '#f00',
      })
      .setOrigin(0.5);

    const enter = this.add
      .text(width * 0.5, height * 0.75, 'Press enter to start', {
        fontFamily: 'Metal Mania',
        fontSize: 16,
        color: '#f00',
      })
      .setOrigin(0.5);

    TextBlink.flashElement(this, enter);

    this.input.keyboard.once(
      'keydown-ENTER',
      () => {
        this.scene.start('game', { currentLevel: 1 });
      },
      this
    );
  }
}
