import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PostPresenter from "./PostPresenter";
import { useMutation } from "react-apollo-hooks";
import { TOGGLE_LIKE, ADD_COMMENT } from "./PostQueries";
import useInput from "../../Hooks/useInput";
import { toast } from "react-toastify";

const PostContainer = ({
  id,
  user,
  files,
  likeCount,
  isLiked,
  comments,
  createdAt,
  caption,
  location
}) => {
  const [isLikedState, setIsLikedState] = useState(isLiked);
  const [likeCountState, setLikeCountState] = useState(likeCount);
  const [selfComments, setSelfComments] = useState([]);
  const comment = useInput("");

  // image slide
  const [currentImgIndex, setcurrentImgIndex] = useState(0);
  const slide = () => {
    const totalFiles = files.length;

    if (currentImgIndex === totalFiles - 1)
      setTimeout(() => setcurrentImgIndex(0), 3000);
    else setTimeout(() => setcurrentImgIndex(currentImgIndex + 1), 3000);
  };
  useEffect(() => {
    slide();
  }, [currentImgIndex]);

  // useMutation
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id }
  });
  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    variables: { text: comment.value, postId: id }
  });

  const toggleLike = () => {
    setIsLikedState(!isLikedState);
    setLikeCountState(likeCountState + (!isLikedState ? 1 : -1));

    toggleLikeMutation();
  };

  const onKeyPress = async e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      comment.setValue("");

      try {
        const {
          data: { addComment }
        } = await addCommentMutation();

        setSelfComments([...selfComments, addComment]);
      } catch (error) {
        toast.error("Can't add a comment");
      }
    }
  };

  return (
    <PostPresenter
      user={user}
      files={files}
      likeCount={likeCountState}
      isLiked={isLikedState}
      comments={comments}
      createdAt={createdAt}
      newComment={comment}
      setIsLiked={setIsLikedState}
      setLikeCount={setLikeCountState}
      caption={caption}
      location={location}
      currentImgIndex={currentImgIndex}
      toggleLike={toggleLike}
      onKeyPress={onKeyPress}
      selfComments={selfComments}
    />
  );
};

PostContainer.propTypes = {
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
};

export default PostContainer;
