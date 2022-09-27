import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Redirect } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(false);

  const configuration = {
    method: "post",
    url: "https://intense-basin-26666.herokuapp.com/user/login",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      username,
      password,
    },
  };

  const handleLogin = (event) => {
    event.preventDefault();
    axios(configuration)
      .then((response) => {
        if (response.data === "No user created") {
          alert("No user created, Please make an account");
        } else if (response.data === "Password is incorrect") {
          alert("That password is incorrect, please try again");
        } else {
          sessionStorage.setItem("username", username);
          setUser(true);
        }
      })
      .catch((error) => {
        console.log("error in login", error);
      });
  };

  if (user) {
    return <Redirect to="/todo" />;
  } else {
    return (
      <div className="login-wrapper">
        <h1 className="login-title">Please Login to Continue</h1>
        <form className="form" onSubmit={handleLogin}>
          <input
            className="input-username"
            type="username"
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
            value={username}
          />
          <input
            className="input-password"
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
        <h4 className="create-account">
          If you do not have an account please follow the link below.
        </h4>
        <NavLink
          to="/create-account"
          className="navbar-item"
          activeclassname="is-active"
        >
          Create Account
        </NavLink>
      </div>
    );
  }
}

export default Login;
