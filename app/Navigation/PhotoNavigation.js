import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import { stackStyles } from "./config";
import styles from "../styles";

const PhotoTab = createMaterialTopTabNavigator(
  {
    Select: {
      screen: SelectPhoto,
      navigationOptions: { tabBarLabel: "Select" }
    },
    Take: { screen: TakePhoto, navigationOptions: { tabBarLabel: "Take" } }
  },
  {
    tabBarPosition: "bottom",
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: styles.blackColor,
        marginBottom: 3
      },
      labelStyle: {
        color: styles.blackColor,
        fontWeight: "600"
      },
      style: { ...stackStyles }
    }
  }
);

const PhotoNavigation = createStackNavigator(
  {
    Tabs: {
      screen: PhotoTab,
      navigationOptions: {
        header: null
      }
    },
    UploadPhoto
  },
  {
    defaultNavigationOptions: {
      headerSyle: { ...stackStyles }
    }
  }
);

export default PhotoNavigation;
