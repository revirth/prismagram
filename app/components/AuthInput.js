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
  autoCapitalize,
  keyboardType = "default",
  onChangeText,
  placeholder,
  value
}) => (
  <Container>
    <TextInput
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      placeholder={placeholder}
      value={value}
    />
  </Container>
);

AuthInput.propTypes = {
  autoCapitalize: PropTypes.oneOf(["none", "sentences", "words", "characters"]),
  keyboardType: PropTypes.oneOf([
    "default",
    "number-pad",
    "decimal-pad",
    "numeric",
    "email-address",
    "phone-pad"
  ]),
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default AuthInput;
