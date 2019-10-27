import React from "react";
import { Link, withRouter } from "react-router-dom";
import ProfilePresenter from "./ProfilePresenter";
import { USER_QUERY } from "./ProfileQueries";
import { useQuery } from "react-apollo-hooks";

export default withRouter(props => {
  const { data, loading } = useQuery(USER_QUERY, {
    variables: { userName: props.match.params.userName }
  });

  return <ProfilePresenter loading={loading} data={data} />;
});
