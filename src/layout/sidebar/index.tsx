import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import React, { forwardRef } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useLocation, Link } from "react-router-dom";
import { SIDE_BAR_ITEMS } from "./sidebar.constants";
import { DRAWER_WIDTH } from "utils/constants";

const Sidebar = () => {
  const theme = useTheme();
  const location = useLocation();

  const drawer = (
    <div>
      <PerfectScrollbar
        component="div"
        style={{
          paddingLeft: "16px",
          paddingRight: "16px",
          height: "calc(100vh - 88px)",
        }}
      >
        <List sx={{ paddingTop: 0 }}>
          {SIDE_BAR_ITEMS.map((item) => {
            let listItemProps = {
              component: forwardRef((props, ref) => (
                //@ts-ignore
                <Link ref={ref} {...props} to={item.url} target={"_self"} />
              )),
            };
            const isSelected = location.pathname.indexOf(item.url) > -1;
            return (
              <React.Fragment key={item.id}>
                <ListItemButton
                  sx={{
                    mb: 0.5,
                    py: 1.25,
                    pl: "24px",
                    borderRadius: "12px",
                    alignItems: "flex-start",
                    backgroundColor: "inherit",
                  }}
                  selected={isSelected}
                  {...listItemProps}
                >
                  <ListItemIcon sx={{ my: "auto", minWidth: 36 }}>
                    <img
                      src={item.imgURL}
                      height={24}
                      width={24}
                      alt={"side-bar-icon"}
                      className={isSelected ? "secondary-main-tint" : ""}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant={isSelected ? "h5" : "body1"}
                        color="inherit"
                      >
                        {item.title}
                      </Typography>
                    }
                  />
                </ListItemButton>
                <Divider sx={{ mt: 0.25, mb: 0.25 }} />
              </React.Fragment>
            );
          })}
        </List>
      </PerfectScrollbar>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ flexShrink: { md: 0 }, width: DRAWER_WIDTH }}
      aria-label="mailbox folders"
    >
      <Drawer
        open={true}
        anchor={"left"}
        variant={"persistent"}
        sx={{
          "& .MuiDrawer-paper": {
            top: "88px",
            width: DRAWER_WIDTH,
            borderRight: "none",
            color: theme.palette.text.primary,
            background: theme.palette.background.default,
          },
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
