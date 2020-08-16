import * as React from "react";
import { Route, Switch } from "react-router";
import { CircleHeader } from "./circle";

export function SubHeader(props: {}) {
  return (
    <Switch>
      <Route path="/o/:circle">
        <CircleHeader />
      </Route>
      <Route path="/">
        <div className="navbar-brand">
          <div className="navbar-item">SubHeader</div>
        </div>
      </Route>
    </Switch>
  );
}
