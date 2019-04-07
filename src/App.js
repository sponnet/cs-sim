import React, { Component } from "react";
import logo from "./logo.svg";
// import './App.css';
import "bulma/css/bulma.css";
// import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import GlobalParams from "./components/GlobalParams.js";
import ConvictionVoting from "./components/ConvictionVoting.js";
import TimeLine from "./components/TimeLine.js";
class App extends Component {
  constructor(props) {
    super();

    this.state = {
      globalparams: {
        alpha: 90
      },
      proposals: [
        { id: 1, value: 1000, name: "Spend 1000 xDAI on X" },
        { id: 2, value: 1000, name: "Spend 2000 xDAI on Y" }
      ]
    };
  }

  timeChanged(e) {
    console.log("app: time changed");
  }

  render() {
    const votes = this.state.proposals.map(proposal => {
      return (
        <div class="tile is-ancestor has-text-centered">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <ConvictionVoting
                globalparams={this.state.globalparams}
                proposal={proposal}
              />
              ;
            </article>
          </div>
        </div>
      );
    });
    return (
      <div className="App">
        <section class="info-tiles">
          <GlobalParams
            globalparams={this.state.globalparams}
            onChange={data => {
              this.setState({ globalparams: data });
            }}
          />
        </section>
        <section class="info-tiles">{votes}</section>
      </div>
    );
  }
}

export default App;
