import React from "react";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "./Queries";
import Loader from "../components/Loader";
import { ScrollView } from "react-native-gesture-handler";
import UserProfile from "../components/UserProfile";

const USER_DETAIL = gql`
  query seeUser($userName: String!) {
    seeUser(userName: $userName) {
      ...UserPart
    }
  }
  ${USER_FRAGMENT}
`;

export default ({ navigation }) => {
  const { data, loading } = useQuery(USER_DETAIL, {
    variables: { userName: navigation.getParam("userName") }
  });

  console.log(data, loading);

  return (
    <ScrollView>
      {loading && <Loader />}
      {!loading && data && data.seeUser && (
        <UserProfile key={data.seeUser.id} {...data.seeUser} />
      )}
    </ScrollView>
  );
};
