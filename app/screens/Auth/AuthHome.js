import React from "react";
import styled from "styled-components";
import constants from "../../constants";
import AuthButton from "../../components/AuthButton";
import PropTypes from "prop-types";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Image = styled.Image`
  width: ${constants.width / 2};
  margin-bottom: 20px;
`;

const Touchable = styled.TouchableOpacity``;

const LoginLink = styled.View`
  margin-top: 20px;
`;

const LoginLinkText = styled.Text`
  color: ${props => props.theme.blueColor};
`;

const AuthHome = ({ navigation }) => (
  <View>
    <Image resizeMode={"contain"} source={require("../../assets/logo.png")} />
    <AuthButton
      text={"Create New Account"}
      onPress={() => navigation.navigate("SignUp")}
    />
    <Touchable onPress={() => navigation.navigate("LogIn")}>
      <LoginLink>
        <LoginLinkText>LogIn</LoginLinkText>
      </LoginLink>
    </Touchable>

    {/* <Text>AuthHome</Text>
    <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
      <Text>Go to LogIn</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
      <Text>Go to SignUp</Text>
    </TouchableOpacity> */}
  </View>
);

export default AuthHome;
