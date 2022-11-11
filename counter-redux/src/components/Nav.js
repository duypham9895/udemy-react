import React from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Nav.module.css";
import { logout } from "../store/auth";

const Nav = () => {
  const { isAuthentication } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  if (!isAuthentication) {
    return;
  }

  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <a href="/">My Products</a>
        </li>
        <li>
          <a href="/">My Sales</a>
        </li>
        <li>
          <button onClick={logoutHandler}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
