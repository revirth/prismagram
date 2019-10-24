import React from "react";
import { isString } from "util";
import styled from "styled-components";
import FatText from "../../Components/Post/FatText";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  height: 50vh;
  text-align: center;
`;

const SearchPresenter = ({ searchTerm }) => (
  <Wrapper>
    {isString(searchTerm) && searchTerm.length > 0 ? (
      <FatText text={`Searching ${searchTerm}...`} />
    ) : (
      "No Search Keyword"
    )}
  </Wrapper>
);

SearchPresenter.propTypes = {
  searchTerm: PropTypes.string
};

export default SearchPresenter;
