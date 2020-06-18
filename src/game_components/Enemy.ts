import Phaser from 'phaser';

export const DEMON = 222;
export const SKELETON = 223;
export const OGRE = 224;

export default class Enemy {
  enemies: Phaser.GameObjects.Sprite[];
  constructor(tile: number, layer: Phaser.Tilemaps.StaticTilemapLayer) {
    this.enemies = layer
      .createFromTiles(tile, 11, {
        key: 'character',
      })
      .map(e => e.setOrigin(0));
  }
  getEnemyAt(x: number, y: number) {
    return this.enemies?.find(enemy => {
      const rect = enemy.getBounds();
      return rect.contains(x, y);
    });
  }
}
