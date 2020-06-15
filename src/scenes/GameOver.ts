// Gameover scene played when sprite loses all stamina

import Phaser from 'phaser';
import TextBlink from '../game_components/TextBlink';

export default class GameOver extends Phaser.Scene {
  private currentLevel?: number = 1;
  constructor() {
    super('gameOver');
  }

  create(d: { currentLevel: number; muted: boolean }) {
    const { currentLevel, muted } = d;
    this.currentLevel = currentLevel;
    const width = this.scale.width;
    const height = this.scale.height;

    this.anims.create({
      key: 'ghost-idle',
      frames: this.anims.generateFrameNumbers('ghost-idle', {
        start: 0,
        end: 6,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.add.sprite(width * 0.5, height * 0.5, 'ghost-idle').play('ghost-idle');

    this.add
      .text(width * 0.5, height * 0.25, 'Game Over', {
        fontSize: 24,
        fontFamily: 'Metal Mania',
        color: '#f00',
      })
      .setOrigin(0.5);

    const enter = this.add
      .text(width * 0.5, height * 0.75, 'Press r to retry', {
        fontFamily: 'Metal Mania',
        fontSize: 16,
        color: '#f00',
      })
      .setOrigin(0.5);

    TextBlink.flashElement(this, enter);

    // replay current level when R is pressed
    this.input.keyboard.once(
      'keydown-R',
      () => {
        this.scene.start('game', {
          currentLevel: this.currentLevel,
          steps: 0,
          muted: muted,
        });
      },
      this
    );
  }
}
