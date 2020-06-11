import React from 'react';
import styled from 'styled-components';

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
  width: 30px;
`;

const Tutorial = () => {
  return (
    <Container>
      <Subtitle>Tutorial</Subtitle>
      <ImageContainer className="grid2x3">
        <Image src="assets/empty.png" alt="empty" />
        <Image src="assets/up_arr.png" alt="up-arrow" />
        <Image src="assets/empty.png" alt="empty" />
        <Image src="assets/left_arr.png" alt="left-arrow" />
        <Image src="assets/down_arr.png" alt="down-arrow" />
        <Image src="assets/right_arr.png" alt="right-arrow" />
      </ImageContainer>
      <Paragraph>
        Movement: You may press any of the above indicated keys to move the
        character in the corresponding direction. Moving takes Stamina, and once
        you reach 0 Stamina it will be game over.
      </Paragraph>
    </Container>
  );
};

export default Tutorial;
