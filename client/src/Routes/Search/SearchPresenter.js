import React from "react";
import { isString } from "util";
import styled from "styled-components";
import FatText from "../../Components/Post/FatText";
import PropTypes from "prop-types";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard";

const Wrapper = styled.div`
  height: 50vh;
  text-align: center;
`;

const Section = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 160px;
  grid-gap: 20px;
  margin-bottom: 30px;
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
    {!loading && data && data.searchPost && data.searchPost.length === 0 && (
      <FatText text={"No Photos found"} />
    )}
    {!loading &&
      data &&
      data.searchPost &&
      data.searchPost.length > 0 &&
      data.searchPost.map(post => post.urls)}
  </Wrapper>
);

SearchPresenter.propTypes = {
  searchTerm: PropTypes.string
};

export default SearchPresenter;
