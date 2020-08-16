import * as React from "react";
import { Home } from "./home";
import { Circle } from "./circle";
import { SubPost } from "./subPost";
import { Route, Switch } from "react-router-dom";

export function Content() {
  return (
    <Switch>
      <Route path="/o/:circle/:postId">
        <SubPost />
      </Route>
      <Route path="/o/:circle">
        <Circle />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
}
