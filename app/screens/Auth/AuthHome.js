import React from "react";
import styled from "styled-components";
import constants from "../../constants";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Image = styled.Image`
  width: ${constants.width / 2};
`;

const Touchable = styled.TouchableOpacity``;

const SignUpButton = styled.View`
  background-color: ${props => props.theme.blueColor};
  padding: 10px;
  border-radius: 5px;
  width: ${constants.width / 2};
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ButtonText = styled.Text`
  color: white;
  text-align: center;
  font-weight: 600;
`;

const LoginLink = styled.View``;

const LoginLinkText = styled.Text`
  color: ${props => props.theme.blueColor};
`;

const AuthHome = ({ navigation }) => (
  <View>
    <Image resizeMode={"contain"} source={require("../../assets/logo.png")} />
    <Touchable onPress={() => navigation.navigate("SignUp")}>
      <SignUpButton>
        <ButtonText>Create New Account</ButtonText>
      </SignUpButton>
    </Touchable>
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
