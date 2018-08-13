import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router";
import indexRoutes from "routes/index.jsx";
import Layout from './views/Quizzie/Layout'
import EditQuizModal from './views/Quizzie/EditQuizModal';
import "assets/scss/material-kit-react.css?v=1.1.0";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <React.Fragment>
      {/* <Route exact path="/quizzie" render={props => (<Layout {...props} />)} /> */}
      <Layout/>
      {/* <Switch>
        {indexRoutes.map((prop, key) => {
          return <Route path={prop.path} key={key} component={prop.component} />;
        })}
      </Switch> */}
    </React.Fragment>
  </Router>,
  document.getElementById("root")
);
