import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { useAuth } from "hooks/amplify-hooks";
import { useStore, useDispatch } from "state/store";

// Components
import SignIn from "components/signIn";

export default function AuthView({ children }) {
  const auth = useAuth();
  const state = useStore("user");
  const dispatch = useDispatch();
  const { authView, user } = state;

  // Check authenticated users on load
  useEffect(
    () => {
      //check auth users
      auth
        .currentAuthenticatedUser()
        .then(user => dispatch({ type: "setUser", payload: user }))
        .catch(err => console.log("No current user"));
    },
    [auth, dispatch]
  );

  // Update view when user changes
  useEffect(
    () => {
      if (user) {
        dispatch({ type: "setView", payload: "authenticated" });
      }
    },
    [dispatch, user]
  );

  return (
    <Fragment>
      {authView === "signIn" && <SignIn />}
      {authView === "authenticated" && children}
    </Fragment>
  );
}

AuthView.propTypes = {
  children: PropTypes.node
};
