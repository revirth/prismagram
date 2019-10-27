import React from "react";
import { withRouter } from "react-router-dom";
import ProfilePresenter from "./ProfilePresenter";
import { USER_QUERY, LOGOUT_QUERY } from "./ProfileQueries";
import { useQuery, useMutation } from "react-apollo-hooks";

export default withRouter(props => {
  const { data, loading } = useQuery(USER_QUERY, {
    variables: { userName: props.match.params.userName }
  });
  const [logUserOut] = useMutation(LOGOUT_QUERY);

  return (
    <ProfilePresenter loading={loading} data={data} logUserOut={logUserOut} />
  );
});
