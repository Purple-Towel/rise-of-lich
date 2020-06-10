import React from 'react';

function About() {
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
      <ul>
        <li>
          <a>
            <img src="/assets/logo.png"></img>
          </a>
        </li>
      </ul>
      <div>
        Icons made by{' '}
        <a
          href="https://www.flaticon.com/authors/pixel-perfect"
          title="Pixel perfect"
        >
          Pixel perfect
        </a>{' '}
        from{' '}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </div>
  );
}

export default About;
