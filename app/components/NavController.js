import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useIsLoggedIn, useLogIn, useLogOut } from "../AuthContext";

export default () => {
  const isLoggedIn = useIsLoggedIn();
  const logUserIn = useLogIn();
  const logUserOut = useLogOut();

  console.log("NavController.js", "default()", "isLoggedIn", isLoggedIn);
  console.log("NavController.js", "default()", "logUserIn", logUserIn);
  console.log("NavController.js", "default()", "logUserOut", logUserOut);

  return (
    <View
      style={{
        marginTop: 100,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {isLoggedIn === true ? (
        <TouchableOpacity onPress={logUserOut}>
          <Text>Log Out {Date(Date.now()).toString()}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={logUserIn}>
          <Text>Log In {Date(Date.now()).toString()}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
