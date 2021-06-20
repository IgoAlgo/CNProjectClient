import React from 'react';
import styled, {css } from 'styled-components';

type Props = {
    currentPage: number;
  postsPerPage: number;
  totalPosts: number;
  setCurrentPage: (currentPage: number) => void;
};
export default function Pagination({
  currentPage, postsPerPage,
  totalPosts,
  setCurrentPage,
}: Props): JSX.Element {
  const pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i += 1) {
    pageNumbers.push(i);
  }
  return (
    <Container>
      <NavWrapper>
        <PageUl>
          {pageNumbers.map((number) => (
            <PageLi key={number}>
              <PageSpan onClick={() => setCurrentPage(number)}>
                {number}
              </PageSpan>
            </PageLi>
          ))}
        </PageUl>
      </NavWrapper>
    </Container>
  );
};

const Container = styled.div`
  border: 2px solid black;
  width: 100%;
  position: absolute;
  bottom: 10px;
//   text-align: center;
//    align-items: center;
`;
const NavWrapper = styled.nav`
 
`;

const PageUl = styled.ul`

//   float:left;
  list-style: none;
  text-align:center;
  border-radius:3px;
  color:white;
  padding:1px;
  border-top:3px solid #186EAD;
  border-bottom:3px solid #186EAD;
  background-color: rgba( 0, 0, 0, 0.4 );
`;

const PageLi = styled.li`
  display: inline-block;
  font-size: 17px;
  font-weight: 600;
  padding: 5px;
  border-radius: 5px;
  width: 25px;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #263a6c;
  }
  &:focus::after {
    color: white;
    background-color: #263a6c;
  }

`;

const PageSpan = styled.span`
  &:hover::after,
  &:focus::after{
    border-radius:100%;
    color:white;
    background-color:#263A6C;
  }
  
`;

