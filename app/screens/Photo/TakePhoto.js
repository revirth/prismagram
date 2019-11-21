import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import Loader from "../../components/Loader";
import constants from "../../constants";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "@unimodules/core";
import styles from "../../styles";

const View = styled.View`
  flex: 1;
`;

const Text = styled.Text``;

const TakePhoto = ({ navigation }) => {
  const [loading, setloading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);

      console.log("askPermission", status);

      if (status === "granted") {
        setHasPermission(true);
      }
    } catch (error) {
      console.log("askPermission", error);
      hasPermission(false);
    } finally {
    }
  };

  useEffect(() => {
    askPermission();
  }, []);

  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const toggleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  return (
    <View>
      {loading && <Loader />}
      {!loading && hasPermission && (
        <Camera
          type={cameraType}
          style={{
            width: constants.width,
            height: constants.height / 2,
            justifyContent: "flex-end",
            padding: 10
          }}
        >
          <TouchableOpacity onPress={toggleCameraType}>
            <Ionicons
              name={
                Platform.OS === "ios"
                  ? "ios-reverse-camera"
                  : "md-reverse-camera"
              }
              size="28"
              color={styles.blackColor}
            />
          </TouchableOpacity>
        </Camera>
      )}
    </View>
  );
};

export default TakePhoto;
