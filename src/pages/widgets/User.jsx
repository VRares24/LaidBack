import React, { useState, useEffect } from "react";
import {
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  Facebook,
  Link,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Logout,
  Search,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Divider,
  useTheme,
  IconButton,
  Tooltip,
  InputBase,
} from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector, useDispatch } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(`http://localhost:1001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  const handleSearchInputChange = async (event) => {
    setSearchValue(event.target.value);
    await searchUsers(event.target.value);
  };

  const searchUsers = async (value) => {
    if (value === "") {
      setSearchResults([]);
      return;
    }
    try {
      const { data } = await axios.get(
        `http://localhost:1001/search?query=${value}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSearchResults(data.users); // Setează rezultatele căutării în variabila "searchResults"
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    friends,
  } = user;

  const messages = "Nu ai niciun mesaj";
  const notifications =
    "Cainele catel ti-a fost recomandat in lista de prieteni";

  const handleLogout = () => {
    dispatch(setLogout());
  };

  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <WidgetWrapper className="user-widget">
      {/* Search bar */}
      <Box
        display="flex"
        alignItems="center"
        backgroundColor={palette.neutral.light}
        borderRadius="9px"
        gap="1rem"
        padding="0.1rem 1.5rem"
      >
        <InputBase
          placeholder="Search..."
          value={searchValue}
          onChange={handleSearchInputChange}
        />
        <IconButton>
          <Search />
        </IconButton>
      </Box>
      {searchResults.map((user) => (
        <div
          key={user._id}
          onClick={() => handleUserClick(user._id)}
          style={{ cursor: "pointer" }}
        >
          {user.firstName} {user.lastName}
        </div>
      ))}
      <Box p="1rem 0">
        <FlexBetween gap="1rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <Tooltip title={messages}>
            <IconButton>
              <Message sx={{ fontSize: "25px" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title={notifications}>
            <IconButton>
              <Notifications sx={{ fontSize: "25px" }} />
            </IconButton>
          </Tooltip>
          <IconButton onClick={handleLogout}>
            <Logout />
          </IconButton>
        </FlexBetween>
      </Box>

      {/* Linie separată între search bar și primul rând */}
      <Divider sx={{ backgroundColor: "blueviolet" }} />
      <Box marginTop="1rem">
        {/* Restul codului */}
      </Box>
      {/* Primul rând */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => handleUserClick(userId)}
        style={{ cursor: "pointer" }}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
      </FlexBetween>

      <Divider sx={{ backgroundColor: "blueviolet" }} />

      {/* Al Doilea rând */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider sx={{ backgroundColor: "blueviolet" }} />

      {/* Al Treilea rând */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Things I Like
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <Link sx={{ color: main }} />
            <Box>
              <a
                href={user.favoriteSong?.spotifyLink}
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none", color: main }}
              >
                <Typography color={main} fontWeight="500">
                  Favorite song: {user.favoriteSong?.name}
                </Typography>
              </a>
              <Typography color={medium}>Music</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
      <Divider sx={{ backgroundColor: "blueviolet" }} />

      {/* Al Patrulea rând - Sisteme și opțiuni */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Other Accounts
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <Facebook sx={{ color: main }} />
            <Box>
              <Typography color={main} fontWeight="500">
                Facebook
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;