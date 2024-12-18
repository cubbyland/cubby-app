import React from "react";
import ReactDOM from "react-dom/client";
import AppContainer from "./containers/AppContainer";
import "./main.css";

const App = () => {
  return (
    <AppContainer>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>My Cubby Videos</h1>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <p>Welcome to the Cubby App</p>
      </div>
    </AppContainer>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
