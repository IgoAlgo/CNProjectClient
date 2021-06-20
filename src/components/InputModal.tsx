import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';

 interface Data {
   title: string;
   content: string;
 }
interface User {
  id: number;
    url: string | undefined;
    method: string | undefined;
    data: Data[];
  }
type Props = {
  inputModalInfo: InputInfo;
  setInputModalInfo: (para: InputInfo) => void;
  // setMessages: (para: Message[]) => void;
  messages: User[];
  setMessages: (para: User[]) => void;
  nextId: number;
  setNextId: (para: number) => void;
};

type InputInfo = {
  isInputModal: boolean;
  mode: string;
  id: number;
  postTitle: string;
  postContent: string;
};
// type ResponseHeader = {
//   'cache-control': string;
//   'content-type': string;
//   expire: string;
//   pragma: string;
// };
// type Post = {
//   userId: number;
//   id: number;
//   title: string;
//   body: string;
// };
// type Response = {
//   status: number;
//   headers: ResponseHeader;

//   data: Post;
// };
// type Message = {
//   // request: Request;
//   response: Response;
// };

export default function InputModal({
  inputModalInfo,
  setInputModalInfo,
  messages,
  setMessages,
  nextId,
          setNextId
}: Props): JSX.Element {
  const [title, setTitle] = useState(inputModalInfo.postTitle);
  const [content, setContent] = useState(inputModalInfo.postContent);


  const savePost = async () => {
    // event handler
    // e.preventDefault();

 
    let res = {
      config: { url: "", method: ""},
      data: []
    };
    if (inputModalInfo.mode === 'CREATE') {
      res = await axios.post(
        `http://ec2-13-125-230-2.ap-northeast-2.compute.amazonaws.com:8080/posts`,
        {
          title,
          content},
      );
    } else if (inputModalInfo.mode === 'EDIT') {
      res = await axios.put(
        `http://ec2-13-125-230-2.ap-northeast-2.compute.amazonaws.com:8080/posts/${inputModalInfo.id}`,
        { title, content },
      );
    }
    setInputModalInfo({
      isInputModal: false,
      mode: '',
      id: 0,
      postTitle: '',
      postContent: '',
    });
      setMessages(
        messages.concat({
            id: nextId,
            url: res.config.url,
            method: res.config.method,
            data: res.data,
          }),
    );
    setNextId(nextId + 1);
    // window.location.reload();
  };

  return (
    <Container>

        <InputWrapper>
          <TitleText
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <ContentText
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <ButtonWrapper>
            <CancelButton
              onClick={() =>
                setInputModalInfo({
                  isInputModal: false,
                  mode: '',
                  id: 0,
                  postTitle: '',
                  postContent: '',
                })
              }
            >
              취소
            </CancelButton>
            <SaveButton onClick={() => savePost()}>저장</SaveButton>
          </ButtonWrapper>
        </InputWrapper>

    </Container>
  );
}
const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  border: 2px solid red;
  justify-content: space-evenly;
`;
const CancelButton = styled.button`
  width: 200px;
  height: 45px;
  background-color: #c4c4c4;
  border-radius: 20px;
`;
const SaveButton = styled.button`
  width: 180px;
  height: 45px;
  background-color: #c4c4c4;
  border-radius: 20px;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 4px solid blue;
  align-items: center;
`;



const TitleText = styled.input`
  width: 550px;
  height: 35px;
  background-color: #c4c4c4;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
`;
const ContentText = styled.input`
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

`;

