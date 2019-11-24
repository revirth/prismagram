import React, { useState } from "react";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CONFIRM_SECRET } from "./AuthQueries";
import { useLogIn } from "../../AuthContext";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

const Confirm = ({ navigation }) => {
  const confirmInput = useInput("");
  const [loading, setLoading] = useState(false);
  const logIn = useLogIn();

  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      email: navigation.getParam("email"),
      secret: confirmInput.value
    }
  });

  const handleConfirm = async () => {
    const { value } = confirmInput;

    if (value === "" || !value.includes("-")) {
      return Alert.alert("Invalid secret");
    }

    setLoading(true);

    try {
      const { data } = await confirmSecretMutation();
      const { confirmSecret: token } = data;

      console.log(token);

      if (token !== "" && token !== undefined) {
        logIn(token);
        // navigation.navigate("Home");
      } else {
        Alert.alert("Can't confirm the secret");
      }
    } catch (error) {
      Alert.alert(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...confirmInput}
          autoCorrect={false}
          placeholder="Secret"
          returnKeyType="send"
          onSubmitEditing={handleConfirm}
        />
        <AuthButton text="Confirm" onPress={handleConfirm} loading={loading} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Confirm;
