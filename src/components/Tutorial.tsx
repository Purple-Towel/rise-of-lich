import React from 'react';
import styled from 'styled-components';
import { useSelectHook } from './hooks/useSelectHook';

const ImageContainer = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(3, [col-start] 1fr);
  grid-gap: 0px;
  margin: auto;
`;

const Container = styled.section`
  max-width: 800px;
  text-align: center;
  margin: auto;
  font-family: 'Metal Mania', cursive;
  font-size: 2em;
`;

const Subtitle = styled.h1`
  margin: 0;
`;

const Paragraph = styled.p`
  text-align: left;
`;

const Image = styled.img`
  width: 50px;
`;

const Button = styled.button`
  font-size: 28px;
  font-family: 'Metal Mania', cursive;
  background-color: transparent;
  border: 8px inset gold;
  border-radius: 9px;
  :hover {
    background-color: rgb(224, 171, 24);
  }
`;

const Tutorial = () => {
  const MOVE = 'Movement';
  const RESET = 'Reset';
  const MUTE = 'Mute';
  const STAMINA = 'Stamina';
  const CRATES = 'Crates';
  const LADDERS = 'Ladders';
  const SPIKES = 'Spikes';

  const selections = [MOVE, RESET, MUTE, CRATES, LADDERS, STAMINA, SPIKES];

  const Buttons = selections.map((selection, index) => {
    return (
      <Button key={index} onClick={() => selectStateIndex(index)}>
        {selection}
      </Button>
    );
  });

  const { selected, selectStateIndex } = useSelectHook(selections);

  return (
    <Container>
      <Subtitle>Tutorial</Subtitle>
      {Buttons}
      <p>{selected}</p>
      {selected === selections[0] && (
        <ImageContainer className="grid2x3">
          <Image src="assets/empty.png" alt="empty" />
          <Image src="assets/up_arr.png" alt="up-arrow" />
          <Image src="assets/empty.png" alt="empty" />
          <Image src="assets/left_arr.png" alt="left-arrow" />
          <Image src="assets/down_arr.png" alt="down-arrow" />
          <Image src="assets/right_arr.png" alt="right-arrow" />
        </ImageContainer>
      )}
      {selected === selections[0] && (
        <Paragraph>
          Pictured above are Arbyn's Wondrous Runes of Movement. Press the
          indicated runes to cast a spell that moves your character in that
          direction. (Okay, it's just pressing the arrow keys to move in that
          direction) Movement takes Stamina.
        </Paragraph>
      )}
      {selected === selections[1] && (
        <Image src="assets/r_button.png" alt="r-button" />
      )}
      {selected === selections[1] && (
        <Paragraph>
          Rora's Rune of Resetting works by returning you and all nearby objects
          back to a moment in time determined arbitrarily. Simply touch the Rune
          indicated and you and everything else will return to a previous
          temporal state. (Yeah, this one is just a level reset button. Press
          R.)
        </Paragraph>
      )}
      {selected === selections[2] && (
        <Image src="assets/m_button.png" alt="m-button" />
      )}
      {selected === selections[2] && (
        <Paragraph>
          Mallory's Mute, a useful rune that can turn off all annoying sounds. Useful if you want to concentrate or just find the noise overwhelming. (Toggles mute on/off)
        </Paragraph>
      )}
      {selected === selections[3] && (
        <Image src="assets/box.png" alt="crates" />
      )}
      {selected === selections[3] && (
        <Paragraph>
          The Lich has left a lot of crates lying around cluttering up the
          place. They're heavy and hard to open, but you can shove them around
          if they are blocking the way, at the cost of some Stamina.
        </Paragraph>
      )}
      {selected === selections[4] && (
        <Image src="assets/ladder.png" alt="ladder" />
      )}
      {selected === selections[4] && (
        <Paragraph>
          Why does the Lich have these lying around? He can fly and teleport!
          Luckily these all lead to the exit and one step closer to your
          freedom.
        </Paragraph>
      )}
      {selected === selections[5] && (
        <Image src="assets/hud-icon.png" alt="stamina-icon" />
      )}
      {selected === selections[5] && (
        <Paragraph>
          This cursed orb displays how much Stamina you have. Most actions you
          take will cost Stamina and running out will activate the Lich's curse
          and cause a game over.
        </Paragraph>
      )}
      {selected === selections[6] && (
        <Image src="assets/spikes.png" alt="spikes" />
      )}
      {selected === selections[6] && (
        <Paragraph>
          These spike traps are somewhat common through the Lich's dungeon.
          Stepping on them takes twice as much Stamina as usual, so try not to
          dance on them, as fun as it may seem.
        </Paragraph>
      )}
    </Container>
  );
};

export default Tutorial;
