import React from "react";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

const SignUp = () => (
  <View>
    <AuthButton text="Sign Up" onPress={() => null} />
  </View>
);

export default SignUp;
