import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { useImmerReducer } from "use-immer";

// AWS
import Amplify, { Auth } from "aws-amplify";
import awsmobile from "../aws-exports";

Amplify.configure(awsmobile);

const initialState = {
  authView: "login",
  loading: false,
  user: null,
  username: "",
  email: "",
  password: "",
  verifyCode: ""
};

function reducer(draft, action) {
  switch (action.type) {
    case "reset":
      return initialState;
    case "update":
      const { key, val } = action.payload;
      draft[key] = val;
      return draft;
    case "setLoading":
      draft.loading = action.payload;
      return draft;
    case "setUser":
      draft.user = action.payload;
      return draft;
    case "setView":
      draft.authView = action.payload;
      return draft;
    default:
      return void console.log(`Unhandled action: ${action.type}`);
  }
}

export default function AuthView({ children }) {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const { authView, loading, user, username, password } = state;

  const loginLabel = loading ? "Logging in..." : "Log In";

  useEffect(
    () => {
      if (user) {
        dispatch({ type: "setView", payload: "loggedIn" });
      }
    },
    [dispatch, user]
  );

  const handleSubmit = evt => {
    evt.preventDefault();
    dispatch({ type: "setLoading", payload: true });
    const { username, password } = state;
    Auth.signIn({ username, password })
      .then(user => dispatch({ type: "setUser", payload: user }))
      .catch(err => console.log(`Error Logging In: ${err}`));
  };

  const handleReset = evt => {
    dispatch({ type: "reset" });
  };

  const handleUpdate = evt => {
    dispatch({
      type: "update",
      payload: {
        key: evt.target.name,
        val: evt.target.value
      }
    });
  };

  return (
    <Fragment>
      <p>{`${authView} ${username}`}</p>
      {authView === "login" && (
        <Fragment>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={handleUpdate}
              disabled={loading}
            />
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={handleUpdate}
              disabled={loading}
            />
            <input
              type="button"
              value="Reset"
              onClick={handleReset}
              disabled={loading}
            />
            <input type="submit" value={loginLabel} disabled={loading} />
          </form>
        </Fragment>
      )}
      {authView === "loggedIn" && children}
    </Fragment>
  );
}

AuthView.propTypes = {
  children: PropTypes.node
};
