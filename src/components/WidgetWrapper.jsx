import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/system";
import { Box } from "@mui/material";

const CustomWidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1rem",
  border: "2px solid blueviolet",
  borderRadius: "5px",
  backgroundColor: theme.palette.mode === 'light' ? '#e9e1f4' : 'inherit', // adăugăm această linie
}));

const WidgetWrapper = ({ children }) => {
  return <CustomWidgetWrapper>{children}</CustomWidgetWrapper>;
};

WidgetWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WidgetWrapper;