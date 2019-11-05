import React from "react";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

const Login = () => {
  const emailInput = useInput("");
  const handleLogin = () => {};

  return (
    <View>
      <AuthInput
        {...emailInput}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Email"
        onChangeText={() => null}
      />
      <AuthButton text="Log In" onPress={() => null} />
    </View>
  );
};

export default Login;
