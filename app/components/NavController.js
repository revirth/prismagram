import React from "react";
import { View } from "react-native";
import { useIsLoggedIn, useLogIn, useLogOut } from "../AuthContext";
import AuthNavigation from "../Navigation/AuthNavigation";
import MainNavigation from "../Navigation/MainNavigation";

export default () => {
  const isLoggedIn = true; //useIsLoggedIn();
  // const logUserIn = useLogIn();
  // const logUserOut = useLogOut();

  console.log("NavController.js", "default()", "isLoggedIn", isLoggedIn);
  // console.log("NavController.js", "default()", "logUserIn", logUserIn);
  // console.log("NavController.js", "default()", "logUserOut", logUserOut);

  return (
    <View style={{ flex: 1 }}>
      {isLoggedIn ? <MainNavigation /> : <AuthNavigation />}
    </View>
  );
};
