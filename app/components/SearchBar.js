import React from "react";
import { TextInput } from "react-native";
import PropTypes from "prop-types";
import constants from "../constants";
import styles from "../styles";

const SearchBar = ({ onChange, value, onSubmit }) => (
  <TextInput
    onChangeText={onChange}
    onEndEditing={onSubmit}
    placeholder="Search"
    placeholderTextColor={styles.darkGreyColor}
    returnKeyType="search"
    style={{
      width: constants.width - 40,
      height: 35,
      backgroundColor: styles.lightGreyColor,
      padding: 10,
      borderRadius: 10,
      textAlign: "center",
      marginLeft: 20,
      fontSize: 11
    }}
    value={value}
  />
);

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default SearchBar;
