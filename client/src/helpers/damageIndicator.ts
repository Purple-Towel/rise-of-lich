import Phaser from 'phaser';

const damageIndicator = (
  player: Phaser.GameObjects.Sprite,
  sound?: Phaser.Sound.BaseSound
) => {
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

  if (sound) {
    setTimeout(sound.play(), 20);
  }
};

export default damageIndicator;
