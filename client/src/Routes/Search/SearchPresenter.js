import React from "react";
import { isString } from "util";
import styled from "styled-components";
import FatText from "../../Components/Post/FatText";
import PropTypes from "prop-types";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard";
import SquarePost from "../SquarePost";

const Wrapper = styled.div`
  height: 50vh;
  text-align: center;
`;

const Section = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 160px);
  grid-template-rows: 160px;
  grid-auto-rows: 160px;
  grid-gap: 20px;
  margin-bottom: 30px;
`;

const PostSection = styled(Section)`
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
`;

const SearchPresenter = ({ searchTerm, loading, data }) => (
  <Wrapper>
    {!isString(searchTerm) && <FatText text={"Search for something"} />}
    {loading && <Loader />}

    <Section>
      {!loading && data && data.searchUser && data.searchUser.length === 0 && (
        <FatText text={"No Users found"} />
      )}
      {!loading &&
        data &&
        data.searchUser &&
        data.searchUser.length > 0 &&
        data.searchUser.map(user => (
          <UserCard
            key={user.id}
            id={user.id}
            userName={user.userName}
            avatar={user.avatar}
            isFollowing={user.isFollowing}
            isMe={user.isMe}
          />
        ))}
    </Section>
    <PostSection>
      {!loading && data && data.searchPost && data.searchPost.length === 0 && (
        <FatText text={"No Photos found"} />
      )}
      {!loading &&
        data &&
        data.searchPost &&
        data.searchPost.length > 0 &&
        data.searchPost.map(post => (
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

SearchPresenter.propTypes = {
  searchTerm: PropTypes.string
};

export default SearchPresenter;
