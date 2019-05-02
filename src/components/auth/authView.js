import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { useAuth } from "hooks/amplify-hooks";
import { useStore, useDispatch } from "state/store";

export default function AuthView({ children }) {
  const auth = useAuth();
  const state = useStore("user");
  const dispatch = useDispatch();
  const { authView, loading, user, username, password } = state;

  const loginLabel = loading ? "Logging in..." : "Log In";

  // Check authenticated users on load
  useEffect(
    () => {
      //check auth users
      auth
        .currentAuthenticatedUser()
        .then(user => dispatch({ type: "setUser", payload: user }))
        .catch(err => console.log(`Error getting current user: ${err}`));
    },
    [auth, dispatch]
  );

  // Update view when user changes
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
    auth
      .signIn({ username, password })
      .then(user => dispatch({ type: "login", payload: user }))
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
