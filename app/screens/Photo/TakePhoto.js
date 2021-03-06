import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import Loader from "../../components/Loader";
import constants from "../../constants";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "@unimodules/core";
import styles from "../../styles";
import * as MediaLibrary from "expo-media-library";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.View``;

const Button = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border: 10px solid ${styles.lightGreyColor};
`;

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

  const [canTakePhoto, setCanTakePhoto] = useState(true);
  const refCamera = useRef();
  const takePhoto = async () => {
    if (!canTakePhoto) return;

    try {
      setCanTakePhoto(false);

      const photo = await refCamera.current.takePictureAsync({
        quality: 1,
        exif: true // too much
      });

      console.log(photo);
      const asset = await MediaLibrary.createAssetAsync(photo.uri);
      navigation.navigate("Upload", { photo: asset });
    } catch (error) {
      console.error(error);
      setCanTakePhoto(true);
    }
  };

  return (
    <View>
      {loading && <Loader />}
      {!loading && hasPermission && (
        <>
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
          <View>
            <TouchableOpacity onPress={takePhoto} disabled={!canTakePhoto}>
              <Button />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default TakePhoto;
