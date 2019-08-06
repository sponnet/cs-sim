import React, { Component } from "react";
import "./sim.css";

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
        {/* <section className="hero is-info welcome is-small">
          <div className="card">
            <header className="card-header">
              <p className="card-header-title">Global parameters</p>
            </header>
            <div className="card-content">
              <div className="content"> */}
        <section className="info-tiles">
          <div className="tile is-ancestor has-text-centered">
            <div className="tile is-parent">
              <article className="tile is-child box">
                <p className="title">Alpha {this.state.globalparams.alpha / 100}</p>
                <p className="subtitle">
                  <input
                    className="slider is-fullwidth is-large is-danger is-circle"
                    step="1"
                    min="0"
                    max="100"
                    value={this.state.globalparams.alpha}
                    type="range"
                    onChange={e => {
                      this.setState(
                        {
                          globalparams: Object.assign(
                            {},
                            this.state.globalparams,
                            { alpha: e.target.value }
                          )
                        },
                        () => {
                          if (this.props.onChange) {
                            this.props.onChange(this.state.globalparams);
                          }
                        }
                      );
                    }}
                  />
                </p>
              </article>
              <article className="tile is-child box">
                <p className="title">
                  Total time of sim {this.state.globalparams.totaltime}
                </p>
                <p className="subtitle">
                  <input
                    className="slider is-fullwidth is-large is-danger is-circle"
                    step="1"
                    min="0"
                    max="1000"
                    value={this.state.globalparams.totaltime}
                    type="range"
                    onChange={e => {
                      this.setState(
                        {
                          globalparams: Object.assign(
                            {},
                            this.state.globalparams,
                            { totaltime: e.target.value }
                          )
                        },
                        () => {
                          if (this.props.onChange) {
                            this.props.onChange(this.state.globalparams);
                          }
                        }
                      );
                    }}
                  />
                </p>
              </article>
            <article className="tile is-child box">
                <p className="title">
                  Conviction required {this.state.globalparams.convictionthreshold}
                </p>
                <p className="subtitle">
                  <input
                    className="slider is-fullwidth is-large is-danger is-circle"
                    step="1"
                    min="0"
                    max="66000"
                    value={this.state.globalparams.convictionthreshold}
                    type="range"
                    onChange={e => {
                      this.setState(
                        {
                          globalparams: Object.assign(
                            {},
                            this.state.globalparams,
                            { convictionthreshold: e.target.value }
                          )
                        },
                        () => {
                          if (this.props.onChange) {
                            this.props.onChange(this.state.globalparams);
                          }
                        }
                      );
                    }}
                  />
                </p>
              </article>              
            </div>
            {/* <div className="tile is-parent">
                            <article className="tile is-child box">
                                <p className="title">59k</p>
                                <p className="subtitle">Products</p>
                            </article>
                        </div>
                        <div className="tile is-parent">
                            <article className="tile is-child box">
                                <p className="title">3.4k</p>
                                <p className="subtitle">Open Orders</p>
                            </article>
                        </div>
                        <div className="tile is-parent">
                            <article className="tile is-child box">
                                <p className="title">19</p>
                                <p className="subtitle">Exceptions</p>
                            </article>
                        </div> */}
          </div>
        </section>
        {/* </div>
            </div>
          </div>
        </section> */}
      </div>
    );
  }
}

export default Me;
