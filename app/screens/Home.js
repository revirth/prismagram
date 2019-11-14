import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { FEED_QUERY } from "./Queries";
import Loader from "../components/Loader";
import Post from "../components/Post";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(FEED_QUERY);

  const refresh = async () => {
    try {
      setRefreshing(true);

      await refetch();
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  };

  // if (!loading) console.log(data.seeFeed.length, loading);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    >
      {loading && <Loader />}
      {!loading &&
        data &&
        data.seeFeed &&
        data.seeFeed.map(post => <Post key={post.id} {...post} />)}
    </ScrollView>
  );
};

export default Home;
