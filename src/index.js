import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.css";
import About from "./components/About";
import Home from "./components/Home";
import Categories from "./components/Categories";
import BusinessList from "./components/BusinessesList";
import Business from "./components/Business";
import AdminLogin from "./components/AdminLogin";
import Dashboard from "./components/Dashboard";

import * as serviceWorker from "./serviceWorker";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Home} />

        <Switch>
          <Route exact path="/about" component={About} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/business/search" component={Categories} />
          <Route
            exact
            path="/business/:category/search"
            component={BusinessList}
          />
          <Route exact path="/business/:id" component={Business} />
          <Route exact path="/bigboss/login" component={AdminLogin} />
        </Switch>
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
