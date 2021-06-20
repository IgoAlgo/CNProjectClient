import React, { useState, useEffect} from 'react';
import styled from 'styled-components';
import Header from 'components/Header';
import Posts from 'components/Posts';
import InputModal from 'components/InputModal';
import PostModal from 'components/PostModal';
import Pagination from 'components/Pagination';
import axios from 'axios';

export default function BulletinBoard(): JSX.Element {
 const [posts, setPosts] = useState([]);
 const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [postsPerPage] = useState(4);




  // const pagignationNumber = useState(5);
  const [inputModalInfo, setInputModalInfo] = useState({
    isInputModal: false,
    mode: '',
    id: 0,
    postTitle: '',
    postContent: '',
  });
    const [postInfo, setPostInfo] = useState({
      isPostModal: false,
      postTitle: '',
      postContent: '',
    });
  interface Data{
    title: string;
    content: string;
  }
  interface User {
    id: number;
    url: string | undefined;
    method: string | undefined;
    data: Data[];
  }
  
  const [messages, setMessages] = useState<User[]>([
  ]);
  const [nextId, setNextId] = useState(1);
//   const [messages, setMessages] = useState([
//     {
//       // request: {
//       //   headers: "Dsfsf",
//       //   maxBodyLength: 1,
//       //   maxContentLength: 1,
//       //   timeout: 1,
//       //   method: "post",
//       //   url: "https://fdsf",
//       // },
//       response: {
//         status: 1,
//         headers: {
//           "cache-control": "ddd",
// "content-type": "ddd",
// expire: "-1",
// pragma: "fdf",
//         },
//         data: {
//           userId: 1,
//           id: 1,
//           title: "DFsf",
//           body: "fdfd"
//         },
//       },
//     },
//   ]);
  
  const getPost = async () => {
    setLoading(true);
    const res  = await axios.get(
      'http://ec2-13-125-230-2.ap-northeast-2.compute.amazonaws.com:8080/posts',
    );
    // console.log(res);



    setPosts(res.data);
    setLoading(false);



    setMessages(
      messages.concat({
        id: nextId,
        url: res.config.url,
        method: res.config.method,
        data: res.data,
      }),
    );
    setNextId(nextId + 1);
  }


useEffect(() => {
  getPost();

}, []);
  

  type Post = {
    userId: number;
    id: number;
    title: string;
    content: string;
  };


  function currentPosts(tmp: Post[]): Post[]{
      const indexOfLast: number = currentPage * postsPerPage;
      const indexOfFirst: number = indexOfLast - postsPerPage;
    return tmp.slice(indexOfFirst, indexOfLast);
  }

  
  return (
    <Container>
      <Header />
      <Body>
        <BoardContainer>
          <BoardHeader>게시판</BoardHeader>
          <BoardBody>
            <CreateButton
              onClick={() =>
                setInputModalInfo({
                  isInputModal: true,
                  mode: 'CREATE',
                  id: 0,
                  postTitle: '',
                  postContent: '',
                })
              }
            >
              글 생성 +
            </CreateButton>
            <Posts
              posts={currentPosts(posts)}
              loading={loading}
              // setPostInfo={setPostInfo}
              setInputModalInfo={setInputModalInfo}
              setMessages={setMessages}
              messages={messages}
              nextId={nextId}
              setNextId={setNextId}
            />
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={posts.length}
              setCurrentPage={setCurrentPage}
            />
          </BoardBody>
        </BoardContainer>
        <MessageContainer>
          <MessageHeaderWrapper>
            <MessageHeader>request/response</MessageHeader>
            <MessageHeader>Message</MessageHeader>
          </MessageHeaderWrapper>
          <MessageWrapper>
            <MessageListWrapper>
              {messages.map((mes) => (
                <MessageList key={mes.id}>
                  <div>method: {mes.method}</div>
                  <div>
                    {' '}
                    url:
                    {mes.url}
                  </div>
                  {mes.data && (
                    <div>
                      data:
                      {mes.data.map((d) => (
                        <div>
                          {'{'}title:{d.title}, content: {d.content} {'}'}
                        </div>
                      ))}
                    </div>
                  )}
                </MessageList>
              ))}
            </MessageListWrapper>
          </MessageWrapper>
        </MessageContainer>
      </Body>
      {inputModalInfo.isInputModal && (
        <InputModal
          inputModalInfo={inputModalInfo}
          setInputModalInfo={setInputModalInfo}
          messages={messages}
          setMessages={setMessages}
          nextId={nextId}
          setNextId={setNextId}
        />
      )}
      {postInfo.isPostModal && (
        <PostModal
          postTitle={postInfo.postTitle}
          postContent={postInfo.postContent}
          setPostInfo={setPostInfo}
        />
      )}
    </Container>
  );
}

const CreateButton = styled.button`
  margin-left: 20px;
  margin-top: 10px;
  width: 130px;
  height: 30px;
  background-color: #9d9b9b;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;
const BoardBody = styled.div`
  position: relative;
  width: 700px;
  height: 400px;
  border: 2px solid black;
  border-radius: 20px;

`;

const MessageHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const MessageHeader = styled.span`
  font-size: 40px;
  font-weight: bold;
  text-align: center;
 
`;
const MessageListWrapper = styled.ul`
 
  text-align: center;
`;
const MessageList = styled.li`
 
  // text-align: center;
`;

const BoardHeader = styled.span`
font-size: 40px;
font-weight: bold;
`;
const Container = styled.div`
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;


  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;  
`;

const BoardContainer = styled.div`
  display: flex;
  border: 2px solid black;
  width: 1000px;
  height: 500px;
  background-color: #c4c4c4;
  flex-direction: column;
  position: relative;
`;

const MessageContainer = styled.div`
  display: flex;
  border: 2px solid black;
  width: 500px;
  height: 500px;
  background-color: #c4c4c4;
  justify-content: space-around;
  align-items: center;

  flex-direction: column;
  position: relative;
`;
const MessageWrapper = styled.div`
  border: 2px solid black;
  width: 400px;
  border-radius: 20px;
  height: 350px;
  background-color: white;
`;

const Body = styled.div`
  display: flex;
  border: 2px solid black;
  width: 100%;
  justify-content: center;
  align-items: center;
  justify-content: space-around;
`;