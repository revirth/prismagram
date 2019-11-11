import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { View, Platform } from "react-native";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Notification from "../screens/Notification";
import Profile from "../screens/Profile";
import { createStackNavigator } from "react-navigation-stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import MessagesLink from "../components/MessagesLink";
import NavIcon from "../components/NavIcons";

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator(
    {
      initialRoute: {
        screen: initialRoute,
        navigationOptions: { ...customConfig }
      }
    },
    {
      headerLayoutPreset: "center"
    }
  );

const TabNavigation = createBottomTabNavigator(
  {
    Home: {
      screen: stackFactory(Home, {
        headerRight: <MessagesLink />,
        headerTitle: <NavIcon name="logo-instagram" size={40} />
      }),
      navigationOptions: {
        tabBarIcon: (
          <NavIcon name={Platform.OS === "ios" ? "ios-home" : "md-home"} />
        )
      }
    },
    Search: {
      screen: stackFactory(Search, { title: "Search" }),
      navigationOptions: {
        tabBarIcon: (
          <NavIcon name={Platform.OS === "ios" ? "ios-search" : "md-search"} />
        )
      }
    },
    Add: {
      screen: View,
      navigationOptions: {
        tabBarOnPress: ({ navigation }) =>
          navigation.navigate("PhotoNavigation"),
        tabBarIcon: (
          <NavIcon name={Platform.OS === "ios" ? "ios-add" : "md-add"} />
        )
      }
    },
    Notification: {
      screen: stackFactory(Notification, { title: "Notification" }),
      navigationOptions: {
        tabBarIcon: (
          <NavIcon name={Platform.OS === "ios" ? "ios-heart" : "md-heart"} />
        )
      }
    },
    Profile: {
      screen: stackFactory(Profile, { title: "Profile" }),
      navigationOptions: {
        tabBarIcon: (
          <NavIcon name={Platform.OS === "ios" ? "ios-person" : "md-person"} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false
    }
  }
);

export default TabNavigation;
