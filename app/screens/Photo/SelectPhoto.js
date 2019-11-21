import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Image } from "react-native";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import Loader from "../../components/Loader";
import constants from "../../constants";
import { ScrollView } from "react-native-gesture-handler";

const View = styled.View`
  flex: 1;
`;

const Text = styled.Text``;

const SelectPhoto = () => {
  const [loading, setloading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [selected, setSelected] = useState();
  const [allPhotos, setallPhotos] = useState();

  const getPhotos = async () => {
    try {
      // const { assets } = await MediaLibrary.getAssetsAsync();

      // in android emulator, I don't have any photos
      const assets = [
        { id: 1, uri: `https://placekitten.com/300/300` },
        { id: 2, uri: `https://placekitten.com/400/400` },
        { id: 3, uri: `https://placekitten.com/500/500` },
        { id: 4, uri: `https://placekitten.com/600/600` },
        { id: 5, uri: `https://placekitten.com/700/700` }
      ];
      const [firstPhoto] = assets;
      // TODO : check in real phone

      setSelected(firstPhoto);
      setallPhotos(assets);
    } catch (error) {
      console.error("getPhotos error", error);
    } finally {
      setloading(false);
    }
  };

  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status === "granted") {
        setHasPermission(true);
        getPhotos();
      }
    } catch (error) {
      console.log("getPermission", error);
      hasPermission(false);
    } finally {
    }
  };

  useEffect(() => {
    askPermission();
  }, [hasPermission]);

  return (
    <View>
      {loading && <Loader />}
      {!loading && (
        <View>
          {hasPermission ? (
            <Image
              style={{ width: constants.width, height: constants.height / 2 }}
              source={{ uri: selected.uri }}
            />
          ) : (
            "rejected"
          )}
          <ScrollView contentContainerStyle={{ flexDirection: "row" }}>
            {allPhotos.map(photo => (
              <Image
                key={photo.id}
                style={{
                  width: constants.width / 3,
                  height: constants.width / 3
                }}
                source={{ uri: photo.uri }}
              />
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default SelectPhoto;
