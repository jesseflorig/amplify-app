import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { create } from "jss";
import compose from "jss-plugin-compose";
import theme from "./theme";

// Components
import StoreProvider from "state/store";
import { ThemeProvider, StylesProvider, jssPreset } from "@material-ui/styles";
import AuthView from "components/auth/authView";
import App from "./App";
import CssBaseline from "@material-ui/core/CssBaseline";

const jss = create({
  plugins: [...jssPreset().plugins]
});
jss.use(compose());

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <StylesProvider jss={jss}>
      <CssBaseline />
      <StoreProvider>
        <AuthView>
          <App />
        </AuthView>
      </StoreProvider>
    </StylesProvider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
