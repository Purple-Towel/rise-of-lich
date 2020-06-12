import Phaser from 'phaser';
import WebFontLoader from '../game_components/WebFontLoader';

export default class Preload extends Phaser.Scene {
  constructor() {
    super('preload');
  }

  preload() {
    this.load.spritesheet('ghost-idle', 'assets/ghost-idle.png', {
      frameWidth: 64,
      frameHeight: 64,
    });

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

    this.load.spritesheet('lich', 'assets/demon-idle.png', {
      frameWidth: 160,
      frameHeight: 140,
    });
    const fonts = new WebFontLoader(this.load, ['Metal Mania']);
    this.load.addFile(fonts);

    this.load.spritesheet('hud-icon', 'assets/hud-icon.png', {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.audio('game_over', 'assets/audio/game_over.ogg');
  }

  create() {
    this.scene.start('intro');
  }
}
