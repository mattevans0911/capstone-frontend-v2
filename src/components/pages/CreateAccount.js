import React, { useState } from "react";
import { Redirect } from "react-router-dom";

function CreateAccount() {
  const [createUsername, setCreateUsername] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [newUser, setNewUser] = useState(false);

  const handleCreateAccount = () => {
    fetch("https://intense-basin-26666.herokuapp.com/user/signup", {
      method: "POST",
      body: JSON.stringify({
        username: createUsername,
        password: createPassword,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((response) => console.log(response));
    setNewUser(true);
  };

  if (newUser) {
    return <Redirect to="/" />;
  } else {
    return (
      <div>
        <div className="login-wrapper">
          <h1 className="login-title">Welcome, Please Create An Account</h1>
          <form className="form" onSubmit={handleCreateAccount}>
            <input
              className="input-username"
              type="username"
              placeholder="Username"
              onChange={(event) => setCreateUsername(event.target.value)}
              value={createUsername}
            />
            <input
              className="input-password"
              type="password"
              placeholder="Password"
              onChange={(event) => setCreatePassword(event.target.value)}
              value={createPassword}
            />
            <button className="login-button" type="submit">
              Create
            </button>
          </form>
          <h4 className="create-account">
            Once your account is created you will be redirected to the login
            page!
          </h4>
        </div>
      </div>
    );
  }
}

export default CreateAccount;
