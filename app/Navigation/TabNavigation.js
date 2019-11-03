import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { View, Text } from "react-native";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Notification from "../screens/Notification";
import Profile from "../screens/Profile";
import { createStackNavigator } from "react-navigation-stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import MessagesLink from "../components/MessagesLink";

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator({
    initialRoute: {
      screen: initialRoute,
      navigationOptions: { ...customConfig }
    }
  });

const TabNavigation = createBottomTabNavigator({
  Home: {
    screen: stackFactory(Home, {
      title: "Home",
      headerRight: <MessagesLink />
    })
  },
  Search: {
    screen: stackFactory(Search, { title: "Search" })
  },
  Add: {
    screen: View,
    navigationOptions: {
      tabBarOnPress: ({ navigation }) => navigation.navigate("PhotoNavigation")
    }
  },
  Notification: {
    screen: stackFactory(Notification, { title: "Notification" })
  },
  Profile: {
    screen: stackFactory(Profile, { title: "Profile" })
  }
});

export default TabNavigation;
