import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import TabNavigation from "./TabNavigation";

const MainNavigation = createStackNavigator({
  TabNavigation
});

export default createAppContainer(MainNavigation);
