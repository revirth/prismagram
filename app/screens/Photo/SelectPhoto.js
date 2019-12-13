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

const NextButton = styled.TouchableOpacity`
  width: 150px;
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
  const [bigPhoto, setBigPhoto] = useState();
  const [selected, setSelected] = useState([]);
  const [allPhotos, setAllPhotos] = useState();

  const getPhotos = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync();
      const [firstPhoto] = assets;

      setBigPhoto(firstPhoto);
      setSelected([firstPhoto]);
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
    const idx = selected.findIndex(p => p.id === photo.id);
    const arr =
      idx > -1 ? selected.filter(p => p.id !== photo.id) : [...selected, photo];

    console.log(`\n\n${new Date()}`, idx, arr);

    setBigPhoto(photo);

    if (arr.length === 0) return;

    setSelected(arr);

    //TODO: scroll to the selected photo
  };

  const onPressNext = () => {
    console.log("Upload", selected);

    navigation.navigate("Upload", { photos: selected });
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
                source={{ uri: bigPhoto.uri }}
              />

              <NextButton onPress={onPressNext}>
                <Text>
                  Select {selected.length} Photo{selected.length > 1 ? "s" : ""}
                </Text>
              </NextButton>
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
                    opacity: selected.find(p => p.id === photo.id) ? 0.5 : 1
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
