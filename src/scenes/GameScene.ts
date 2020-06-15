import Phaser from 'phaser';
import level1 from '../game_components/levels/level1';
import level2 from '../game_components/levels/level2';
import level3 from '../game_components/levels/level3';
import level4 from '../game_components/levels/level4';
import level5 from '../game_components/levels/level5';
import damageIndicator from '../helpers/damageIndicator';

export default class Game extends Phaser.Scene {
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private player?: Phaser.GameObjects.Sprite;
  private enemy_skeleton?: Phaser.GameObjects.Sprite[];
  private enemy_ogre?: Phaser.GameObjects.Sprite[];
  private enemy_demon?: Phaser.GameObjects.Sprite[];
  private enemies?: Phaser.GameObjects.Sprite[];
  private boxes: Phaser.GameObjects.Sprite[] = [];
  private spikes: Phaser.GameObjects.Sprite[] = [];
  private spikesAlternating1: Phaser.GameObjects.Sprite[] = [];
  private spikesAlternating2: Phaser.GameObjects.Sprite[] = [];
  private barriers: Phaser.GameObjects.Sprite[] = [];
  private layer?: Phaser.Tilemaps.StaticTilemapLayer;
  private facing: 'right' | 'left' = 'right';
  private moves: number = 50;
  private isGameOver: boolean = false;
  private steps = 0;
  private movesText?: Phaser.GameObjects.Text;
  private stepsText?: Phaser.GameObjects.Text;
  private levels = [level1, level2, level3, level4, level5];
  private currentLevel: number = 1;
  private bgMusic!: Phaser.Sound.BaseSound;
  private mute: boolean = false;
  private muteMessage?: Phaser.GameObjects.Text;

