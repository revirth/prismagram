import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import FatText from "../../Components/Post/FatText";
import FollowButton from "../../Components/FollowButton";
import SquarePost from "../SquarePost";
import Button from "../../Components/Button";

const Wrapper = styled.div`
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 50px;
`;

const HeaderColumn = styled.div``;

const UserName = styled.span`
  font-size: 18px;
  display: block;
`;

const UserNameRow = styled.div`
  display: flex;
  align-items: center;
`;

const FullName = styled(FatText)`
  font-size: 14px;
`;

const Counts = styled.ul`
  display: flex;
  margin: 15px 0px;
`;

const Count = styled.li`
  font-size: 16px;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const Bio = styled.p`
  margin: 10px 0px;
`;

const PostSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 300px);
  grid-template-rows: 300px;
  grid-auto-rows: 300px;
  grid-gap: 20px;
  margin-bottom: 30px;
`;

export default ({ data, loading, logUserOut }) => {
  if (loading)
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  else {
    console.log(data);
    const {
      id,
      userName,
      fullName,
      bio,
      avatar,
      followerCount,
      followingCount,
      isMe,
      isFollowing,
      posts,
      postCount
    } = data.seeUser;

    return (
      <Wrapper>
        <Helmet>
          <title>{userName} | Prismagram</title>
        </Helmet>
        <Header>
          <HeaderColumn>
            <Avatar size={"lg"} url={avatar} />
          </HeaderColumn>
          <HeaderColumn>
            <UserNameRow>
              <UserName>{userName}</UserName>
              {isMe && <Button onClick={logUserOut} text="Logout" />}
              {!isMe && <FollowButton id={id} isFollowing={isFollowing} />}
            </UserNameRow>
            <Counts>
              <Count>
                <FatText text={String(postCount)} /> posts
              </Count>
              <Count>
                <FatText text={String(followerCount)} /> followers
              </Count>
              <Count>
                <FatText text={String(followingCount)} /> following
              </Count>
            </Counts>
            <FullName text={fullName} />
            <Bio>{bio}</Bio>
          </HeaderColumn>
        </Header>
        <PostSection>
          {posts &&
            posts.map(post => (
              <SquarePost
                key={post.id}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                file={post.files[0].url}
              />
            ))}
        </PostSection>
      </Wrapper>
    );
  }
};
