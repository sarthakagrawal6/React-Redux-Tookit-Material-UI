import React from "react";
import logo from "./logo.svg";
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
          {/* </PersistGate> */}
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
