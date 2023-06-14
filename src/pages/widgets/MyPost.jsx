import React, { useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  PollOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const [pollOptions, setPollOptions] = useState([{ text: "" }]);
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();
  const location = useLocation();
  const primaryLight = palette.primary.light;
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    if (!_id || !token) {
      console.error("userId or token is undefined");
      return;
    }
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }
    const validPollOptions = pollOptions.filter((option) => option.text.trim() !== "");
    if (validPollOptions.length > 0) {
      formData.append("poll", JSON.stringify({ options: validPollOptions }));
    }

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const postResponse = await response.json();
    dispatch({ type: "ADD_POST", payload: { post: postResponse } });
    setImage(null);
    setPost("");
    setPollOptions([{ text: "" }]);
  };

  let pageTitle;
  if (location.pathname.includes("/profile")) {
    pageTitle = "Profile";
  } else {
    switch (location.pathname) {
      case "/home":
        pageTitle = "Home";
        break;
      default:
        pageTitle = "";
    }
  }

  return (
    <WidgetWrapper>
      <FlexBetween padding="1rem">
        <FlexBetween gap="1rem" alignItems="center">
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/assets/Logo.png`}
            alt="Logo"
            style={{ height: "3rem", width: "auto" }}
          />
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 1.8vw, 3rem)"
            color="primary"
            onClick={() => navigate("/home")}
            sx={{
              display: "flex",
              alignItems: "center",
              "&:hover": {
                color: primaryLight,
                cursor: "pointer",
              },
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            LaidBack
          </Typography>
        </FlexBetween>
        <Typography
          fontSize="clamp(1rem, 1.8vw, 3rem)"
          color="primary"
          sx={{ marginLeft: "1rem", overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {pageTitle}
        </Typography>
      </FlexBetween>
      <Divider sx={{ margin: "1rem 0" }} />
      <FlexBetween gap="1rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What is happening?.."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Import </p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}
      {pollOptions.map((option, index) => (
        <Box
          key={index}
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <FlexBetween>
            <PollOutlined sx={{ color: mediumMain }} />
            <InputBase
              placeholder="Poll option"
              value={option.text}
              onChange={(e) => {
                const updatedOptions = [...pollOptions];
                updatedOptions[index].text = e.target.value;
                setPollOptions(updatedOptions);
              }}
              sx={{ width: "100%", marginLeft: "0.5rem" }}
            />
          </FlexBetween>
          <IconButton
            onClick={() =>
              setPollOptions((prevOptions) =>
                prevOptions.filter((_, i) => i !== index)
              )
            }
            sx={{ width: "15%" }}
          >
            <DeleteOutlined />
          </IconButton>
        </Box>
      ))}
      <Divider sx={{ margin: "1rem 0" }} />
      <FlexBetween>
        <FlexBetween gap="0.5rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Media
          </Typography>
        </FlexBetween>
        <FlexBetween
          gap="0.25rem"
          onClick={() => setPollOptions([...pollOptions, { text: "" }])}
        >
          <PollOutlined sx={{ color: mediumMain }} />
          <Typography color={mediumMain}>Poll</Typography>
        </FlexBetween>
        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>GIFs</Typography>
            </FlexBetween>
            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}
        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: "white",
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
            fontWeight: "bold",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;