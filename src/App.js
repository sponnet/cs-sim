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
        alpha: 90,
        totaltime: 100
      },
      proposals: [
        {
          timecreated: 0,
          id: 1,
          value: 1000,
          name: "Spend 1000 xDAI on X",
          convictions: [
            {
              name: "Griff",
              stakes: [
                { time: 0, tokensstaked: 1000 },
                { time: 50, tokensstaked: 0 }
              ]
            },
            {
              name: "Jeff",
              stakes: [
                { time: 30, tokensstaked: 1000 },
                { time: 80, tokensstaked: 7000 }
              ]
            }

          ]
        }
        // { id: 2, timecreated: 30, value: 1000, name: "Spend 2000 xDAI on Y" }
      ]
    };
  }

  timeChanged(e) {
    console.log("app: time changed");
  }

  render() {
    const votes = this.state.proposals.map((proposal,i) => {
      return (
        <div key={i} className="tile is-ancestor has-text-centered">
          <div className="tile is-parent">
            <article className="tile is-child box">
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
        <section className="info-tiles">
          <GlobalParams
            globalparams={this.state.globalparams}
            onChange={data => {
              this.setState({ globalparams: data });
            }}
          />
        </section>
        <section className="info-tiles">{votes}</section>
      </div>
    );
  }
}

export default App;
