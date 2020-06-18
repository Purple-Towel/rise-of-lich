import Phaser from 'phaser';

const createAnimations = (scene: Phaser.Scene) => {
  scene.anims.create({
    key: 'move',
    frames: scene.anims.generateFrameNumbers('character', {
      start: 45,
      end: 46,
    }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: 'idle',
    frames: [{ key: 'character', frame: 40 }],
    frameRate: 20,
  });

  scene.anims.create({
    key: 'extend',
    frames: scene.anims.generateFrameNumbers('character', {
      start: 353,
      end: 356,
    }),
    frameRate: 10,
  });

  scene.anims.create({
    key: 'retract',
    frames: scene.anims.generateFrameNumbers('character', {
      start: 356,
      end: 353,
    }),
    frameRate: 10,
  });

  scene.anims.create({
    key: 'skeleton_idle',
    frames: scene.anims.generateFrameNumbers('character', {
      start: 183,
      end: 190,
    }),
    frameRate: 5,
    repeat: -1,
  });

  scene.anims.create({
    key: 'ogre_idle',
    frames: scene.anims.generateFrameNumbers('character', {
      start: 375,
      end: 382,
    }),
    frameRate: 5,
    repeat: -1,
  });

  scene.anims.create({
    key: 'demon_idle',
    frames: scene.anims.generateFrameNumbers('character', {
      start: 119,
      end: 126,
    }),
    frameRate: 5,
    repeat: -1,
  });
};

export default createAnimations;
