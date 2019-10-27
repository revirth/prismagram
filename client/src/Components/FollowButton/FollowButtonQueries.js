import { gql } from "apollo-boost";

export const FOLLOW_QUERY = gql`
  mutation follow($id: String!) {
    followUser(id: $id)
  }
`;

export const UNFOLLOW_QUERY = gql`
  mutation unfollow($id: String!) {
    unfollowUser(id: $id)
  }
`;
