import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "./contexts/ThemeContext";
import ThemedToaster from "./components/ThemedToaster";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <App />
          <ThemedToaster />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
