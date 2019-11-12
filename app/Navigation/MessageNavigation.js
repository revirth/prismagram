import { createStackNavigator } from "react-navigation-stack";
import Message from "../screens/Messages/Message";
import Messages from "../screens/Messages/Messages";
import { stackStyles } from "./config";

const MessageNavigation = createStackNavigator(
  {
    Messages,
    Message
  },
  {
    defaultNavigationOptions: {
      headerSyle: { ...stackStyles }
    }
  }
);

export default MessageNavigation;
