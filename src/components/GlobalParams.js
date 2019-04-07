import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import convictionlib from "./convictionlib.js";

class Me extends Component {
  constructor(props) {
    super();

    this.state = {
      globalparams: props.globalparams
    };
  }

  //   componentWillReceiveProps(newProps) {
  //     this.setState({ globalparams: newProps.globalparams });
  //   }

  componentWillMount() {}

  render() {
    return (
      <div className="container">
        <section className="hero is-info welcome is-small">
          <div className="card">
            <header className="card-header">
              <p className="card-header-title">Global parameters</p>
            </header>
            <div className="card-content">
              <div className="content">
                Alpha
                <input
                  class="slider is-fullwidth is-large is-danger is-circle"
                  step="1"
                  min="0"
                  max="100"
                  value={this.state.globalparams.alpha}
                  type="range"
                  onChange={e => {
                    this.setState(
                      { globalparams: { alpha: e.target.value } },
                      () => {
                        if (this.props.onChange) {
                          this.props.onChange(this.state.globalparams);
                        }
                      }
                    );
                  }}
                /> {this.state.globalparams.alpha / 100}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Me;
