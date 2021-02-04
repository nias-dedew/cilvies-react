import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import CreateMovie from "./Page/CreateMoviePage";
import MovieUpdate from "./Page/MovieUpdatePage";
import MoviePage from "./Page/MoviePage";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <nav className="navbar navbar-expand-md bg-dark navbar-dark">
            <strong className="navbar-brand">Cilvies DVD Rent</strong>

            <Link className="nav-link active link-hover-navbar" to={"/movies"}>List DVD</Link>
            <Link className="nav-link active link-hover-navbar" to={"/movies/add"}>Add</Link>

          </nav>

          <div>
            <Switch>
              <Route exact path="/movies" component={MoviePage} />
              <Route exact path="/movies/add" component={CreateMovie} />
              <Route path="/movies/:id" component={MovieUpdate} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;