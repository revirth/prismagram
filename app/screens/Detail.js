import React from "react";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import { POST_FRAGMENT } from "./Queries";
import Loader from "../components/Loader";
import Post from "../components/Post";
import { ScrollView } from "react-native-gesture-handler";

const POST_DETAIL = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      ...PostPart
    }
  }
  ${POST_FRAGMENT}
`;

export default ({ navigation }) => {
  const { data, loading } = useQuery(POST_DETAIL, {
    variables: { id: navigation.getParam("id") }
  });

  console.log(data, loading);

  return (
    <ScrollView>
      {loading && <Loader />}
      {!loading && data && data.seeFullPost && (
        <Post key={data.seeFullPost.id} {...data.seeFullPost} />
      )}
    </ScrollView>
  );
};
