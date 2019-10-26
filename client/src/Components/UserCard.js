import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import Avatar from "./Avatar";
import FatText from "./Post/FatText";
import FollowButton from "./FollowButton";

const Card = styled.div`
  ${props => props.theme.whiteBox}
  display:flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const EAvatar = styled(Avatar)`
  margin-bottom: 15px;
`;

const ELink = styled(Link)`
  color: inherit;
  margin-bottom: 10px;
`;

const UserCard = ({ id, userName, avatar, isFollowing, isMe }) => (
  <Card>
    <EAvatar url={avatar} size={"md"} />
    <ELink to={`/${userName}`}>
      <FatText text={userName} />
    </ELink>
    {!isMe && <FollowButton isFollowing={isFollowing} id={id} />}
  </Card>
);

UserCard.propTypes = {
  id: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  isMe: PropTypes.bool.isRequired
};

export default UserCard;
