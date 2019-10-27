import { gql } from "apollo-boost";

export const USER_QUERY = gql`
  query seeUser($userName: String!) {
    seeUser(userName: $userName) {
      id
      userName
      fullName
      bio
      avatar
      followerCount
      followingCount
      isMe
      isFollowing
      posts {
        id
        files {
          url
        }
        likeCount
        commentCount
      }
      postCount
    }
  }
`;

export const LOGOUT_QUERY = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;
