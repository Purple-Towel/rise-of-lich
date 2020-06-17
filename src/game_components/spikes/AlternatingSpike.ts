import Phaser from 'phaser';

export default class AlternatingSpike {
  spikes: Phaser.GameObjects.Sprite[];

  constructor(position: boolean, layer: Phaser.Tilemaps.StaticTilemapLayer) {
    if (position) {
      this.spikes = layer
        .createFromTiles(779, 11, { key: 'character', frame: 356 })
        .map(spikeAlternating1 => spikeAlternating1.setOrigin(0));
    } else {
      this.spikes = layer
        .createFromTiles(778, 11, { key: 'character', frame: 353 })
        .map(spikeAlternating1 => spikeAlternating1.setOrigin(0));
    }
  }

  getSpikeAlternating(x: number, y: number) {
    return this.spikes.find(spike => {
      const rect = spike.getBounds();
      return rect.contains(x, y);
    });
  }
}
