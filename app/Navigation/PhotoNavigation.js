import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import { stackStyles } from "./config";

const PhotoTab = createMaterialTopTabNavigator(
  {
    SelectPhoto,
    TakePhoto
  },
  {
    tabBarPosition: "bottom"
  }
);

const PhotoNavigation = createStackNavigator(
  {
    PhotoNavigation: PhotoTab,
    UploadPhoto
  },
  {
    defaultNavigationOptions: {
      headerSyle: { ...stackStyles }
    }
  }
);

export default PhotoNavigation;
