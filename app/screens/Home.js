import React from "react";
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
  const { data, loading } = useQuery(FEED_QUERY);

  console.log(data, loading);

  return <View>{loading ? <Loader /> : <Text>Home</Text>}</View>;
};

export default Home;
