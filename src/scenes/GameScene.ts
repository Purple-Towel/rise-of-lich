// Main Game scene where player interacts with sprite

import Phaser from 'phaser';
import level1 from '../game_components/levels/level1';
import level2 from '../game_components/levels/level2';
import level3 from '../game_components/levels/level3';
import level4 from '../game_components/levels/level4';
import level5 from '../game_components/levels/level5';
import Level from '../interfaces/Level';
import BaseTween from '../interfaces/BaseTween';
import damageIndicator from '../helpers/damageIndicator';
import createAnimations from '../helpers/animations';
import Box from '../game_components/Box';
import Barrier from '../game_components/Barrier';
import Enemy, { DEMON, SKELETON, OGRE } from '../game_components/Enemy';
import Spike from '../game_components/spikes/Spike';
import AlternatingSpike from '../game_components/spikes/AlternatingSpike';
import Player from '../game_components/Player';

export default class Game extends Phaser.Scene {
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private player?: Phaser.GameObjects.Sprite;
  private skeleton?: Enemy;
  private ogre?: Enemy;
  private demon?: Enemy;
  private box?: Box;
  private spikes?: Spike;
  private spikesAlternating1?: AlternatingSpike;
  private spikesAlternating2?: AlternatingSpike;
  private barrier?: Barrier;
  private layer?: Phaser.Tilemaps.StaticTilemapLayer;
  private facing: 'right' | 'left' = 'right';
  private moves: number = 50;
  private isGameOver: boolean = false;
  private steps = 0;
  private movesText?: Phaser.GameObjects.Text;
  private stepsText?: Phaser.GameObjects.Text;
  private levels: Level[] = [level1, level2, level3, level4, level5];
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

    // construct the map from the tileset
    const tiles = map.addTilesetImage('tiles');
    this.layer = map.createStaticLayer(0, tiles, 0, 0);

    // construct barriers to movement from tiles
    this.barrier = new Barrier(this.layer);

    this.box = new Box(this.layer);

    this.spikes = new Spike(this.layer);

    this.spikesAlternating1 = new AlternatingSpike(false, this.layer);

    this.spikesAlternating2 = new AlternatingSpike(true, this.layer);

    this.player = new Player(this.layer).player;

    this.demon = new Enemy(DEMON, this.layer);
    this.skeleton = new Enemy(SKELETON, this.layer);
    this.ogre = new Enemy(OGRE, this.layer);

    // create mute text if state is muted
    this.muteMessage = this.add
      .text(11, 185, 'Mute', {
        fontSize: 10,
        fontFamily: 'Metal Mania',
        color: '#f00',
      })
      .setOrigin(0.5);

    // show mute text based on previous state
    if (this.mute) {
      this.muteMessage.setVisible(true);
    } else {
      this.muteMessage.setVisible(false);
    }

    // insert player and create necessary animations
    this.player?.setOrigin(0);

    createAnimations(this);

    // create stamina counter
    this.add.image(this.scale.width * 0.05, 16, 'hud-icon');
    this.movesText = this.add
      .text(this.scale.width * 0.05, 16, `${this.moves}`, {
        fontSize: '14px',
        fill: '#f00',
      })
      .setOrigin(0.5);
    this.movesText.setShadow(1, 1);

    //-- Audio --
    //! Declared a config object for tweaking. Most of these are defaults
    this.bgMusic = this.sound.add('bg_music', {
      mute: false,
      volume: 0.5,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    });
    this.bgMusic.play();
    this.sound.add('audio_box_drag', { volume: 0.4 });
    this.sound.add('audio_wall_bump', { volume: 0.5 });
    this.sound.add('audio_monster_death_1');
    this.sound.add('audio_monster_death_2');
    this.sound.add('punch');
    this.sound.add('kick');

