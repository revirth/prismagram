import React, { useState } from "react";
import { Alert, Image, ActivityIndicator } from "react-native";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import styles from "../../styles";
import axios from "axios";
import constants from "../../constants";
import apolloClientOptions from "../../apollo";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";

const UPLOAD_POST = gql`
  mutation uploadPost(
    $caption: String!
    $files: [String!]!
    $location: String
  ) {
    uploadPost(caption: $caption, files: $files, location: $location) {
      id
    }
  }
`;

const View = styled.View`
  flex: 1;
`;

const Text = styled.Text``;

const Container = styled.View`
  padding: 20px;
  flex-direction: row;
`;

const Form = styled.View`
  justify-content: flex-start;
`;

const STextInput = styled.TextInput`
  margin-bottom: 10px;
  border: 0px solid ${styles.lightGreyColor};
  border-bottom-width: 1px;
  padding-bottom: 10px;
  width: ${constants.width - 180};
`;

const Button = styled.TouchableOpacity`
  background-color: ${props => props.theme.blueColor};
  padding: 10px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

const UploadPhoto = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const input_Caption = useInput("caption1");
  const inputLocation = useInput("locaiton1");
  const photo = navigation.getParam("photo");

  const [uploadPostMutation] = useMutation(UPLOAD_POST, {
    variables: {
      caption: input_Caption.value,
      location: inputLocation.value
    }
  });

  const handleSubmit = async () => {
    if (input_Caption.value === "" || inputLocation.value === "") {
      Alert.alert("All fields are required");
      return;
    }

    const formData = new FormData();

    formData.append("photo", {
      name: photo.filename,
      type: "image/jpeg",
      uri: photo.uri // TODO: test with real phone
    });

    try {
      setLoading(true);

      // Upload to Imgur
      const {
        data: { link }
      } = await axios.post(`${apolloClientOptions.uri}/api/upload`, formData, {
        "Content-Type": "multipart/form-data"
      });
      console.log(link);

      // Upload to the server
      const {
        data: { uploadPost }
      } = await uploadPostMutation({ variables: { files: [link] } }); // add files parameter
      console.log(uploadPost);

      navigation.navigate("TabNavigation");
    } catch (error) {
      console.log(error);
      Alert.alert("Can't upload the photo", "Try later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Container>
        <Image
          source={{ uri: photo.uri }}
          style={{ height: 80, width: 80, marginRight: 30 }}
        />
        <Form>
          <STextInput
            onChangeText={input_Caption.onChange}
            value={input_Caption.value}
            multiline={true}
            placeHolder="Caption"
            placeHolderTextColor={styles.darkGreyColor}
          />
          <STextInput
            onChangeText={inputLocation.onChange}
            value={inputLocation.value}
            multiline={true}
            placeHolder="Location"
            placeHolderTextColor={styles.darkGreyColor}
          />
          <Button onPress={handleSubmit}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text>Upload</Text>
            )}
          </Button>
        </Form>
      </Container>
      <Text>{navigation.getParam("photo").uri}</Text>
    </View>
  );
};

export default UploadPhoto;
