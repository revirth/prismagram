import React, { useState } from "react";
import { Image } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import Swiper from "react-native-swiper";
import constants from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "@unimodules/core";
import styles from "../styles";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";

const TOGGLE_LIKE = gql`
  mutation toggleLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

const Container = styled.View``;

const Header = styled.View`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;

const Touchable = styled.TouchableOpacity``;

const HeaderUserContainer = styled.View`
  margin-left: 10px;
`;

const Bold = styled.Text`
  font-weight: 300;
`;

const Location = styled.Text`
  font-size: 12px;
`;

const IconsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

const IconContainer = styled.View`
  margin-right: 10px;
`;

const InfoContainer = styled.View`
  padding: 10px;
`;

const Caption = styled.Text`
  margin: 3px 0px;
`;

const CommentCount = styled.Text`
  opacity: 0.5;
  font-size: 12;
`;

const Post = ({
  id,
  location,
  user,
  files = [],
  likeCount: likeCountProp,
  caption,
  comments = [],
  isLiked: isLikedProp
}) => {
  const [isLiked, setIsLiked] = useState(isLikedProp);
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id }
  });

  const [likeCount, setLikeCount] = useState(likeCountProp);

  const handleLike = async () => {
    setIsLiked(p => !p);
    setLikeCount(likeCount + (isLiked ? -1 : 1));

    try {
      await toggleLikeMutation();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Header>
        <Touchable>
          <Image
            style={{ width: 40, height: 40, borderRadius: 20 }}
            source={{ uri: user.avatar }}
          />
        </Touchable>
        <Touchable>
          <HeaderUserContainer>
            <Bold>{user.userName}</Bold>
            <Location>{location}</Location>
          </HeaderUserContainer>
        </Touchable>
      </Header>
      <Swiper loop={false} style={{ height: constants.height / 2.5 }}>
        {files.map(file => (
          <Image
            key={file.id}
            style={{ width: constants.width, height: constants.height / 2.5 }}
            source={{ uri: file.url }}
          />
        ))}
      </Swiper>
      <InfoContainer>
        <IconsContainer>
          <Touchable onPress={handleLike}>
            <IconContainer>
              <Ionicons
                size={30}
                color={isLiked ? styles.redColor : styles.blackColor}
                name={
                  Platform.OS === "ios"
                    ? `ios-heart${isLiked ? "" : "-empty"}`
                    : `md-heart${isLiked ? "" : "-empty"}`
                }
              />
            </IconContainer>
          </Touchable>
          <Touchable>
            <IconContainer>
              <Ionicons
                size={30}
                name={Platform.OS === "ios" ? "ios-chatboxes" : "md-chatboxes"}
              />
            </IconContainer>
          </Touchable>
        </IconsContainer>
        <Touchable>
          <Bold>
            {likeCount === 1 ? `${likeCount} like` : `${likeCount} likes`}
          </Bold>
        </Touchable>
        <Touchable>
          <Caption>
            <Bold>{user.userName}</Bold> {caption}
          </Caption>
          {comments.length > 0 && (
            <Touchable>
              <CommentCount>See all {comments.length} comments</CommentCount>
            </Touchable>
          )}
        </Touchable>
      </InfoContainer>
    </Container>
  );
};

Post.propTypes = {
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

export default Post;
