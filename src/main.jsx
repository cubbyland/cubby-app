import React from "react";
import ReactDOM from "react-dom/client";
import AppContainer from "./containers/AppContainer";
import "./styles/global.css";

const App = () => {
  return (
    <AppContainer>
      <header className="app-header">
        <h1>My Cubby Videos</h1>
        <p>Welcome to the Cubby App</p>
      </header>
    </AppContainer>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
