import React from 'react';
import Footer from './Footer';
import styled from 'styled-components';

const Container = styled.article`
  max-width: 800px;
  margin: auto;
  font-family: 'Metal Mania', cursive;
  font-size: 2em;
`;

const Subtitle = styled.h1`
  margin: 0;
  text-align: center;
`;

const About = () => {
  const paragraph = `
  Welcome to Rise of Lich: Revengeance! We are Angad, Diogo, and Rance and we built this
  game as a final project for the Canadian coding bootcamp known as Lighthouse Labs. Rise of Lich
  was created using Phaser 3, TypeScript and React. This game is a week long effort by the three of
  us to show how much we have learned over the course of our 12 week bootcamp. We hope you enjoy it!
  `;
  return (
    <Container>
      <Subtitle>About</Subtitle>
      <p>{paragraph}</p>
      <Footer />
    </Container>
  );
};

export default About;
