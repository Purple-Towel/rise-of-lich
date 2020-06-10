import React from 'react';

const About = () => {
  const paragraph = `
  Welcome to Rise of Lich: Revengeance! We are Angad, Diogo, and Rance and we built this
  game as a final project for the Canadian coding bootcamp known as Lighthouse Labs. Rise of Lich
  was created using Phaser 3 to drive the game logic with React components outside of the game.
  This game is a week long effort by the three of us to show how much we have learned over the course
  of our 12 week bootcamp. We hope you enjoy it!
  `;
  return (
    <div>
      <h1>About</h1>
      <p>{paragraph}</p>
    </div>
  );
};

export default About;
