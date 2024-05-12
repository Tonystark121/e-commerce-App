import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import AppContextProvider from "./context/context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContextProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AppContextProvider>
  </React.StrictMode>
);
