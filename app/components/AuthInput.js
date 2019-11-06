import React from "react";
import styled from "styled-components";
import constants from "../constants";
import PropTypes from "prop-types";

const Container = styled.View`
  margin-bottom: 10px;
`;

const TextInput = styled.TextInput`
  background-color: ${props => props.theme.greyColor};
  border: 2px solid ${props => props.theme.lightGreyColor};
  border-radius: 5px;
  padding: 10px;
  width: ${constants.width / 2};
`;

const AuthInput = ({
  autoCapitalize = "none",
  autoCorrect = true,
  keyboardType = "default",
  onChange,
  placeholder,
  value,
  returnKeyType = "done",
  onEndEditing = () => null
}) => (
  <Container>
    <TextInput
      autoCapitalize={autoCapitalize}
      autoCorrect={autoCorrect}
      keyboardType={keyboardType}
      onChangeText={onChange}
      placeholder={placeholder}
      value={value}
      returnKeyType={returnKeyType}
      onEndEditing={onEndEditing}
    />
  </Container>
);

AuthInput.propTypes = {
  autoCapitalize: PropTypes.oneOf(["none", "sentences", "words", "characters"]),
  autoCorrect: PropTypes.bool,
  keyboardType: PropTypes.oneOf([
    "default",
    "number-pad",
    "decimal-pad",
    "numeric",
    "email-address",
    "phone-pad"
  ]),
  onChange: PropTypes.func.isRequired,
  onEndEditing: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,

  returnKeyType: PropTypes.oneOf(["done", "go", "next", "search", "send"])
};

export default AuthInput;
