import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { View, Platform } from "react-native";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Notification from "../screens/Notification";
import Profile from "../screens/Profile";
import Detail from "../screens/Detail";
import UserDetail from "../screens/UserDetail";
import { createStackNavigator } from "react-navigation-stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import MessagesLink from "../components/MessagesLink";
import NavIcon from "../components/NavIcons";
import { stackStyles } from "./config";
import styles from "../styles";

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator(
    {
      initialRoute: {
        screen: initialRoute,
        navigationOptions: {
          ...customConfig
        }
      },
      Detail: {
        screen: Detail,
        navigationOptions: {
          title: "Photo"
        }
      },
      UserDetail: {
        screen: UserDetail,
        navigationOptions: ({ navigation }) => ({
          title: navigation.getParam("userName")
        })
      }
    },
    {
      defaultNavigationOptions: {
        headerBackTitle: null,
        headerTintColor: styles.blackColor,
        headerStyle: { ...stackStyles }
      },
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
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            size={28}
            name={Platform.OS === "ios" ? "ios-home" : "md-home"}
          />
        )
      }
    },
    Search: {
      screen: stackFactory(Search, { headerBackTitle: null }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            size={28}
            name={Platform.OS === "ios" ? "ios-search" : "md-search"}
          />
        )
      }
    },
    Add: {
      screen: View,
      navigationOptions: {
        tabBarOnPress: ({ navigation }) =>
          navigation.navigate("PhotoNavigation"),
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            size={28}
            name={Platform.OS === "ios" ? "ios-add" : "md-add"}
          />
        )
      }
    },
    Notification: {
      screen: stackFactory(Notification, { title: "Notification" }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            size={28}
            name={
              Platform.OS === "ios"
                ? `ios-heart${focused ? "" : "-empty"}`
                : `md-heart${focused ? "" : "-empty"}`
            }
          />
        )
      }
    },
    Profile: {
      screen: stackFactory(Profile, { title: "Profile" }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            size={28}
            name={Platform.OS === "ios" ? "ios-person" : "md-person"}
          />
        )
      }
    }
  },
  {
    initialRouteName: "Profile",
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: "#FAFAFA"
      }
    }
  }
);

export default TabNavigation;
