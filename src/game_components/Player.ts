import Phaser from 'phaser';

export default class Player {
  player: Phaser.GameObjects.Sprite | undefined;
  constructor(layer: Phaser.Tilemaps.StaticTilemapLayer) {
    this.player = layer
      .createFromTiles(400, 11, { key: 'character', frame: 40 })
      .pop();
  }
}