    // bind keys to special functions
    this.input.keyboard.once('keydown-R', this.resetLevel, this);
    this.input.keyboard.on('keydown-M', this.toggleMute, this);
  }

  update() {
    if (!this.cursors) {
      return;
    }

    if (this.skeleton) {
      for (let skeleton of this.skeleton.enemies!) {
        // avoids trying to play animation for killed enemies
        if (skeleton) skeleton.anims.play('skeleton_idle', true);
      }
    }
    if (this.ogre) {
      for (let ogre of this.ogre.enemies!) {
        if (ogre) ogre.anims.play('ogre_idle', true);
      }
    }
    if (this.demon) {
      for (let demon of this.demon.enemies!) {
        if (!demon) {
          return;
        } else demon.anims.play('demon_idle', true);
      }
    }

    if (this.isGameOver === true) {
      this.gameOver();
    }

    // game accepts one keypress only. Cannot spam movements with multiple presses.
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
      !this.box?.getBoxAt(x, y);

    if (levelFinished) {
      this.transition();
    }

    const directionXY = {
      positive: '+=16',
      negative: '-=16',
    };

    const box = this.box?.getBoxAt(x, y);
    // const enemy = this.getEnemyAt(x, y);
    const enemy =
      this.skeleton?.getEnemyAt(x, y) ||
      this.ogre?.getEnemyAt(x, y) ||
      this.demon?.getEnemyAt(x, y);

    const baseTween: BaseTween = {
      [axis]: directionXY[direction],
      duration: 400,
      onStart: () => {
        this.player?.anims.play('move', true);
        this.decrementMoves();
        this.steps += 1;
        this.movesText?.setText(`${this.moves}`);
        if (this.moves <= 0) {
          this.bgMusic.pause();
          this.isGameOver = true;
        }
      },
      onComplete: () => {
        this.player?.anims.play('idle', true);
      },
    };

    if (box) {
      this.moveBox(box, axis, direction, baseTween);
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
          onCompleteScope: this,
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
        onCompleteScope: this,
      });
    }

    //check if square is spike
    const spike = this.spikes?.getSpikeAt(x, y);

    if (spike) {
      if (this.player) {
        damageIndicator(this.player, this.sound.add('damage'));
      }
      return this.decrementMoves();
    }

    const { extended1, extended2 } = this.playSpikeAnim();

    this.checkAlternating(x, y, extended1, extended2);
  }

  private moveBox(
    box: Phaser.GameObjects.Sprite,
    axis: string,
    direction: 'positive' | 'negative',
    baseTween: BaseTween
  ) {
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
      onCompleteScope: this,
    });
  }

  private playSpikeAnim() {
    let extended1 = true;
    let extended2 = false;
    if (this.steps % 2 === 0) {
      extended1 = true;
      extended2 = false;
      if (this.spikesAlternating1) {
        for (let sprite of this.spikesAlternating1.spikes) {
          sprite.anims.play('extend');
        }
      }
      if (this.spikesAlternating2) {
        for (let sprite of this.spikesAlternating2.spikes) {
          sprite.anims.play('retract');
        }
      }
    }

    if (this.steps % 2 !== 0) {
      extended1 = false;
      extended2 = true;
      if (this.spikesAlternating1) {
        for (let sprite of this.spikesAlternating1.spikes) {
          sprite.anims.play('retract');
        }
      }
      if (this.spikesAlternating2) {
        for (let sprite of this.spikesAlternating2.spikes) {
          sprite.anims.play('extend');
        }
      }
    }
    return { extended1, extended2 };
  }

  private checkAlternating(
    x: number,
    y: number,
    extended1: boolean,
    extended2: boolean
  ) {
    const Alternating1 = this.spikesAlternating1?.getSpikeAlternating(x, y);
    const Alternating2 = this.spikesAlternating2?.getSpikeAlternating(x, y);
    if (Alternating1) {
      if (extended1) {
        damageIndicator(this.player!, this.sound.add('damage'));
        this.decrementMoves();
      }
    }
    if (Alternating2) {
      if (extended2) {
        damageIndicator(this.player!, this.sound.add('damage'));
        this.decrementMoves();
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

    const barrier = this.barrier?.getBarrierAt(x, y);
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
      this.box?.getBoxAt(x, y) ||
      // this.getEnemyAt(x, y)
      this.skeleton?.getEnemyAt(x, y) ||
      this.ogre?.getEnemyAt(x, y) ||
      this.demon?.getEnemyAt(x, y)
    ) {
      return true;
    }
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

  // decrement by 1 if no argument passed
  private decrementMoves(n: number = 1) {
    if (this.moves > 0) {
      this.moves -= n;
    }
  }

  // resets level to original configuration
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

  // turn mute on and off
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

  // transisition to gameover scene
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

  // transition to level complete or game complete
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
