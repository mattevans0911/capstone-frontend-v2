import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "./Navigation/NavBar";
import Login from "./pages/Login";
import Todo from "./pages/Todo";
import CreateAccount from "./pages/CreateAccount";

//Home Page - With Local Weather Widget
//Dynamic Login / Out Button
//Track How Many Tasks You Completed Vs Entered

function App() {
  return (
    <div className="app">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Login} />

          <Route path="/todo" exact component={Todo} />

          <Route path="/create-account" exact component={CreateAccount} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
