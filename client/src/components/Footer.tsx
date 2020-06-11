import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import styled from 'styled-components';

const GitHubList = styled.footer`
  display: flex;
  justify-content: space-around;
`;
const Link = styled.a`
  color: #000;
  text-decoration: none;

  &:hover {
    color: #f00;
  }
`;

const Footer = () => {
  return (
    <GitHubList>
      <Link href="https://github.com/Purple-Towel">
        <GitHubIcon /> Angad Grewel
      </Link>
      <Link href="https://github.com/DPintoLL">
        <GitHubIcon /> Diogo Pinto
      </Link>
      <Link href="https://github.com/rancewcampbell">
        <GitHubIcon /> Rance Campbell
      </Link>
    </GitHubList>
  );
};

export default Footer;
