import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import { indigo } from "@mui/material/colors";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box
      style={{
        backgroundColor: indigo[100],
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(http://localhost:1001/assets/post9.jpg)`,
        backgroundSize: "cover",
        backgroundPositionX: isNonMobileScreens ? "center" : "left",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="background-animation" />
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.paper}
        position="relative"
        zIndex={1}
      >
        <Typography
          fontWeight="500"
          variant="h5"
          sx={{ mb: "1.5rem", display: "flex", alignItems: "center" }}
        >
          <img
            src="http://localhost:1001/assets/Logo.png"
            alt="Logo"
            style={{ marginRight: "0.5rem", height: "3rem", width: "auto" }}
          />
          Now that you're here, just sit back and relax
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;