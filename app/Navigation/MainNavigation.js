import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import TabNavigation from "./TabNavigation";
import PhotoNavigation from "../Navigation/PhotoNavigation";

const MainNavigation = createStackNavigator(
  {
    TabNavigation,
    PhotoNavigation
  },
  {
    headerMode: "none",
    mode: "modal"
  }
);

export default createAppContainer(MainNavigation);
