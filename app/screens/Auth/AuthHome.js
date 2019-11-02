import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

const AuthHome = ({ navigation }) => (
  <View>
    <Text>AuthHome</Text>
    <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
      <Text>Go to LogIn</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
      <Text>Go to SignUp</Text>
    </TouchableOpacity>
  </View>
);

export default AuthHome;
