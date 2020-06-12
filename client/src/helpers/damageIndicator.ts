import Phaser from 'phaser';

const damageIndicator = (player: Phaser.GameObjects.Sprite) => {
  const i = setInterval(() => {
    if (player.isTinted) {
      player.clearTint();
    } else {
      player.setTint(0xff0000);
    }
  }, 100);
  setTimeout(() => {
    clearInterval(i);
    player.clearTint();
  }, 600);
};

export default damageIndicator;
