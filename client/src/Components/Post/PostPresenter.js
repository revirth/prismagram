import React from "react";
import TextareaAutosize from "react-autosize-textarea";
import styled from "styled-components";
import FatText from "./FatText";
import Avatar from "../Avatar";
import { HeartFull, HeartEmpty, Comment } from "../Icons";

const Post = styled.div`
  ${props => props.theme.whiteBox};
  width: 100%;
  max-width: 600px;
  margin-bottom: 25px;
`;

const Header = styled.header`
  padding: 15px;
  display: flex;
  align-items: center;
`;

const UserColumn = styled.div`
  margin-left: 10px;
`;

const Location = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
`;

const Files = styled.div``;

const File = styled.img`
  max-width: 100%;
`;

const Meta = styled.div`
  padding: 15px;
`;

const Button = styled.span`
  cursor: pointer;
`;

const Buttons = styled.div`
  ${Button} {
    &:first-child {
      margin-right: 10px;
    }
  }
  margin-bottom: 10px;
`;

const Timestamp = styled.span`
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.5;
  display: block;
  font-size: 12px;
  margin: 10px 0px;
  padding-bottom: 10px;
  border-bottom: ${props => props.theme.lightGrayColor} 1px solid;
`;

const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 100%;
  resize: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;

export default ({
  user: { userName, avatar },
  location,
  files,
  isLiked,
  likeCount,
  createdAt,
  newComment
}) => (
  <Post>
    <Header>
      <Avatar size="sm" url={avatar} />
      <UserColumn>
        <FatText text={userName} />
        <Location>{location}</Location>
      </UserColumn>
    </Header>
    <Files>
      {files && files.map(file => <File key={file.id} src={file.url} />)}
    </Files>
    <Meta>
      <Buttons>
        <Button>{isLiked ? <HeartFull /> : <HeartEmpty />}</Button>
        <Button>
          <Comment />
        </Button>
      </Buttons>
      <FatText text={likeCount + " likes"} />
      <Timestamp>{createdAt}</Timestamp>
      <Textarea placeholder="Add a comment..." {...newComment} />
    </Meta>
  </Post>
);
