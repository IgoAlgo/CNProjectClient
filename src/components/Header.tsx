import React from 'react';
import styled from 'styled-components';
import home from 'assets/images/home.png';
import { Link } from 'react-router-dom';

export default function Header(): JSX.Element {
  return <Container>
      <Link to="/"> 
      <HomeWrapper>
        <Logo src={home} />
        <Text>HOME</Text>
      </HomeWrapper>
      </Link>
    </Container>;
}

const Container = styled.div`
  display: flex;
  border: 2px solid black;
  width: 100%;
  height: 130px;
  align-items: center;
  margin-left: 0px;
`;
const HomeWrapper = styled.div`
  display: flex;
  border: 2px solid black;
  width: 238px;
  height: 100px;
  background-color: #bddfff;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-left: 20px;
`;
const Logo = styled.img`
  width: 100px;
  height: 90px;
  border: 2px solid black;
`;

const Text = styled.span`
  font-size: 36px;
  border: 2px solid black;
  margin-right: auto;
`;