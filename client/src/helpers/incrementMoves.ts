import Phaser from "phaser";

// const incrementMoves = (moves: number) => `Moves Left: ${moves}`;

export default class incrementMoves extends Phaser.GameObjects.Text {
  private moves: number;

  constructor(scene: object, x: number, y: number, style: object) {
    super(scene, x, y, style);
    this.moves = moves;
  }

  incrementMoves(): void {
    this.moves -= 1;
    this.setText(incrementMoves(this.moves));
  }
}
