import React from 'react';
import styled from 'styled-components';

type PostInfo = {
    isPostModal: boolean;
    postTitle: string;
    postContent: string;
}



type Props = {
  postTitle: string;
  postContent: string;
  setPostInfo: (info: PostInfo) => void;
};
export default function PostModal({
  postTitle,
  postContent,
  setPostInfo
}: Props): JSX.Element {
  return (
    <Container>
        <InfoWrapper>
          <TitleText>제목: {postTitle}</TitleText>
          <ContentText>내용: {postContent}</ContentText>
          <ButtonWrapper>
            <CancelButton
              onClick={() =>
                setPostInfo({
                  isPostModal: false,
                  postTitle: '',
                  postContent: '',
                })
              }
            >
              닫기
            </CancelButton>
          </ButtonWrapper>
        </InfoWrapper>
    </Container>
  );
}
const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  border: 2px solid red;
  // align-items: center;
  justify-content: space-evenly;
`;
const CancelButton = styled.button`
  width: 200px;
  height: 45px;
  background-color: #c4c4c4;
  border-radius: 20px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 4px solid blue;
  align-items: center;
`;

const TitleText = styled.div`
  width: 550px;
  height: 35px;
  background-color: #c4c4c4;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
`;
const ContentText = styled.div`
  width: 550px;
  height: 250px;
  background-color: #c4c4c4;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const Container = styled.div`

  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  border: 5px solid black;
  width: 800px;
  height: 500px;
  border-radius: 66px;
  display: flex;
  align-items: center;
  background-color: white;
  flex-direction: column;

  justify-content: space-around;
  z-index: 1;
`;

