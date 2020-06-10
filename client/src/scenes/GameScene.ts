import Phaser from "phaser";
// import movesLeft from "../helpers/movesLeft";

export default class Game extends Phaser.Scene {
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private player?: Phaser.GameObjects.Sprite;
  private boxes: Phaser.GameObjects.Sprite[] = [];
  private spikes: Phaser.GameObjects.Sprite[] = [];
  private spikesAlternating1: Phaser.GameObjects.Sprite[] = [];
  private spikesAlternating2: Phaser.GameObjects.Sprite[] = [];
  private barriers: Phaser.GameObjects.Sprite[] = [];
  private layer?: Phaser.Tilemaps.StaticTilemapLayer;
  private facing: 'right' | 'left' | 'up' | 'down' = 'right';
  private moves = 50;
  private steps = 0;
  private movesText?: Phaser.GameObjects.Text;
  private stepsText?: Phaser.GameObjects.Text;
  // private canvas?: Phaser.s
  // private movesLeft?: movesLeft;
  constructor() {
    super("game");
  }

  preload() {
    this.load.spritesheet("tiles", "assets/Dungeon_Tileset.png", {
      frameWidth: 16,
      startFrame: 0,
    });

    this.load.spritesheet(
      "character",
      "assets/0x72_DungeonTilesetII_v1.3.png",
      {
        frameWidth: 16,
        startFrame: 0,
      }
    );

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    // this.canvas = this.sys.game.canvas;

    const level = [
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5],
      [10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 25],
      [0, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 15],
      [10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 25],
      [0, 11, 11, 11, 11, 11, 11, 778, 11, 779, 11, 11, 11, 11, 11, 15],
      [10, 11, 11, 11, 49, 83, 11, 779, 400, 778, 11, 777, 11, 11, 11, 25],
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

    const tiles = map.addTilesetImage("tiles");
    this.layer = map.createStaticLayer(0, tiles, 0, 0);

    this.barriers = this.layer
      .createFromTiles(49, 11, { key: 'tiles', frame: 49 })
      .map(barrier => barrier.setOrigin(0));

      this.spikes = this.layer
      .createFromTiles(777, 11, {key: 'character', frame: 356})
      .map(spike => spike.setOrigin(0))

      this.spikesAlternating1 = this.layer
      .createFromTiles(778, 11, {key: 'character', frame: 353})
      .map(spikeAlternating1 => spikeAlternating1.setOrigin(0))
      
      this.spikesAlternating2 = this.layer
      .createFromTiles(779, 11, {key: 'character', frame: 356})
      .map(spikeAlternating1 => spikeAlternating1.setOrigin(0))

    this.boxes = this.layer
      .createFromTiles(83, 11, { key: "tiles", frame: 83 })
      .map((box) => box.setOrigin(0));

    this.player = this.layer
      .createFromTiles(400, 11, { key: "character", frame: 40 })
      .pop();

    this.player?.setOrigin(0);
    this.createPlayerAnimations();
    this.createSpikeAnimations();

    this.movesText = this.add.text(16, 170, `Moves: ${this.moves}`, {
      fontSize: "16px",
      fill: "#f00",
    });
    this.movesText.setShadow(1, 1);
    this.stepsText = this.add.text(16, 150, `Steps: ${this.steps}`);
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
      if (!this.player) return;
      if (this.facing === 'left') {
        this.player.toggleFlipX();
        this.facing = 'right';
      }
      // players next coords
      const nx = this.player.x + 24;
      const ny = this.player.y + 8;
      this.tweenMove(nx, ny, "x", "positive");
      this.moves -= 1; //! REPLACE THIS WITH CLASS METHOD
      this.steps += 1;
      this.movesText?.setText(`Moves: ${this.moves}`)
      this.stepsText?.setText(`Steps: ${this.steps}`); //! REPLACE THIS WITH CLASS METHOD
    } else if (justLeft) {
      if (!this.player) return;
      if (this.facing === 'right') {
        this.player.toggleFlipX();
        this.facing = 'left';
      }
      const nx = this.player.x - 8;
      const ny = this.player.y + 8;
      this.tweenMove(nx, ny, "x", "negative");
      this.moves -= 1; //! REPLACE THIS WITH CLASS METHOD
      this.steps += 1;
      this.movesText?.setText(`Moves: ${this.moves}`);
      this.stepsText?.setText(`Steps: ${this.steps}`) //! REPLACE THIS WITH CLASS METHOD
    } else if (justDown) {
      if (!this.player) return;
      const nx = this.player.x + 8;
      const ny = this.player.y + 24;
      this.tweenMove(nx, ny, "y", "positive");
      this.moves -= 1; //! REPLACE THIS WITH CLASS METHOD
      this.steps += 1;
      this.movesText?.setText(`Moves: ${this.moves}`)
      this.stepsText?.setText(`Steps: ${this.steps}`); //! REPLACE THIS WITH CLASS METHOD
    } else if (justUp) {
      if (!this.player) return;
      const nx = this.player.x + 8;
      const ny = this.player.y - 8;
      this.tweenMove(nx, ny, "y", "negative");
      this.moves -= 1; //! REPLACE THIS WITH CLASS METHOD
      this.steps += 1;
      this.movesText?.setText(`Moves: ${this.moves}`);
      this.stepsText?.setText(`Steps: ${this.steps}`) //! REPLACE THIS WITH CLASS METHOD
    }
  }

  private tweenMove(
    x: number,
    y: number,
    axis: string,
    direction: "positive" | "negative"
  ) {
    // check if already tweening, if so, then don't do anything.
    if (this.tweens.isTweening(this.player!)) return undefined;

    // if next move has wall escape early
    if (this.hasObstruction(x, y)) return undefined;

    const directionXY = {
      positive: '+=16',
      negative: '-=16',
    };

    // move box
    const box = this.getBoxAt(x, y);

    const baseTween = {
      [axis]: directionXY[direction],
      duration: 400,
      onStart: () => {
        this.player?.anims.play("move", true);
      },
      onComplete: () => {
        this.player?.anims.play("idle", true);
      },
      onCompleteScope: this,
    };

    if (box) {
      if (this.tweens.isTweening(box)) {
        return undefined;
      }
      if (!this.checkBoxMovement(box, axis, direction)) {
        return undefined;
      }
      this.tweens.add({
        ...baseTween,
        targets: box,
      });
    } else {
      // move player
      this.tweens.add({
        ...baseTween,
        targets: this.player,
      });
    }

    //check if square is spike
    const spike = this.getSpikeAt(x, y);

    if (spike) {
      return this.moves -= 1;
    }

    if (this.steps % 2 === 0) {
      for (let sprite of this.spikesAlternating1) {
        sprite.anims.play("extend");
      }
      for (let sprite of this.spikesAlternating2) {
        sprite.anims.play("retract");
      }
    }

    if (this.steps % 2 === 1) {
      for (let sprite of this.spikesAlternating1) {
        sprite.anims.play("retract");
      }
      for (let sprite of this.spikesAlternating2) {
        sprite.anims.play("extend");
      }
    }


    // check if square is alternating spike
    const spikeAlternating1 = this.getSpikeAlternating1(x,y);
    const spikeAlternating2 = this.getSpikeAlternating2(x,y);
    if (spikeAlternating1) {
      const canHurt1 = this.canSpikeAlternating1Hurt();
      if (canHurt1) {
        return this.moves -= 1;
      }
    }
    if (spikeAlternating2) {
      const canHurt2 = this.canSpikeAlternating2Hurt();
      if (canHurt2) {
        return this.moves -= 1;
      }
    }
  }

  // checks if box is being moved into an obstruction
  private checkBoxMovement(
    box: Phaser.GameObjects.Sprite,
    axis: string,
    direction: string
  ) {
    if (axis === 'x' && direction === 'negative') {
      if (
        this.hasObjectObstruction(box.getBounds().x - 8, box.getBounds().y + 8)
      ) {
        return false;
      }
    } else if (axis === 'x' && direction === 'positive') {
      if (
        this.hasObjectObstruction(box.getBounds().x + 24, box.getBounds().y + 8)
      ) {
        return false;
      }
    } else if (axis === 'y' && direction === 'negative') {
      if (
        this.hasObjectObstruction(box.getBounds().x + 8, box.getBounds().y - 8)
      ) {
        return false;
      }
    } else if (axis === 'y' && direction === 'positive') {
      if (
        this.hasObjectObstruction(box.getBounds().x + 8, box.getBounds().y + 24)
      ) {
        return false;
      }
    }
    return true;
  }

  private hasObstruction(x: number, y: number) {
    if (!this.layer) {
      return false;
    }

    const barrier = this.getBarrierAt(x, y);
    if (barrier) {
      return true;
    }

    const tile = this.layer.getTileAtWorldXY(x, y);
    if (!tile) return false;
    const obstructions = [0, 1, 5, 10, 15, 25, 40, 41, 42, 45, 49];
    return obstructions.indexOf(tile.index) !== -1;
  }

  private hasObjectObstruction(x: number, y: number) {
    if (this.hasObstruction(x, y) || this.getBoxAt(x, y)) {
      return true;
    }
  }

  private getBoxAt(x: number, y: number) {
    return this.boxes.find((box) => {
      const rect = box.getBounds();
      return rect.contains(x, y);
    });
  }

  private getBarrierAt(x: number, y: number) {
    return this.barriers.find(barrier => {
      const rect = barrier.getBounds();
      return rect.contains(x, y);
    });
  }

  private createPlayerAnimations() {
    this.anims.create({
      key: "move",
      frames: this.anims.generateFrameNumbers("character", {
        start: 40,
        end: 43,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "idle",
      frames: [{ key: "character", frame: 40 }],
      frameRate: 20,
    });
  }

  private getSpikeAt(x:number, y:number) {
    return this.spikes.find(spikes => {
      const rect = spikes.getBounds();
      return rect.contains(x, y);
    })
  }

  private getSpikeAlternating1(x:number, y:number) {
    return this.spikesAlternating1.find(spikesAlternating1 => {
      const rect = spikesAlternating1.getBounds();
      return rect.contains(x, y);
    })
  }

  private getSpikeAlternating2(x:number, y:number) {
    return this.spikesAlternating2.find(spikesAlternating2 => {
      const rect = spikesAlternating2.getBounds();
      return rect.contains(x, y);
    })
  }

  private canSpikeAlternating1Hurt() {
    if (this.steps % 2 === 0) {
      return true;
    } else return false;
  }

  private canSpikeAlternating2Hurt() {
    if (this.steps % 2 === 1) {
      return true;
    } else return false;
  }

  private createSpikeAnimations() {
    this.anims.create({
      key: 'extend',
      frames: this.anims.generateFrameNumbers("character", {
        start: 353,
        end: 356
      }),
      frameRate: 10
    })
    this.anims.create({
      key: 'retract',
      frames: this.anims.generateFrameNumbers("character", {
        start: 356,
        end: 353
      }),
      frameRate: 10
    })
  }
}
