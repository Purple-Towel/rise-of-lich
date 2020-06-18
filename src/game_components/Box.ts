import Phaser from 'phaser';

class Box {
  boxes: Phaser.GameObjects.Sprite[];

  constructor(layer: Phaser.Tilemaps.StaticTilemapLayer) {
    this.boxes = layer
      .createFromTiles(83, 11, { key: 'tiles', frame: 83 })
      .map(box => box.setOrigin(0));
  }

  getBoxAt(x: number, y: number) {
    return this.boxes.find(box => {
      const rect = box.getBounds();
      return rect.contains(x, y);
    });
  }
}

export default Box;
