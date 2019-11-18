import React, { useEffect } from "react";
import { ScrollViewer } from "react-native";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "./Queries";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "react-apollo-hooks";
import Loader from "../components/Loader";
import UserProfile from "../components/UserProfile";

const ME_QUERY = gql`
  {
    me {
      ...UserPart
    }
  }
  ${USER_FRAGMENT}
`;

export default ({ navigation }) => {
  const { data, loading } = useQuery(ME_QUERY);

  console.log(data, loading);

  useEffect(() => {
    if (data && data.me) {
      navigation.setParams("title", data.me.userName);
    }
  }, [data]);

  return (
    <ScrollView>
      {loading && <Loader />}
      {!loading && data && data.me && <UserProfile {...data.me} />}
    </ScrollView>
  );
};
