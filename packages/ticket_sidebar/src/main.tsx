import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import zafClient from "@app/zendesk/sdk";
import { ThemeProvider, DEFAULT_THEME } from "@zendeskgarden/react-theming";
import { ZendeskContextProvider } from "./contexts/ZendeskContextProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ZendeskContextProvider>
      <ThemeProvider theme={DEFAULT_THEME}>
        {zafClient && <App />}
      </ThemeProvider>
    </ZendeskContextProvider>
  </React.StrictMode>
);
