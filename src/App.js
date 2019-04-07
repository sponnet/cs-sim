import React, { Component } from "react";
import logo from "./logo.svg";
// import './App.css';
import "bulma/css/bulma.css";
// import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import ConvictionVoting from "./components/ConvictionVoting.js";
import TimeLine from "./components/TimeLine.js";
class App extends Component {
  constructor(props) {
    super();

    this.state = {
      proposal: { name: "Pay 1000 to X" }
    };
  }

  timeChanged(e) {
    console.log("app: time changed");
  }

  render() {
    return (
      <div className="App">
        {/* <TimeLine
          onTimeChange={e => {
            this.timeChanged(e);
          }}
        /> */}
        <ConvictionVoting proposal={this.state.proposal} />

      </div>
    );
  }
}

export default App;
