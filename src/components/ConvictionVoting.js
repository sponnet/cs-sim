import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import convictionlib from "./convictionlib.js";

class Me extends Component {
  constructor(props) {
    super();

    this.state = {
        globalparams: props.globalparams,
      proposal: props.proposal,
    };
  }

  componentWillMount() {
    this.recalc();
  }


  componentWillReceiveProps(newProps) {
    this.setState({ globalparams: newProps.globalparams });
    this.recalc();
  }

  recalc() {
    const a = this.state.globalparams.alpha / 100;
    const D = 10;
    let y = 0;
    let x = 1e18;
    let labels = [];
    let data = [];

    for (let t = 0; t < 100; t++) {
      let y1 = convictionlib.getConviction(a, D, y, x, t);
      labels.push(t);
      data.push(y1);
    }

    //debugger;
    this.setState({
      plot: {
        labels: labels,
        datasets: [
          {
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,

            label: "total conviction",
            data: data
          }
        ]
      }
    });
  }

  render() {
    return (
      <div className="container">
        <section className="hero is-info welcome is-small">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Proposal : {this.state.proposal.name}</h1>
            </div>
          </div>
          {/* Alpha= {this.state.alpha / 100}
          <input
            class="slider is-fullwidth is-large is-danger is-circle"
            step="1"
            min="0"
            max="100"
            value={this.state.alpha}
            type="range"
            onChange={e => {
              this.setState({ alpha: e.target.value });
              this.recalc();
            }}
          /> */}
        </section>

        <div className="card">
          <header className="card-header">
            <p className="card-header-title">Conviction chart</p>
          </header>
          <div className="card-content">
            <div className="content">
              {this.state.plot && <Line data={this.state.plot} />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Me;
