import { createBottomTabNavigator } from "react-navigation-tabs";
import { View } from "react-native";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Notification from "../screens/Notification";
import Profile from "../screens/Profile";

const TabNavigation = createBottomTabNavigator({
  Home,
  Search,
  Add: {
    screen: View,
    navigationOptions: {
      tabBarOnPress: () => {
        console.log("Add");
      }
    }
  },
  Notification,
  Profile
});

export default TabNavigation;
