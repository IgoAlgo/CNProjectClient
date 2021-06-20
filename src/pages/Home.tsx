import React, { useState } from 'react';
import styled from 'styled-components';
import github from 'assets/images/github.png';
import mail from 'assets/images/mail.png';
import profilephoto from 'assets/images/profilephoto.png';
import Header from 'components/Header';
import ApiModal from 'components/ApiModal';

export default function Home(): JSX.Element {

  const [isApiModal, setIsApiModal] = useState(false);

  return (
    <Container>
      <Header />

      <Body>
        <ContentWrapper>
          <ToggleWrapper>
            <Toggle>
              <Arrow>▶</Arrow> 웹 사이트 소개
            </Toggle>
            <Block>
              <TextContent>
                Computer Networking PROJECT in GIST college REST API를 활용하여
                실제로 네트워크상에서의 Client와 Server 간의 소통시 주고 받은
                JSON 형태의 request/response 메세지를 실시간으로 확인할 수 있는
                웹 사이트 입니다. 게시판에서 글을 읽고, 작성하고, 수정하고,
                삭제해보며 실시간으로 request/response 메세지를 확인해보세요.
              </TextContent>
              <TextLinkWrapper>
                <TextLink onClick={() => setIsApiModal(true)}>
                  REST API 명세서
                </TextLink>
                <TextLink>게시판 바로 가기</TextLink>
              </TextLinkWrapper>
            </Block>
          </ToggleWrapper>
          <ToggleWrapper>
            <Toggle>
              <Arrow>▶</Arrow> 참여자
            </Toggle>
            <Block>
              <ProfileWrapper>
                <Profile>
                  <ProfilePhoto src={profilephoto} />
                  <ProfileInfo>
                    전애지 <InfoLogo src={github} /> <InfoLogo src={mail} />
                  </ProfileInfo>
                </Profile>
                <Profile>
                  <ProfilePhoto src={profilephoto} />
                  <ProfileInfo>
                    김진영 <InfoLogo src={github} /> <InfoLogo src={mail} />
                  </ProfileInfo>
                </Profile>
              </ProfileWrapper>
            </Block>
          </ToggleWrapper>
        </ContentWrapper>
      </Body>
      {isApiModal && <ApiModal setIsApiModal={setIsApiModal}/>}
    </Container>
  );
    
}

const TextContent = styled.div`
// display: flex;
border: 1px solid white;
`;

const ProfileWrapper = styled.div`
  border: 3px solid red;
  display: flex;
  // justify-content: center;
  align-items: center;
  justify-content: space-around;
  width: 400px;
  height:300px;
`;
const Profile = styled.div`
  border: 3px solid red;
  display: flex;
  flex-direction: column;
  // margin: 20px;
`;
const ProfilePhoto = styled.img`
  border: 3px solid red;
  width: 150px;
  height: 200px;
`;
const ProfileInfo = styled.div`
  display: flex;
  border: 3px solid orange;
  width: 150px;
  height: 50px;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
`;
const TextLinkWrapper = styled.div`
  // display: inline-block;

  border: 2px solid black;
  // flex-direction: column;
  // align-items: center;
  // margin-bottom: auto;
`;
const TextLink = styled.div`

  border: 2px solid red;
  background-color: #f8e85f;
  cursor: pointer;
  width: 200px;
`;
const ToggleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid green;
`;
const Block = styled.div`
  display: flex;
  width: 696px;
  height: 437px;
  border: 2px solid black;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ContentWrapper = styled.div`
  display: flex;
  width: 1500px;
  height: 700px;
  border: 3px solid purple;
  background-color: yellow;
  // text-align: center;
  justify-content: center;
  align-items: center;
`;
const Toggle = styled.div`
  display: flex;
  border: 2px solid blue;
  font-size: 50px;
  cursor: pointer;
`;
const Arrow = styled.span`

`;

const Body = styled.div`
  display: flex;
  border: 2px solid black;
  width: 100%;
justify-content: center;
align-items: center;
`;
const Container = styled.div`
  display: flex;
  border: 2px solid red;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  // text-align: center;
`;

const InfoLogo = styled.img`
  width: 40px;
  height: 40px;
  border: 2px solid black;
  cursor: pointer;
`;