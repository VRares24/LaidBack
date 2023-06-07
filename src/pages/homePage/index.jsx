import { Box, useMediaQuery, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import UserWidget from "pages/widgets/User";
import MyPostWidget from "pages/widgets/MyPost";
import PostsWidget from "pages/widgets/Posts";
import EventsWidget from "pages/widgets/Events";
import FriendListWidget from "pages/widgets/FriendList";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Box
        width="100%"
        padding="1rem 6%"
      >
        <Grid 
          container
          direction="row"
          justifyContent="space-between"
          spacing={2}
        >
          <Grid item xs={12} md={3}>
            <UserWidget userId={_id} picturePath={picturePath} />
          </Grid>
          <Grid item xs={12} md={6}>
            <MyPostWidget picturePath={picturePath} />
            <PostsWidget userId={_id} />
          </Grid>
          {isNonMobileScreens && (
            <Grid item xs={12} md={3}>
              <EventsWidget />
              <Box m="2rem 0" />
              <FriendListWidget userId={_id} />
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;