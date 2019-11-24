import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SignUp from "../screens/Auth/SignUp";
import Confirm from "../screens/Auth/Confirm";
import LogIn from "../screens/Auth/LogIn";
import AuthHome from "../screens/Auth/AuthHome";

const AuthNavigation = createStackNavigator(
  {
    SignUp,
    Confirm,
    LogIn,
    AuthHome
  },
  {
    initialRouteName: "AuthHome",
    headerMode: "none"
  }
);

export default createAppContainer(AuthNavigation);
