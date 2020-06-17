import Phaser from 'phaser';
export default class Spike {
  spikes: Phaser.GameObjects.Sprite[];
  constructor(layer: Phaser.Tilemaps.StaticTilemapLayer) {
    this.spikes = layer
      .createFromTiles(777, 11, { key: 'character', frame: 356 })
      .map(spike => spike.setOrigin(0));
  }
  getSpikeAt(x: number, y: number) {
    return this.spikes.find(spikes => {
      const rect = spikes.getBounds();
      return rect.contains(x, y);
    });
  }
}
