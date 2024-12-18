import React from "react";
import ReactDOM from "react-dom/client";
import AppContainer from "./containers/AppContainer"; // Correct path
import "./main.css";

const App = () => {
  return (
    <AppContainer>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>My Cubby Videos</h1>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        Welcome to the Cubby App
      </div>
    </AppContainer>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
