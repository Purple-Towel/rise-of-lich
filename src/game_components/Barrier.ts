import Phaser from 'phaser';

class Barrier {
  barriers: Phaser.GameObjects.Sprite[];

  constructor(layer: Phaser.Tilemaps.StaticTilemapLayer) {
    this.barriers = layer
      .createFromTiles(49, 11, { key: 'tiles', frame: 49 })
      .map(barrier => barrier.setOrigin(0));
  }

  getBarrierAt(x: number, y: number) {
    return this.barriers.find(barrier => {
      const rect = barrier.getBounds();
      return rect.contains(x, y);
    });
  }
}

export default Barrier;
