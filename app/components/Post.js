import React, { useState, useEffect } from "react";
import { Image } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import Swiper from "react-native-swiper";
import constants from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "@unimodules/core";

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
  location,
  user,
  files = [],
  likeCount,
  caption,
  comments = []
}) => {
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
          <Touchable>
            <IconContainer>
              <Ionicons
                size={30}
                name={
                  Platform.OS === "ios" ? "ios-heart-empty" : "md-heart-empty"
                }
              />
            </IconContainer>
          </Touchable>
          <Touchable>
            <IconContainer>
              <Ionicons
                size={30}
                name={
                  Platform.OS === "ios" ? "ios-heart-empty" : "md-heart-empty"
                }
              />
            </IconContainer>
          </Touchable>
        </IconsContainer>
        <Touchable>
          <Bold>{likeCount === 1 ? likeCount : `${likeCount} likes`}</Bold>
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
