import Phaser from 'phaser';

export default class Preload extends Phaser.Scene {
  constructor() {
    super('preload');
  }

  preload() {
    this.load.spritesheet('tiles', 'assets/Dungeon_Tileset.png', {
      frameWidth: 16,
      startFrame: 0,
    });

    this.load.spritesheet(
      'character',
      'assets/0x72_DungeonTilesetII_v1.3.png',
      {
        frameWidth: 16,
        startFrame: 0,
      }
    );
  }

  create() {
    this.scene.start('game', { currentLevel: 1 });
  }
}
