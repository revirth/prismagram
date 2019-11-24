import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Image } from "react-native";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import Loader from "../../components/Loader";
import constants from "../../constants";
import { ScrollView, TouchableOpacity } from "react-native";
import styles from "../../styles";
import { NavigationEvents } from "react-navigation";

const View = styled.View`
  flex: 1;
`;

const Text = styled.Text`
  color: white;
  font-weight: 600;
`;

const Button = styled.TouchableOpacity`
  width: 100px;
  height: 30px;
  position: absolute;
  right: 5px;
  top: 15px;
  background-color: ${styles.blueColor};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const SelectPhoto = ({ navigation }) => {
  const [loading, setloading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [selected, setSelected] = useState(); // TODO: multiple select
  const [allPhotos, setAllPhotos] = useState();

  const getPhotos = async () => {
    try {
      // const { assets } = await MediaLibrary.getAssetsAsync();

      // in android emulator, I don't have any photos
      const assets = [
        {
          id: 1,
          uri: `http://placekitten.com/300/300`,
          filename: "kitty1.png"
        },
        {
          id: 2,
          uri: `http://placekitten.com/400/400`,
          filename: "kitty2.png"
        },
        {
          id: 3,
          uri: `http://placekitten.com/500/500`,
          filename: "kitty3.png"
        },
        {
          id: 4,
          uri: `http://placekitten.com/600/600`,
          filename: "kitty4.png"
        },
        { id: 5, uri: `http://placekitten.com/700/700`, filename: "kitty5.png" }
      ];
      const [firstPhoto] = assets;
      // TODO : check in real phone

      setSelected(firstPhoto);
      setAllPhotos(assets);
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
      setHasPermission(false);
    } finally {
    }
  };

  useEffect(() => {
    askPermission();
  }, []);

  const changeSelected = photo => {
    setSelected(photo);
  };

  const handleSelected = () => {
    navigation.navigate("Upload", { photo: selected });
  };

  return (
    <View>
      {loading && <Loader />}
      {!loading && (
        <View>
          {hasPermission ? (
            <>
              <Image
                style={{ width: constants.width, height: constants.height / 2 }}
                source={{ uri: selected.uri }}
              />

              <Button onPress={handleSelected}>
                <Text>Select Photo</Text>
              </Button>
            </>
          ) : (
            "rejected"
          )}
          <ScrollView
            contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
          >
            {allPhotos.map(photo => (
              <TouchableOpacity
                key={photo.id}
                onPress={() => changeSelected(photo)}
              >
                <Image
                  style={{
                    width: constants.width / 3,
                    height: constants.width / 3,
                    opacity: photo.id === selected.id ? 0.5 : 1
                  }}
                  source={{ uri: photo.uri }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default SelectPhoto;
