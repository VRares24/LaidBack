import { Typography, useTheme, List, ListItem, ListItemText } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";

const EventsWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;

  // Un set de date exemplu pentru evenimente
  const upcomingEvents = [
    { title: "Examen de Licență", date: "27 Iunie, 2023" },
    { title: "Zi de naștere", date: "9 iulie, 2023" },
    { title: "Zi importanta", date: "15 Iulie, 2023" },
  ];

  return (
    <WidgetWrapper>
      <Typography color={dark} variant="h5" fontWeight="500">
        Future Events
      </Typography>
      <List>
        {upcomingEvents.map((event, index) => (
          <ListItem key={index}>
            <ListItemText 
              primary={event.title} 
              secondary={event.date}
              primaryTypographyProps={{ color: dark }}
              secondaryTypographyProps={{ color: main }}
            />
          </ListItem>
        ))}
      </List>
    </WidgetWrapper>
  );
};

export default EventsWidget;