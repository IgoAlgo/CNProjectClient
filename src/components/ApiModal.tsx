import React from 'react';
import styled from 'styled-components';

type Props = {
  setIsApiModal: (para: boolean) => void;
};
export default function ApiModal({ setIsApiModal }: Props): JSX.Element {
  return (
    <Container>
      {/* <ContentWrapper> */}
      <Button onClick={() => setIsApiModal(false)}>X</Button>
      <ContentHeader>
        <Text>REST API 명세서</Text>
        {/* <Button>X</Button> */}
      </ContentHeader>
      <ContentBody />
      {/* </ContentWrapper> */}
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  // display: inline-block;
  border: 5px solid black;
  width: 800px;
  height: 500px;
  border-radius: 66px;
  display: flex;
  // align-items: center;
  background-color: white;
  flex-direction: column;

  display: flex;
  justify-content: space-around;
  // align-items: center;
  // display: none;
`;

const Button = styled.button`
  position: absolute;
  top: 25px;
  right: 25px;
  width: 50px;
  height: 50px;
  // float: right;
  // margin-right: 66px;
`;
// const ContentWrapper = styled.div`
// display: flex;
//   width: 550px;
//   height: 450px;
//   align-items: center;
//   background-color: white;
// `;
const ContentHeader = styled.div`
  font-size: 40px;
  font-weight: bold;
  background-color: red;
`;

const ContentBody = styled.div`
  background-color: #c4c4c4;
  width: 500px;
  height: 300px;
  margin-left: 66px;
`;

const Text = styled.span`
  margin-left: 66px;
`;