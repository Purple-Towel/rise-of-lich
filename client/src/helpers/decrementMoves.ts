import Phaser from "phaser";

// const decrementMoves = (moves: number) => `Moves Left: ${moves}`;

export default class decrementMoves extends Phaser.GameObjects.Text {
  private movesText: string;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    movesText: string,
    style: Phaser.Types.GameObjects.Text.TextStyle
  ) {
    super(scene, x, y, movesText, style);
    this.movesText = movesText;
  }

  // decrementMoves(numOfMoves): void {
  //   this.moves -= numOfMoves;
  //   this.setText(decrementMoves(this.moves));
  // }
}
