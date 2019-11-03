import { createStackNavigator } from "react-navigation-stack";
import Message from "../screens/Messages/Message";
import Messages from "../screens/Messages/Messages";

const MessageNavigation = createStackNavigator({
  Messages,
  Message
});

export default MessageNavigation;
