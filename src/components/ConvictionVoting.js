import React, { Component } from "react";
import { defaults, Line } from "react-chartjs-2";
import convictionlib from "./convictionlib.js";
import "./sim.css";

class Me extends Component {

    constructor(props) {
        super();

        this.state = {
            globalparams: props.globalparams,
            proposal: props.proposal,
            currenttime: 0,
            convictiontresholdpassed: false,
            stakeHistory: [],
            timeline: undefined,
            plot: undefined,
        };
    }

    componentWillMount() {
        this.recalc([]);
        this.restart();

    }

    componentWillReceiveProps(newProps) {
        //   debugger;
        this.setState({ globalparams: newProps.globalparams }, () => { this.recalc([]); });

    }

    makecolor(i) {
        const r = (i * 139) % 255;
        const g = (i * 251) % 255;
        const b = (i * 43) % 255;
        return `rgba(${r},${g},${b},0.3)`;
    }

    restart() {
        this.setState({
            //globalparams: props.globalparams,
            //proposal: props.proposal,
            currenttime: 0,
            convictiontresholdpassed: false,
            // stakeHistory: [],
            // timeline: undefined,
        }, () => {

            let interval = setInterval(() => {
                // let stakeHistory = [];
                const newTime = this.state.currenttime + 1;
                console.log("tick", newTime);
                if (this.state.globalparams.totaltime > this.state.currenttime && !this.state.convictiontresholdpassed) {
                    this.setState({ currenttime: newTime }, () => {
                        this.recalc([]);
                        // console.log(this.state)
                    });
                    // t++;
                } else {
                    clearInterval(interval);
                    if (this.state.convictiontresholdpassed) {
                        this.recalc([{
                            t: this.state.currenttime,
                            desc: `Proposal passed !`
                        }]);
                    } else {
                        this.recalc([[{
                            t: this.state.currenttime,
                            desc: `Proposal did not pass before end of sim`
                        }]]);
                    }
                    // this.state.stakeHistory.push({
                    //     t: this.state.currenttime,
                    //     desc: `${user.name} changes stake to ${action.tokensstaked}`
                    // });
                }

            }, 1);



        });
    }

    recalc(stakeHistory) {
        let labels = [];
        for (let t = 0; t < this.state.globalparams.totaltime; t++) {
            labels.push(t);
        }



        let datasets = this.state.proposal.convictions.map((user, userindex) => {
            const a = this.state.globalparams.alpha / 100;
            const D = 10;
            let y0 = 0;
            let y1 = y0;
            let x = 0;
            let labels = [];
            let data = [];

            let localt = 0; // local time ( = age of current conviction amount - reset every time conviction stake is changed.)
            let stakeIndex = 0;

            for (let t = 0; t < this.state.currenttime; t++) {
                // get timeline events for this CV

                y1 = convictionlib.getConviction(a, D, y0, x, localt);

                data.push(y1);

                // check if user changed his conviction
                if (
                    user.stakes &&
                    user.stakes.length > stakeIndex &&
                    user.stakes[stakeIndex].time <= t
                ) {
                    let action = user.stakes[stakeIndex];
                    stakeIndex++;
                    x = action.tokensstaked;
                    localt = 0;
                    y0 = y1;


                    stakeHistory.push({
                        t: t,
                        desc: `${user.name} changes stake to ${action.tokensstaked}`
                    });
                }

                localt++;
            }

            return {
                label: user.name,
                fill: false,
                // backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: this.makecolor(userindex),
                data: data
            };
        });

        // let convictionthreshold_below = [];
        // let convictionthreshold_above = [];

        // add a dataset with the total conviction
        let totalconvictiondata = [];
        for (let t = 0; t < this.state.currenttime; t++) {
            let total = datasets.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.data[t];
            }, 0);
            totalconvictiondata.push(total);
            if (total < this.state.globalparams.convictionthreshold) {
                // convictionthreshold_below.push(this.state.globalparams.convictionthreshold);
                // convictionthreshold_above.push(null);
            } else {
                this.setState({ convictiontresholdpassed: true });
                // convictionthreshold_below.push(null);
                // convictionthreshold_above.push(this.state.globalparams.convictionthreshold);
            }
        }

        let convictionthreshold_below = [];
        for (let t = 0; t < this.state.globalparams.totaltime; t++) {
            convictionthreshold_below.push(this.state.globalparams.convictionthreshold);
        }

        datasets.push({
            label: "total",
            borderColor: "rgba(75,192,192,1)",
            data: totalconvictiondata
        });

        datasets.push({
            fill: true,
            label: "required conviction",
            borderColor: "rgba(175,0,0,1)",
            data: convictionthreshold_below
        });

        // datasets.push({
        //     label: "required conviction",
        //     borderColor: "rgba(0,175,0,1)",
        //     data: convictionthreshold_above
        // });

        let timeline = stakeHistory.sort((a, b) => {
            return a.t - b.t;
        });

        this.setState({
            plot: {
                labels: labels,
                datasets: datasets
            },
            timeline: timeline,
            // stakeHistory: stakeHistory,
        });
    }


    render() {
        const timeline = this.state.timeline.map((item, i) => {
            return (
                <li key={i}>
                    at time {item.t} : {item.desc}
                </li>
            );
        });

        return (
            <div className="container">
                <section className="hero is-info welcome is-small">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">Proposal : {this.state.proposal.name}</h1>
                            {this.state.convictiontresholdpassed && (<h1 className="title">PASSED!</h1>)

                            }
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
                            <ol>{timeline}</ol>
                        </div>
                    </div>
                </div>

                <button onClick={() => { this.restart() }}>Restart Simulation</button>
            </div>
        )
    }
}

export default Me;
