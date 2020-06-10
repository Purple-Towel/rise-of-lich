import Phaser from 'phaser';
import TextBlink from '../game_components/TextBlink';

export default class Transition extends Phaser.Scene {
  constructor() {
    super('transition');
  }

  create(d: { currentLevel: number; staminaUsed: number }) {
    const { currentLevel, staminaUsed } = d;

    const width = this.scale.width;
    const height = this.scale.height;

    this.add
      .text(width * 0.5, height * 0.25, 'Level Completed', {
        fontSize: 24,
        fontFamily: 'Metal Mania',
        color: '#f00',
      })
      .setOrigin(0.5);

    this.add
      .text(width * 0.5, height * 0.5, `Stamina Used: ${staminaUsed}`, {
        fontSize: 16,
        fontFamily: 'Metal Mania',
        color: '#f00',
      })
      .setOrigin(0.5);

    const next = this.add
      .text(
        width * 0.5,
        height * 0.75,
        'Press enter to continue or r to retry',
        {
          fontFamily: 'Metal Mania',
          fontSize: 16,
          color: '#f00',
        }
      )
      .setOrigin(0.5);

    TextBlink.flashElement(this, next);

    this.input.keyboard.once(
      'keydown-R',
      () => {
        this.scene.start('game', { currentLevel: currentLevel - 1 });
      },
      this
    );
    this.input.keyboard.once(
      'keydown-ENTER',
      () => {
        this.scene.start('game', { currentLevel: currentLevel });
      },
      this
    );
  }
}
