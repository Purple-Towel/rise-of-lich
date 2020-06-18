import Phaser from 'phaser';

const addSoundEffects = (scene: Phaser.Scene) => {
  scene.sound.add('audio_box_drag', { volume: 0.4 });
  scene.sound.add('audio_wall_bump', { volume: 0.5 });
  scene.sound.add('audio_monster_death_1');
  scene.sound.add('audio_monster_death_2');
  scene.sound.add('punch');
  scene.sound.add('kick');
  scene.sound.add('game_over');
};
export default addSoundEffects;
