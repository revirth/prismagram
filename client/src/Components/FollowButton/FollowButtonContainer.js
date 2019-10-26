import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "react-apollo-hooks";
import { FOLLOW_QUERY, UNFOLLOW_QUERY } from "./FollowButtonQueries";
import FollowButtonPresenter from "./FollowButtonPresenter";

const FollowButtonContainer = ({ isFollowing, id }) => {
  const [isFollowingState, setIsFollowingState] = useState(isFollowing);
  const [followMutation] = useMutation(FOLLOW_QUERY, {
    variables: { id: id }
  });
  const [unfollowMutation] = useMutation(UNFOLLOW_QUERY, {
    variables: { id: id }
  });

  const onClick = () => {
    if (isFollowingState) {
      setIsFollowingState(false);
      unfollowMutation();
    } else {
      setIsFollowingState(true);
      followMutation();
    }
  };

  return (
    <FollowButtonPresenter isFollowing={isFollowingState} onClick={onClick} />
  );
};

FollowButtonContainer.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired
};

export default FollowButtonContainer;
