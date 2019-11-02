import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useIsLoggedIn, useLogIn, useLogOut } from "../AuthContext";
import AuthNavigation from "../Navigation/AuthNavigation";

export default () => {
  const isLoggedIn = useIsLoggedIn();
  const logUserIn = useLogIn();
  const logUserOut = useLogOut();

  console.log("NavController.js", "default()", "isLoggedIn", isLoggedIn);
  console.log("NavController.js", "default()", "logUserIn", logUserIn);
  console.log("NavController.js", "default()", "logUserOut", logUserOut);

  return (
    <View style={{ flex: 1 }}>
      {/* {isLoggedIn === true ? (
        <TouchableOpacity onPress={logUserOut}>
          <Text>Log Out {Date(Date.now()).toString()}</Text>
        </TouchableOpacity>
      ) : ( */}
      <AuthNavigation />
      {/* )} */}
    </View>
  );
};
