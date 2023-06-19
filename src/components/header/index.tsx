// material-ui
import { Avatar, Box, ButtonBase, useTheme } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

// project imports
import LogoSection from "./logo/index";
import ProfileSection from "./profile/index";
import { toastService } from "utils/toast.service";

function Header() {
  const theme: any = useTheme();

  const onNotificationClick = () => {
    toastService.showToast(
      "Under Development",
      "info",
      "under-dev-notification"
    );
  };

  const renderNotificationIcon = () => (
    <ButtonBase sx={{ borderRadius: "12px" }} onClick={onNotificationClick}>
      <Avatar
        variant="rounded"
        sx={{
          ...theme.typography.commonAvatar,
          ...theme.typography.mediumAvatar,
          transition: "all .2s ease-in-out",
          background: theme.palette.secondary.light,
          color: theme.palette.secondary.dark,
          '&[aria-controls="menu-list-grow"],&:hover': {
            background: theme.palette.secondary.dark,
            color: theme.palette.secondary.light,
          },
        }}
        aria-haspopup="true"
        color="inherit"
      >
        <NotificationsOutlinedIcon />
      </Avatar>
    </ButtonBase>
  );

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          padding: "16px 0px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: 228,
            display: "flex",
            paddingTop: "5px",
          }}
        >
          <LogoSection />
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ mr: 3 }}>
          {/* notification & profile */}
          {renderNotificationIcon()}
        </Box>
        <ProfileSection />
      </Box>
    </>
  );
}

export default Header;
