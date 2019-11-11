import React from "react";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";

const NavIcon = ({ name, color, size = 25 }) => (
  <Ionicons name={name} color={color} size={size} />
);

NavIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number
};

export default NavIcon;
