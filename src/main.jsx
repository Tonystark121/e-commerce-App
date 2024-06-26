import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import AppContextProvider from "./context/context.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppContextProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AppContextProvider>
    </Provider>
  </React.StrictMode>
);
