import { gql } from "apollo-boost";

export const SEARCH_QUERY = gql`
  query search($term: String!) {
    searchPost(term: $term) {
      files {
        url
      }
      likeCount
    }
    searchUser(term: $term) {
      userName
      avatar
      isFollowing
      isMe
    }
  }
`;
