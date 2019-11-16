import React from "react";
import { TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import constants from "../constants";

const SquarePhoto = ({ files, id, likeCount }) => (
  <TouchableOpacity>
    <Image
      source={{ uri: files[0].url }}
      style={{ width: constants.width / 3, height: constants.height / 6 }}
    />
  </TouchableOpacity>
);

SquarePhoto.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  id: PropTypes.string.isRequired,
  likeCount: PropTypes.number
};

export default SquarePhoto;
