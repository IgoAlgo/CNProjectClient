import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';

type Props = {
  inputModalInfo: InputInfo;
  setInputModalInfo: (para: InputInfo) => void;
  // setMessages: (para: Message[]) => void;
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

export default function PostModal({
  inputModalInfo,
  setInputModalInfo,
  // setMessages,
}: Props): JSX.Element {
  const [title, setTitle] = useState(inputModalInfo.postTitle);
  const [content, setContent] = useState(inputModalInfo.postContent);


  const savePost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // event handler
    e.preventDefault();

    // res type은 무슨 값으로 지정?
    let res: any;
    if (inputModalInfo.mode === 'CREATE') {
      res = await axios.post(
        `https://jsonplaceholder.typicode.com/posts`,
        {
          title,
          content,
        },
      );
    } else if (inputModalInfo.mode === 'EDIT') {
      res = await axios.patch(
        `https://jsonplaceholder.typicode.com/posts/${inputModalInfo.id}`,
        { title, content },
      );
    }
    console.log(res);
    setInputModalInfo({
      isInputModal: false,
      mode: '',
      id: 0,
      postTitle: '',
      postContent: '',
    });

    // setMessages();
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
            <SaveButton onClick={(e) => savePost(e)}>저장</SaveButton>
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

