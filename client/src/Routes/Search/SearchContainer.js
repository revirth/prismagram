import React from "react";
import { withRouter } from "react-router-dom";
import SearchPresenter from "./SearchPresenter";
import { useQuery } from "react-apollo-hooks";
import { SEARCH_QUERY } from "./SearchQueries";
import { isString } from "util";

export default withRouter(({ location: { search } }) => {
  var term = search.split("=")[1];
  const { data, loading } = useQuery(SEARCH_QUERY, {
    skip: !isString(term),
    variables: { term }
  });

  return <SearchPresenter searchTerm={term} loading={loading} data={data} />;
});
