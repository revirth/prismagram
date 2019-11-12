import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import TabNavigation from "./TabNavigation";
import PhotoNavigation from "../Navigation/PhotoNavigation";
import MessageNavigation from "../Navigation/MessageNavigation";
import { stackStyles } from "./config";

const MainNavigation = createStackNavigator(
  {
    TabNavigation,
    PhotoNavigation,
    MessageNavigation
  },
  {
    headerMode: "none",
    mode: "modal",
    defaultNavigationOptions: {
      headerSyle: { ...stackStyles }
    }
  }
);

export default createAppContainer(MainNavigation);
