import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { FEED_QUERY } from "./Queries";
import Loader from "../components/Loader";

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

  console.log(data, loading);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    >
      {loading ? <Loader /> : <Text>Home</Text>}
    </ScrollView>
  );
};

export default Home;
