import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components";
import constants from "../constants";
import PropTypes from "prop-types";

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  background-color: ${props =>
    props.bgColor ? props.bgColor : props.theme.blueColor};
  padding: 10px;
  border-radius: 5px;
  width: ${constants.width / 2};
`;

const Text = styled.Text`
  color: white;
  text-align: center;
  font-weight: 600;
`;

const AuthButton = ({ text, onPress, loading = false, bgColor = null }) => (
  <Touchable disabled={loading} onPress={onPress}>
    <Container bgColor={bgColor}>
      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <Text>{text}</Text>
      )}
    </Container>
  </Touchable>
);

AuthButton.propTypes = {
  loading: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default AuthButton;
