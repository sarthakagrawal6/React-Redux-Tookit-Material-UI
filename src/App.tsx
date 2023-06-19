import React from "react";
import {
  StyledEngineProvider,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";

//default theme
import themes from "./themes";
import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
// import { PersistGate } from "redux-persist/integration/react";
import { RouteManager } from "./routes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const themeCustomization = {
  opened: true,
  borderRadius: 12,
  defaultId: "default",
  fontFamily: `'Roboto', sans-serif`,
  isOpen: [], // for active default menu
};

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(themeCustomization)}>
        <CssBaseline />
        <Provider store={store}>
          {/* <PersistGate loading={null} persistor={persistor}> */}
          <BrowserRouter>
            <RouteManager />
          </BrowserRouter>
          <ToastContainer />
          {/* </PersistGate> */}
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
