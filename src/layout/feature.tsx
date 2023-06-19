import { Outlet } from "react-router-dom";
import {
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  useTheme,
  styled,
} from "@mui/material";

//custom imports
import { DRAWER_WIDTH } from "utils/constants";
import Header from "components/header";
import Sidebar from "./sidebar";

//component imports

const Main = styled("main")(({ theme }: any) => ({
  ...theme.typography.mainContent,
  ...{
    marginLeft: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
  },
}));

const MainLayout = () => {
  const theme = useTheme();

  const renderAppBar = () => {
    return (
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{ bgcolor: theme.palette.background.default }}
      >
        <Toolbar>
          <Header />
        </Toolbar>
      </AppBar>
    );
  };

  return (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      <CssBaseline />
      {renderAppBar()}
      {/* drawer */}
      <Sidebar />
      <Main theme={theme}>
        <Outlet />
      </Main>
    </Box>
  );
};

export default MainLayout;
