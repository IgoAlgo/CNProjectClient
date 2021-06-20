import React, { useState } from 'react';
import PostModal from 'components/PostModal';
import styled from 'styled-components';
import axios from 'axios';


type Post = {
    userId: number,
    id: number,
    title: string,
    body: string
}
type PostInfo = {
  isPostModal: boolean;
  postTitle: string;
  postContent: string;
};
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
//   // request: Request;
//   response: Response;
// };
type Props = {
  posts: Post[];
  loading: boolean;
  setPostInfo: (info: PostInfo) => void;
  setInputModalInfo: (para: InputInfo) => void;
  // (para: Message[])로 하면 type error .. 초기값이 empty array로 할당돼서 error 뜨는 듯
  // setMessages: (para: Message[]) => void;
  // messages: Message[];
};

export default function Posts({
  posts,
  loading,
  setPostInfo,
  setInputModalInfo,
  // setMessages,
  // messages
}: Props): JSX.Element {
  const getPostInfo = async (id: number) => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    console.log(res);

    setPostInfo({
      isPostModal: true,
      postTitle: res.data.title,
      postContent: res.data.body,
    });

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
  };

  const editPost = async (id: number) => {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
    );
    setInputModalInfo({
      isInputModal: true,
      mode: 'EDIT',
      id,
      postTitle: res.data.title,
      postContent: res.data.body,
    });
    // setMessages();
  };
  const deletePost = async (id: number) => {
    // url에 id값을 넣어서? 두 번쨰 파라미터로 넣어서?

    const res = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
    );
    console.log(res);

    // setMessages();
  };

  return (
    <>
      {loading && <LoadingText>loading...</LoadingText>}

      <PostListWrapper>
        {posts.map((post) => (
          <>
            <PostList>
              <PostContent key={post.id} onClick={() => getPostInfo(post.id)}>
                {post.title}
              </PostContent>

              <EditButton onClick={() => editPost(post.id)}>수정</EditButton>
              <DeleteButton
                onClick={() => {
                  deletePost(post.id);
                }}
              >
                X
              </DeleteButton>
            </PostList>
          </>
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
  height: 45px;
  // text-align: center;
  align-items: center;
  // vertical-align: middle;
`;

const PostContent = styled.div`
  display: inline-block;
  width: 500px;
  height: 30px;
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
  width: 30px;
  height: 30px;
  background-color: #9d9b9b;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;
const EditButton = styled.button`
  width: 50px;
  height: 30px;
  margin-right: 10px;
  background-color: #9d9b9b;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;