import React, { useState } from "react";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { CREATE_ACCOUNT } from "./AuthQueries";
import * as Facebook from "expo-facebook";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const FBContainer = styled.View`
  margin-top: 10px;
  padding-top: 10px;
  border-top-width: 1px;
  border-color: ${props => props.theme.lightGreyColor};
  border-style: solid;
`;

const SignUp = ({ navigation }) => {
  const firstNameInput = useInput("");
  const lastNameInput = useInput("");
  const emailInput = useInput(navigation.getParam("email", ""));
  const userNameInput = useInput("");

  const [loading, setLoading] = useState(false);
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      userName: userNameInput.value,
      email: emailInput.value,
      firstName: firstNameInput.value,
      lastName: lastNameInput.value
    }
  });

  const handleSignUp = async () => {
    const { value: email } = emailInput;
    const regxEmail = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    if (!regxEmail.test(email)) return Alert.alert("Email is NOT valid");

    const { value: firstName } = firstNameInput;
    const { value: lastName } = lastNameInput;
    const { value: userName } = userNameInput;

    if (firstName === "" || lastName === "")
      return Alert.alert("Invalid First/Last Name");

    if (userName === "") return Alert.alert("Invalid User Name");

    setLoading(true);
    try {
      const { data } = await createAccountMutation();
      const { createAccount } = data;

      console.log("createAccount", createAccount);

      if (createAccount) {
        Alert.alert("Account created, login now");
        navigation.navigate("LogIn", { email });
      } else {
        Alert.alert("Can't create account");
      }
    } catch (error) {
      // console.error(error);
      Alert.alert("The username already exists");
      navigation.navigate("LogIn", { email: email });
    } finally {
      setLoading(false);
    }
  };

  const fbLogin = async () => {
    setLoading(true);
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions
      } = await Facebook.logInWithReadPermissionsAsync("567892807371467", {
        permissions: ["public_profile", "email"]
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=email,first_name,last_name`
        );

        const data = await response.json();
        console.log(data);

        emailInput.setValue(data.email);
        firstNameInput.setValue(data.first_name);
        lastNameInput.setValue(data.last_name);
        userNameInput.setValue(data.email.split("@")[0]);

        // Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
        Alert.alert(`Facebook Login Error`);
      }
    } catch ({ message }) {
      Alert.alert(`Facebook Login Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...firstNameInput}
          placeholder="First Name"
          autoCapitalize="words"
        />
        <AuthInput
          {...lastNameInput}
          placeholder="Last Name"
          autoCapitalize="words"
        />
        <AuthInput
          {...emailInput}
          keyboardType="email-address"
          placeholder="Email"
          returnKeyType="send"
        />
        <AuthInput
          {...userNameInput}
          placeholder="UsreName"
          returnKeyType="send"
        />
        <AuthButton text="SignUp" onPress={handleSignUp} loading={loading} />
        <FBContainer>
          <AuthButton
            bgColor="#2D4DA7"
            loading={false}
            text="Connect Facebook"
            onPress={fbLogin}
          ></AuthButton>
        </FBContainer>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;