  constructor() {
    super('game');
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create(d: { currentLevel: number; steps: number; muted: boolean }) {
    const { currentLevel, steps } = d;
    this.currentLevel = currentLevel;
    this.steps = steps;
    this.facing = 'right';
    const map = this.make.tilemap({
      data: this.levels[this.currentLevel - 1].map,
      tileWidth: 16,
      tileHeight: 16,
    });

    this.moves = this.levels[this.currentLevel - 1].moves;

    const tiles = map.addTilesetImage('tiles');
    this.layer = map.createStaticLayer(0, tiles, 0, 0);

    this.barriers = this.layer
      .createFromTiles(49, 11, { key: 'tiles', frame: 49 })
      .map(barrier => barrier.setOrigin(0));

    this.spikes = this.layer
      .createFromTiles(777, 11, { key: 'character', frame: 356 })
      .map(spike => spike.setOrigin(0));

    this.spikesAlternating1 = this.layer
      .createFromTiles(778, 11, { key: 'character', frame: 353 })
      .map(spikeAlternating1 => spikeAlternating1.setOrigin(0));

    this.spikesAlternating2 = this.layer
      .createFromTiles(779, 11, { key: 'character', frame: 356 })
      .map(spikeAlternating1 => spikeAlternating1.setOrigin(0));

    this.boxes = this.layer
      .createFromTiles(83, 11, { key: 'tiles', frame: 83 })
      .map(box => box.setOrigin(0));

    this.player = this.layer
      .createFromTiles(400, 11, { key: 'character', frame: 40 })
      .pop();

    this.enemy_skeleton = this.layer
      .createFromTiles(223, 11, {
        key: 'character',
      })
      .map(e => e.setOrigin(0));

    this.enemy_ogre = this.layer
      .createFromTiles(224, 11, {
        key: 'character',
      })
      .map(e => e.setOrigin(0));

    this.enemy_demon = this.layer
      .createFromTiles(222, 11, {
        key: 'character',
        frame: 119,
      })
      .map(e => e.setOrigin(0));

    if (this.enemy_skeleton && this.enemy_ogre && this.enemy_demon) {
      this.enemies = [
        ...this.enemy_skeleton,
        ...this.enemy_ogre,
        ...this.enemy_demon,
      ];
    }

    this.muteMessage = this.add
      .text(11, 185, 'Mute', {
        fontSize: 10,
        fontFamily: 'Metal Mania',
        color: '#f00',
      })
      .setOrigin(0.5);

    if (this.mute) {
      this.muteMessage.setVisible(true);
    } else {
      this.muteMessage.setVisible(false);
    }

    this.player?.setOrigin(0);
    this.createPlayerAnimations();
    this.createSpikeAnimations();
    this.createEnemyAnimations('skeleton');
    this.createEnemyAnimations('ogre');
    this.createEnemyAnimations('demon');

    this.add.image(this.scale.width * 0.05, 16, 'hud-icon');
    this.movesText = this.add
      .text(this.scale.width * 0.05, 16, `${this.moves}`, {
        fontSize: '14px',
        fill: '#f00',
      })
      .setOrigin(0.5);
    this.movesText.setShadow(1, 1);
    this.stepsText = this.add.text(16, 150, `Steps: ${this.steps}`);

    //-- Audio --
    //! Declared a config object for tweaking. Most of these are defaults
    const musicConfig = {
      mute: false,
      volume: 0.5,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    };
    this.bgMusic = this.sound.add('bg_music', musicConfig);
    this.bgMusic.play();
    this.sound.add('audio_box_drag', { volume: 0.4 });
    this.sound.add('audio_wall_bump', { volume: 0.5 });
    this.sound.add('audio_monster_death_1');
    this.sound.add('audio_monster_death_2');
    this.sound.add('punch');
    this.sound.add('kick');

    this.input.keyboard.once('keydown-R', this.resetLevel, this);

    this.input.keyboard.on('keydown-M', this.toggleMute, this);
  }

  update() {
    if (!this.cursors) {
      return;
    }

    if (this.enemy_skeleton) {
      for (let skeleton of this.enemy_skeleton!) {
        // avoids trying to play animation for killed enemies
        if (skeleton) skeleton.anims.play('skeleton_idle', true);
      }
    }
    if (this.enemy_ogre) {
      for (let ogre of this.enemy_ogre!) {
        if (ogre) ogre.anims.play('ogre_idle', true);
      }
    }
    if (this.enemy_demon) {
      for (let demon of this.enemy_demon!) {
        if (!demon) {
          return;
        } else demon.anims.play('demon_idle', true);
      }
    }

    if (this.isGameOver === true) {
      this.gameOver();
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
      this.tweenMove(nx, ny, 'x', 'positive');
    } else if (justLeft) {
      if (!this.player) return;
      if (this.facing === 'right') {
        this.player.toggleFlipX();
        this.facing = 'left';
      }
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
    if (this.hasObstruction(x, y)) {
      this.sound.play('audio_wall_bump');
      return undefined;
    }

    // if you reach the finishing tile, start the next scene
    const levelFinished =
      this.getTileAt(x, y, 39) &&
      this.moves >= 2 &&
      !this.isGameOver &&
      !this.getBoxAt(x, y);

    if (levelFinished) {
      this.transition();
    }

    const directionXY = {
      positive: '+=16',
      negative: '-=16',
    };

    const box = this.getBoxAt(x, y);
    const enemy = this.getEnemyAt(x, y);

    const baseTween = {
      [axis]: directionXY[direction],
      duration: 400,
      onStart: () => {
        this.player?.anims.play('move', true);
        this.decrementMoves();
        this.steps += 1;
        this.movesText?.setText(`${this.moves}`);
        this.stepsText?.setText(`Steps: ${this.steps}`);
        if (this.moves <= 0) {
          this.bgMusic.pause();
          this.isGameOver = true;
        }
      },
      onComplete: () => {
        this.player?.anims.play('idle', true);
      },
      onCompleteScope: this,
    };

    if (box) {
      // move box
      if (this.tweens.isTweening(box)) {
        return undefined;
      }
      if (!this.checkBoxMovement(box, axis, direction)) {
        return undefined;
      }
      this.sound.play('audio_box_drag');

      this.tweens.add({
        ...baseTween,
        targets: box,
      });
    } else if (enemy) {
      // move enemy
      if (this.tweens.isTweening(enemy)) {
        return undefined;
      }
      // if player moves against blocked enemy, enemy gets killed
      if (!this.checkBoxMovement(enemy, axis, direction)) {
        enemy.anims.pause();
        enemy.setTint(0xff0000);
        if (Math.floor(Math.random() * 10 + 1) % 2) {
          this.sound.play('punch');
          this.sound.play('audio_monster_death_1');
        } else {
          this.sound.play('kick');
          this.sound.play('audio_monster_death_2');
        }

        // nX and nY were necessary to center animation on tile
        let nX = x + 4;
        let nY = y + 4;
        this.tweens.add({
          ...baseTween,
          targets: enemy,
          x: nX,
          y: nY,
          scale: 0,
          rotation: 90,
        });
        return undefined;
      }
      this.tweens.add({
        ...baseTween,
        targets: enemy,
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
      if (this.player) {
        damageIndicator(this.player, this.sound.add('damage'));
      }
      return this.decrementMoves();
    }

    if (this.steps % 2 === 0) {
      for (let sprite of this.spikesAlternating1) {
        sprite.anims.play('extend');
      }
      for (let sprite of this.spikesAlternating2) {
        sprite.anims.play('retract');
      }
    }

    if (this.steps % 2 === 1) {
      for (let sprite of this.spikesAlternating1) {
        sprite.anims.play('retract');
      }
      for (let sprite of this.spikesAlternating2) {
        sprite.anims.play('extend');
      }
    }

    // check if square is alternating spike
    const spikeAlternating1 = this.getSpikeAlternating1(x, y);
    const spikeAlternating2 = this.getSpikeAlternating2(x, y);
    if (spikeAlternating1) {
      const canHurt1 = this.canSpikeAlternating1Hurt();
      if (canHurt1) {
        damageIndicator(this.player!, this.sound.add('damage'));
        return this.decrementMoves();
      }
    }
    if (spikeAlternating2) {
      const canHurt2 = this.canSpikeAlternating2Hurt();
      if (canHurt2) {
        damageIndicator(this.player!, this.sound.add('damage'));
        return this.decrementMoves();
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

  // returns whether or not any sprite is moving into an obstruction
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

  // returns whether or not a moveable object has an obstruction based
  // on the x and y coords the sprite is pushing it
  private hasObjectObstruction(x: number, y: number) {
    if (
      this.hasObstruction(x, y) ||
      this.getBoxAt(x, y) ||
      this.getEnemyAt(x, y)
    ) {
      return true;
    }
  }

  // returns moveable box based on x & y coords
  private getBoxAt(x: number, y: number) {
    return this.boxes.find(box => {
      const rect = box.getBounds();
      return rect.contains(x, y);
    });
  }
  private getEnemyAt(x: number, y: number) {
    return this.enemies?.find(enemy => {
      const rect = enemy.getBounds();
      return rect.contains(x, y);
    });
  }

  // returns a barrier of movement based on x & y coords
  private getBarrierAt(x: number, y: number) {
    return this.barriers.find(barrier => {
      const rect = barrier.getBounds();
      return rect.contains(x, y);
    });
  }

  // gets any tile you specify based on the index it is in the tilesheet
  private getTileAt(x: number, y: number, index: number) {
    if (!this.layer) return undefined;

    const tile = this.layer.getTileAtWorldXY(x, y);
    if (!tile) return false;
    if (tile.index === index) {
      return tile;
    }
  }

  private createPlayerAnimations() {
    this.anims.create({
      key: 'move',
      frames: this.anims.generateFrameNumbers('character', {
        start: 45,
        end: 46,
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

  private getSpikeAt(x: number, y: number) {
    return this.spikes.find(spikes => {
      const rect = spikes.getBounds();
      return rect.contains(x, y);
    });
  }

  private getSpikeAlternating1(x: number, y: number) {
    return this.spikesAlternating1.find(spikesAlternating1 => {
      const rect = spikesAlternating1.getBounds();
      return rect.contains(x, y);
    });
  }

  private getSpikeAlternating2(x: number, y: number) {
    return this.spikesAlternating2.find(spikesAlternating2 => {
      const rect = spikesAlternating2.getBounds();
      return rect.contains(x, y);
    });
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
      frames: this.anims.generateFrameNumbers('character', {
        start: 353,
        end: 356,
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: 'retract',
      frames: this.anims.generateFrameNumbers('character', {
        start: 356,
        end: 353,
      }),
      frameRate: 10,
    });
  }

  private createEnemyAnimations(enemyType: string) {
    if (enemyType === 'skeleton') {
      this.anims.create({
        key: 'skeleton_idle',
        frames: this.anims.generateFrameNumbers('character', {
          start: 183,
          end: 190,
        }),
        frameRate: 5,
        repeat: -1,
      });
    }
    if (enemyType === 'ogre') {
      this.anims.create({
        key: 'ogre_idle',
        frames: this.anims.generateFrameNumbers('character', {
          start: 375,
          end: 382,
        }),
        frameRate: 5,
        repeat: -1,
      });
    }
    if (enemyType === 'demon') {
      this.anims.create({
        key: 'demon_idle',
        frames: this.anims.generateFrameNumbers('character', {
          start: 119,
          end: 126,
        }),
        frameRate: 5,
        repeat: -1,
      });
    }
  }

  // decrement by 1 if no argument passed
  private decrementMoves(n: number = 1) {
    if (this.moves > 0) {
      this.moves -= n;
    }
  }

  private resetLevel() {
    this.add
      .text(this.scale.width * 0.5, this.scale.height * 0.21, 'Restarting...', {
        fontSize: 16,
        fontFamily: 'Metal Mania',
        color: '#f00',
      })
      .setOrigin(0.5);
    this.input.keyboard.enabled = false;
    setTimeout(() => {
      this.input.keyboard.enabled = true;
      this.scene.start('game', {
        currentLevel: this.currentLevel,
        steps: 0,
        muted: this.mute,
      });
    }, 1000);
  }

  private toggleMute() {
    if (!this.mute) {
      this.sound.mute = true;
      this.mute = true;
      this.muteMessage?.setVisible(true);
    } else {
      this.sound.mute = false;
      this.mute = false;
      this.muteMessage?.setVisible(false);
    }
  }

  private gameOver() {
    this.player?.setTint(0xff0000);
    this.sound.add('game_over').play();
    this.input.keyboard.enabled = false;
    this.isGameOver = false;
    setTimeout(() => {
      this.input.keyboard.enabled = true;
      this.scene.start('gameOver', {
        currentLevel: this.currentLevel,
        steps: 0,
        muted: this.mute,
      });
    }, 1100);
  }

  private transition() {
    this.currentLevel++;
    setTimeout(() => {
      if (this.currentLevel > this.levels.length) {
        this.scene.start('victory');
      } else {
        this.sound.add('win').play();
        this.scene.start('transition', {
          currentLevel: this.currentLevel,
          stepsTaken: this.steps,
          muted: this.mute,
        });
      }
    }, 700);
  }
}
