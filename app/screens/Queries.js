import { gql } from "apollo-boost";

//#region POST

export const POST_FRAGMENT = gql`
  fragment PostPart on Post {
    id
    location
    caption
    user {
      id
      avatar
      userName
    }
    files {
      id
      url
    }
    likeCount
    isLiked
    comments {
      id
      text
      user {
        id
        userName
      }
    }
    createdAt
  }
`;

export const FEED_QUERY = gql`
  {
    seeFeed {
      ...PostPart
    }
  }
  ${POST_FRAGMENT}
`;

//#endregion

//#region Profile

export const USER_FRAGMENT = gql`
  fragment UserPart on User {
    id
    userName
    fullName
    bio
    avatar
    followerCount
    followingCount
    isMe
    isFollowing
    followerCount
    followingCount
    posts {
      ...PostPart
    }
    postCount
  }
  ${POST_FRAGMENT}
`;

//#endregion
