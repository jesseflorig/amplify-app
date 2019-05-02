import React from "react";
import logo from "./logo.svg";
import "./App.css";

// Components
import StoreProvider from "./state/store";
import AuthView from "./Auth/AuthView";

function App() {
  return (
    <StoreProvider>
      <div className="App">
        <AuthView>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </AuthView>
      </div>
    </StoreProvider>
  );
}

export default App;
