import React, { Fragment, useState } from "react";
import { useAuth } from "hooks/amplify-hooks";
import { useStore, useDispatch } from "state/store";

// Components
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const auth = useAuth();
  const state = useStore("user");
  const dispatch = useDispatch();
  const { user = {} } = state;
  const { username = "" } = user;

  const handleOpen = evt => {
    setAnchor(evt.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchor(null);
  };

  const handleLogout = () => {
    handleClose();
    dispatch({ type: "setView", payload: "login" });
    auth
      .signOut({ global: true })
      .then(data => console.log(data))
      .catch(err => console.log(`Error logging out: ${err}`));
  };

  return (
    <Fragment>
      <IconButton
        aria-owns={open ? "menu-appbar" : undefined}
        aria-haspopup="true"
        onClick={handleOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchor}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disabled={true}>
          Profile
        </MenuItem>
        <MenuItem onClick={handleClose} disabled={true}>
          My account
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout {username}</MenuItem>
      </Menu>
    </Fragment>
  );
}
