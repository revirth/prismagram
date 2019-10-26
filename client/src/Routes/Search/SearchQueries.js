import { gql } from "apollo-boost";

export const SEARCH_QUERY = gql`
  query search($term: String!) {
    searchPost(term: $term) {
      id
      files {
        url
      }
      likeCount
      commentCount
    }
    searchUser(term: $term) {
      id
      userName
      avatar
      isFollowing
      isMe
    }
  }
`;
