import { gql } from "apollo-boost";

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
