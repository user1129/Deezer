import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import AudioProvider from "./context/AudioContext.tsx";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AudioProvider>
      <App />
    </AudioProvider>
  </React.StrictMode>
);
