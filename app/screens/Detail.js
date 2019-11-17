import React from "react";
import styled from "styled-components";

const View = styled.View``;

const Text = styled.Text``;

export default ({ navigation }) => (
  <View>
    <Text>PostId : {navigation.getParam("id")}</Text>
  </View>
);
