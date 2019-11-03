import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import TabNavigation from "./TabNavigation";
import PhotoNavigation from "../Navigation/PhotoNavigation";
import MessageNavigation from "../Navigation/MessageNavigation";

const MainNavigation = createStackNavigator(
  {
    TabNavigation,
    PhotoNavigation,
    MessageNavigation
  },
  {
    headerMode: "none",
    mode: "modal"
  }
);

export default createAppContainer(MainNavigation);
