import { useState, useRef, useEffect } from "react";

import { useNavigate } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Card,
  Chip,
  ClickAwayListener,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

// assets
import Transitions from "../transitions";
import LogoutPopup from "./logoutPopup";
import AppAvatar from "../avatar/avatar";

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
  const theme: any = useTheme();

  const [open, setOpen] = useState(false);
  const [showLogoutPopop, setShowLogoutPopup] = useState(false);

  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef: any = useRef(null);

  const handleProfile = (event: any) => {
    handleClose(event);
  };

  const handleClose = (event: any) => {
    if (anchorRef.current && anchorRef.current?.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const toggleLogoutPopup = () => {
    handleToggle();
    setShowLogoutPopup(true);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      //   anchorRef?.current?.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Chip
        sx={{
          height: "48px",
          padding: "12px",
          alignItems: "center",
          borderRadius: "27px",
          transition: "all .2s ease-in-out",
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            "& svg": {
              stroke: theme.palette.primary.light,
            },
          },
          "& .MuiChip-label": {
            lineHeight: 0,
            paddingRight: 0,
          },
          "& .MuiChip-icon": {
            marginRight: 0,
          },
        }}
        icon={<AppAvatar name={"Sarthak Agrawal"} />}
        label={
          <SettingsOutlinedIcon sx={{ color: theme.palette.primary.main }} />
        }
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 14],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <Card
                  sx={{
                    border: "none",
                    borderColor: theme.palette.primary[200] + 25,
                    ":hover": {
                      boxShadow: theme.shadows[16],
                    },
                  }}
                  elevation={16}
                >
                  <Box sx={{ p: 2 }}>
                    <List
                      component="nav"
                      sx={{
                        width: "100%",
                        maxWidth: 350,
                        minWidth: 300,
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: "10px",

                        "& .MuiListItemButton-root": {
                          mt: 0.5,
                        },
                      }}
                    >
                      <ListItemButton
                        sx={{
                          borderRadius: `12px`,
                        }}
                        onClick={handleProfile}
                      >
                        <ListItemIcon>
                          <SettingsOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body2">
                              {"Account Settings"}
                            </Typography>
                          }
                        />
                      </ListItemButton>

                      <ListItemButton
                        sx={{
                          borderRadius: `12px`,
                        }}
                        onClick={toggleLogoutPopup}
                      >
                        <ListItemIcon>
                          <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body2">{"Logout"}</Typography>
                          }
                        />
                      </ListItemButton>
                    </List>
                  </Box>
                </Card>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
      {showLogoutPopop && <LogoutPopup updateShowPopup={setShowLogoutPopup} />}
    </>
  );
};

export default ProfileSection;
