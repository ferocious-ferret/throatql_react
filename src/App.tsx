import React from "react";
import { createClient, Provider } from "urql";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Sidebar } from "./components/sidebar";
import { SubHeader } from "./components/subHeader";
import { Content } from "./components/content";
import "normalize.css";
import "./App.scss";

const client = createClient({ url: "http://localhost:8080/graphql" });

const App = () => (
  <Provider value={client}>
    <Router>
      <nav className="navbar">
        <div className="navbar-brand">
          <div className="navbar-item">
            <h1 className="title is-1">
              <Link to="/">Ovarit</Link>
            </h1>
          </div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <h1 className="is-size-5">Login Stuff Goes Here</h1>
          </div>
        </div>
      </nav>
      <nav className="navbar">
        <SubHeader />
      </nav>

      <div className="columns is-desktop">
        <div className="column is-three-quarters">
          <div className="section">
            <Content />
          </div>
        </div>
        <div className="column">
          <div className="section">
            <Sidebar />
          </div>
        </div>
      </div>
    </Router>
  </Provider>
);

export default App;
