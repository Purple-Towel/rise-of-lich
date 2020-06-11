import React, { Component } from 'react';
import styled from 'styled-components';
import Divider from '@material-ui/core/Divider';

const Title = styled.h1`
  font-family: 'Metal Mania', cursive;
  font-size: 5em;
  margin-top: 0px;
  margin-bottom: 50px;
  text-align: center;
`;

const Canvas = styled.div`
  margin: auto;
  max-width: 800px;
  display: flex;
  justify-content: center;
`;

class Game extends Component {
  render() {
    return (
      <div>
        <Title>Rise of Lich: Revengeance</Title>
        <Canvas id="game" />
      </div>
    );
  }
}

export default Game;
