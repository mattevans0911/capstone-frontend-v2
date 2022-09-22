import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Redirect } from "react-router-dom";

function NavBar() {
  const [user, setUser] = useState(false);

  const configuration = {
    method: "post",
    url: "https://intense-basin-26666.herokuapp.com/user/logout",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const handleNavLogout = (event) => {
    event.preventDefault();
    axios(configuration)
      .then((response) => {
        sessionStorage.removeItem("username");
      })
      .catch((error) => {
        console.log("error in login", error);
      });
  };

  const AuthorizedNav = () => {
    return (
      <div className="nav-wrapper">
        <div className="nav-todo">
          <NavLink
            to="/todo"
            className="navbar-item"
            activeclassname="is-active"
          >
            Todo
          </NavLink>
        </div>
        <div className="login-logout-wrapper">
          <NavLink to="/" className="navbar-item" activeclassname="is-active">
            Login
          </NavLink>

          <div
            className="navbar-item"
            activeclassname="is-active"
            onClick={handleNavLogout}
          >
            Logout
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <AuthorizedNav />
    </div>
  );
}

export default NavBar;
