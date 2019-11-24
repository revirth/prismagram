import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../components/Loader";
import SquarePhoto from "../../components/SquarePhoto";

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

const SearchPresenter = ({ term, shouldFetch }) => {
  const { data, loading, refetch } = useQuery(SEARCH_QUERY, {
    variables: { term: term },
    skip: !shouldFetch,
    fetchPolicy: "network-only"
  });

  console.log(data, loading);

  const [refreshing, setRefreshing] = useState(false);
  const refresh = async () => {
    try {
      setRefreshing(true);

      await refetch({ variables: { term } });
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    >
      {loading && <Loader />}
      {!loading &&
        data &&
        data.searchPost &&
        data.searchPost.length > 0 &&
        data.searchPost.map(post => <SquarePhoto key={post.id} {...post} />)}
    </ScrollView>
  );
};

SearchPresenter.propTypes = {
  term: PropTypes.string.isRequired,
  shouldFetch: PropTypes.bool.isRequired
};

export default SearchPresenter;
