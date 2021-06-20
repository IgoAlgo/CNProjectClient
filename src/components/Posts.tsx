import React from 'react';
import styled from 'styled-components';
import axios from 'axios';


type Post = {
    id: number,
    title: string,
    content: string
}
// type PostInfo = {
//   isPostModal: boolean;
//   postTitle: string;
//   postContent: string;
// };
type InputInfo = {
  isInputModal: boolean;
  mode: string;
  id: number;
  postTitle: string;
  postContent: string;
};

// type ResponseHeader = {
//   'cache-control': string ;
//   'content-type': string;
//   expire: string ;
//   pragma: string ;
// };
// type Request = {
//   headers: string;
//   maxBodyLength: number ;
//   maxContentLength: number ;
//   timeout: number;
//   method: string ;
//   url: string ;
// };
// type Response = {
//   status: number;
//   headers: ResponseHeader;

//   data: Post;
// };

// type Message = {

//   method: string | undefined;
// };
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
  posts: Post[];
  loading: boolean;
  // setPostInfo: (info: PostInfo) => void;
  setInputModalInfo: (para: InputInfo) => void;
  // (para: Message[])로 하면 type error .. 초기값이 empty array로 할당돼서 error 뜨는 듯
  setMessages: (para: User[]) => void;
  messages: User[];
  nextId: number;
  setNextId: (para: number) => void;
};

export default function Posts({
  posts,
  loading,
  // setPostInfo,
  setInputModalInfo,
  setMessages,
  messages,
  nextId,
  setNextId
}: Props): JSX.Element {
  // const getPostInfo = async (id: number) => {
  //   const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
  

  //   setPostInfo({
  //     isPostModal: true,
  //     postTitle: res.data.title,
  //     postContent: res.data.body,
  //   });

    // setMessages(
    //   messages.concat({
    //     // request: {
    //     //   headers: res.config.headers.Accept,
    //     //   maxBodyLength: res.config.maxBodyLength,
    //     //   maxContentLength: res.config.maxContentLength,
    //     //   timeout: res.config.timeout,
    //     //   method: res.config.method,
    //     //   url: res.config.url,
    //     // },

    //     response: {
    //       status: res.status,
    //       headers: res.headers,
    //       data: res.data,
    //     },
    //   }),
    // );
    // setMessages(messages.concat(1));
  // };

  const editPost = async (id: number, title: string, content: string) => {

    setInputModalInfo({
      isInputModal: true,
      mode: 'EDIT',
      id,
      postTitle: title,
      postContent: content,
    });
    // setMessages();
  };
  const deletePost = async (id: number) => {
    // url에 id값을 넣어서? 두 번쨰 파라미터로 넣어서?

    const res = await axios.delete(
      `http://ec2-13-125-230-2.ap-northeast-2.compute.amazonaws.com:8080/posts/${id}`,
    );
    setMessages(
      messages.concat({
        id: nextId,
        url: res.config.url,
        method: res.config.method,
        data: res.data,
      }),
    );
    setNextId(nextId + 1);
    // console.log(res);
    // setMessages(
    //   messages.concat({
    //     url: res.config.url,
    //     method: res.config.method
    //   }),
    // );
    // window.location.reload();
  };

  return (
    <>
      {loading && <LoadingText>loading...</LoadingText>}

      <PostListWrapper>
        {posts.map((post) => (
          <PostList key={post.id}>
            {/* <PostContent onClick={() => getPostInfo(post.id)}> */}
            <PostContent>
              <div>제목: {post.title}</div>
              <div>내용: {post.content}</div>
            </PostContent>

            <EditButton onClick={() => editPost(post.id, post.title, post.content)}>수정</EditButton>
            <DeleteButton
              onClick={() => {
                deletePost(post.id);
              }}
            >
              X
            </DeleteButton>
          </PostList>
        ))}
      </PostListWrapper>
    </>
  );
}

const LoadingText = styled.div``;
const PostListWrapper = styled.div``;
const PostList = styled.div`
  display: flex;
  border: 2px solid red;
  height: 65px;
  // text-align: center;
  align-items: center;
  // vertical-align: middle;
`;

const PostContent = styled.div`
  display: inline-block;
  width: 500px;
  height: 50px;
  border: 2px solid black;
  margin-right: 10px;
  margin-left: 10px;
  border-radius: 20px;
  background-color: white;
  cursor: pointer;
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.4);
  }
`;
const DeleteButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: #9d9b9b;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;
const EditButton = styled.button`
  width: 70px;
  height: 50px;
  margin-right: 10px;
  background-color: #9d9b9b;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;