import React, { useState } from "react";
import { Image, View, TouchableOpacity } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import styles from "../styles";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "@unimodules/core";
import constants from "../constants";
import Post from "./Post";
import SquarePhoto from "./SquarePhoto";

const ProfileHeader = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const HeaderColumn = styled.View``;

const ProfileStates = styled.View`
  flex-direction: row;
`;

const Stat = styled.View`
  align-items: center;
  margin-left: 40px;
  margin-top: 5px;
`;

const StatNumber = styled.Text`
  font-weight: 600;
`;

const StatName = styled.Text`
  font-size: 12px;
  color: ${styles.darkGreyColor};
`;

const ProfileMeta = styled.View`
  margin-top: 10px;
  padding-horizontal: 20px;
`;

const Bio = styled.Text``;

const Bold = styled.Text`
  font-weight: 600;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Button = styled.View`
  width: ${constants.width / 2};
  align-items: center;
`;

const UserProfile = ({
  avatar,
  postCount,
  followerCount,
  followingCount,
  bio,
  fullName,
  posts
}) => {
  const [isGrid, setIsGrid] = useState(true);
  const toggleIsGrid = () => setIsGrid(p => !p);

  return (
    <View>
      <ProfileHeader>
        <Image
          style={{ width: 80, height: 80, borderRadius: 40 }}
          source={{ uri: avatar }}
        />
        <HeaderColumn>
          <ProfileStates>
            <Stat>
              <StatNumber>{postCount}</StatNumber>
              <StatName>Posts</StatName>
            </Stat>
            <Stat>
              <StatNumber>{followerCount}</StatNumber>
              <StatName>Followers</StatName>
            </Stat>
            <Stat>
              <StatNumber>{followingCount}</StatNumber>
              <StatName>Followings</StatName>
            </Stat>
          </ProfileStates>
        </HeaderColumn>
      </ProfileHeader>
      <ProfileMeta>
        <Bold>{fullName}</Bold>
        <Bio>{bio}</Bio>
      </ProfileMeta>
      <ButtonContainer>
        <TouchableOpacity onPress={toggleIsGrid}>
          <Button>
            <Ionicons
              color={isGrid ? styles.blackColor : styles.darkGreyColor}
              size={36}
              name={Platform.OS === "ios" ? "ios-grid" : "md-grid"}
            />
          </Button>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleIsGrid}>
          <Button>
            <Ionicons
              color={!isGrid ? styles.blackColor : styles.darkGreyColor}
              size={36}
              name={Platform.OS === "ios" ? "ios-list" : "md-list"}
            />
          </Button>
        </TouchableOpacity>
      </ButtonContainer>
      {isGrid ? (
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {posts && posts.map(post => <SquarePhoto key={post.id} {...post} />)}
        </View>
      ) : (
        <View>
          {posts && posts.map(post => <Post key={post.id} {...post} />)}
        </View>
      )}
    </View>
  );
};

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
