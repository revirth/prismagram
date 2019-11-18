import React from "react";
import PropTypes from "prop-types";

const UserProfile = () => null;

UserProfile.propTypes = {
  id: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  followerCount: PropTypes.number.isRequired,
  followingCount: PropTypes.number.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        userName: PropTypes.string.isRequired
      }).isRequired,
      files: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired
        })
      ).isRequired,
      likeCount: PropTypes.number.isRequired,
      isLiked: PropTypes.bool.isRequired,
      comments: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired,
          user: PropTypes.shape({
            id: PropTypes.string.isRequired,
            userName: PropTypes.string.isRequired
          }).isRequired
        })
      ).isRequired,
      caption: PropTypes.string.isRequired,
      location: PropTypes.string,
      createdAt: PropTypes.string.isRequired
    })
  ),
  postCount: PropTypes.number.isRequired,
  isMe: PropTypes.bool.isRequired
};

export default UserProfile;
