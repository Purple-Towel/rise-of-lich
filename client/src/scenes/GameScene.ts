import Phaser from 'phaser';

export default class Game extends Phaser.Scene {
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private player?: Phaser.GameObjects.Sprite;
  private boxes: Phaser.GameObjects.Sprite[] = [];
  private layer?: Phaser.Tilemaps.StaticTilemapLayer;
  constructor() {
    super('game');
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

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    const level = [
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5],
      [10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 25],
      [0, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 15],
      [10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 25],
      [0, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 15],
      [10, 11, 11, 11, 11, 83, 11, 11, 400, 11, 11, 11, 11, 11, 11, 25],
      [0, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 15],
      [10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 25],
      [0, 11, 11, 11, 49, 11, 11, 11, 11, 11, 11, 83, 11, 11, 11, 15],
      [10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 25],
      [0, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 15],
      [40, 41, 42, 41, 42, 41, 42, 41, 42, 41, 42, 41, 42, 41, 42, 45],
    ];
    const map = this.make.tilemap({
      data: level,
      tileWidth: 16,
      tileHeight: 16,
    });

    const tiles = map.addTilesetImage('tiles');
    this.layer = map.createStaticLayer(0, tiles, 0, 0);

    this.boxes = this.layer
      .createFromTiles(83, 11, { key: 'tiles', frame: 83 })
      .map(box => box.setOrigin(0));

    this.player = this.layer
      .createFromTiles(400, 11, { key: 'character', frame: 40 })
      .pop();

    this.player?.setOrigin(0);
    this.createPlayerAnimations();
  }

  update() {
    if (!this.cursors) {
      return;
    }

    const justLeft = Phaser.Input.Keyboard.JustDown(this.cursors.left!);
    const justRight = Phaser.Input.Keyboard.JustDown(this.cursors.right!);
    const justDown = Phaser.Input.Keyboard.JustDown(this.cursors.down!);
    const justUp = Phaser.Input.Keyboard.JustDown(this.cursors.up!);

    if (justRight) {
      // players next coords
      if (!this.player) return;
      const nx = this.player.x + 24;
      const ny = this.player.y + 8;
      this.tweenMove(nx, ny, 'x', 'positive');
    } else if (justLeft) {
      if (!this.player) return;
      const nx = this.player.x - 8;
      const ny = this.player.y + 8;
      this.tweenMove(nx, ny, 'x', 'negative');
    } else if (justDown) {
      if (!this.player) return;
      const nx = this.player.x + 8;
      const ny = this.player.y + 24;
      this.tweenMove(nx, ny, 'y', 'positive');
    } else if (justUp) {
      if (!this.player) return;
      const nx = this.player.x + 8;
      const ny = this.player.y - 8;
      this.tweenMove(nx, ny, 'y', 'negative');
    }
  }

  private tweenMove(
    x: number,
    y: number,
    axis: string,
    direction: 'positive' | 'negative'
  ) {
    // check if already tweening, if so, then don't do anything.
    if (this.tweens.isTweening(this.player!)) return undefined;
    // if next move has wall escape early
    if (this.hasObstructionAt(x, y)) return undefined;

    const PIXELS = 16;

    const directionXY = {
      positive: `+=${PIXELS}`,
      negative: `-=${PIXELS}`,
    };

    // move box
    const box = this.getBoxAt(x, y);

    if (box) {
      if (!this.checkBoxMovement(box, axis, direction, PIXELS)) {
        return undefined;
      }
      this.tweens.add({
        targets: box,
        [axis]: directionXY[direction],
        duration: 500,
      });
    }
    // move player
    this.tweens.add({
      onStart: () => {
        this.player?.anims.play('move', true);
      },
      targets: this.player,
      [axis]: directionXY[direction],
      duration: 500,
      onComplete: () => {
        this.player?.anims.play('idle', true);
      },
      onCompleteScope: this,
    });
  }

  // checks if box is being moved into an obstruction
  private checkBoxMovement(
    box: Phaser.GameObjects.Sprite,
    axis: string,
    direction: string,
    value: number
  ) {
    if (axis === 'x' && direction === 'negative') {
      if (this.hasObstructionAt(box.getBounds().x - value, box.getBounds().y)) {
        return false;
      }
    } else if (axis === 'x' && direction === 'positive') {
      if (this.hasObstructionAt(box.getBounds().x + value, box.getBounds().y)) {
        return false;
      }
    } else if (axis === 'y' && direction === 'negative') {
      if (this.hasObstructionAt(box.getBounds().x, box.getBounds().y - value)) {
        return false;
      }
    } else if (axis === 'y' && direction === 'positive') {
      if (this.hasObstructionAt(box.getBounds().x, box.getBounds().y + value)) {
        return false;
      }
    }
    return true;
  }

  private hasObstructionAt(x: number, y: number) {
    if (!this.layer) {
      return false;
    }

    const tile = this.layer.getTileAtWorldXY(x, y);
    if (!tile) return false;
    const obstructions = [0, 1, 5, 10, 15, 25, 40, 41, 42, 45, 49];
    return obstructions.indexOf(tile.index) !== -1;
  }

  private getBoxAt(x: number, y: number) {
    return this.boxes.find(box => {
      const rect = box.getBounds();
      return rect.contains(x, y);
    });
  }

  private createPlayerAnimations() {
    this.anims.create({
      key: 'move',
      frames: this.anims.generateFrameNumbers('character', {
        start: 40,
        end: 43,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'idle',
      frames: [{ key: 'character', frame: 40 }],
      frameRate: 20,
    });
  }
}
