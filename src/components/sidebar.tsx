import * as React from "react";
import { Switch, Route } from "react-router";
import { CircleSidebar } from "./circle";

export function Sidebar(props: {}) {
  return (
    <Switch>
      <Route path="/o/:circle">
        <CircleSidebar />
      </Route>
      <Route path="/">
        <div>Sidebar</div>
      </Route>
    </Switch>
  );
}
