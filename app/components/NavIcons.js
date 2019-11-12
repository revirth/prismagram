import React from "react";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import styles from "../styles";

const NavIcon = ({
  color = styles.blackColor,
  focused = true,
  name,
  size = 25
}) => (
  <Ionicons
    name={name}
    color={focused ? color : styles.darkGreyColor}
    size={size}
  />
);

NavIcon.propTypes = {
  color: PropTypes.string,
  focused: PropTypes.bool,
  name: PropTypes.string.isRequired,
  size: PropTypes.number
};

export default NavIcon;
