// helper to implement blinking text in the Phaser game
import Phaser from 'phaser';

export default class TextBlink {
  static flashElement(
    scene: Phaser.Scene,
    element: Phaser.GameObjects.Text,
    repeat = true,
    easing = 'Linear',
    overallDuration = 1500,
    visiblePauseDuration = 500
  ) {
    if (scene && element) {
      let flashDuration = overallDuration - visiblePauseDuration / 2;

      // builds a sequence of tweens
      scene.tweens.timeline({
        tweens: [
          {
            targets: element,
            duration: 0,
            alpha: 0,
            ease: easing,
          },
          {
            targets: element,
            duration: flashDuration,
            alpha: 1,
            ease: easing,
          },
          {
            targets: element,
            duration: visiblePauseDuration,
            alpha: 1,
            ease: easing,
          },
          {
            targets: element,
            duration: flashDuration,
            alpha: 0,
            ease: easing,
            onComplete: () => {
              if (repeat === true) {
                this.flashElement(scene, element);
              }
            },
          },
        ],
      });
    }
  }
}
