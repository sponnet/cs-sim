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
            currenttime: 0,
            convictiontresholdpassed: false,
        }, () => {

            let interval = setInterval(() => {
                // swipe through time
                const newTime = this.state.currenttime + 1;
                if (this.state.globalparams.totaltime > this.state.currenttime && !this.state.convictiontresholdpassed) {
                    this.setState({ currenttime: newTime }, () => {
                        this.recalc([]);
                    });
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
                }

            }, 1);



        });
    }

    recalc(stakeHistory) {
        let labels = [];
        for (let t = 0; t < this.state.globalparams.totaltime; t++) {
            labels.push(t);
        }



        let datasets = this.state.proposal.convictions.reduce((accum,user, userindex) => {
            const a = this.state.globalparams.alpha / 100;
            let y0 = 0;
            let x = 0;
            let data = [];
            
            let localt = 0; // local time ( = age of current conviction amount - reset every time conviction stake is changed.)
            let stakeIndex = 0;

            for (let t = 0; t < this.state.currenttime; t++) {
                // get timeline events for this CV
                // localt = time delta between last now & last change of parameters
                // y0 = y-offset (=convicton value) at last change of parameters
                // x = total amount of stake currently
                const y1 = convictionlib.getConviction(a, y0, x, localt);
            
                data.push(y1);
            
                // check if user changed his conviction
                if (
                    user.stakes &&
                    user.stakes.length > stakeIndex &&
                    user.stakes[stakeIndex].time <= t
                ) {
                    let action = user.stakes[stakeIndex];
                    stakeIndex++;
                    // reset conviction variables. Determine new y0 value
                    // which will be the new starting value.
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

            accum.push({
                label: user.name,
                fill: false,
                borderColor: this.makecolor(userindex),
                data: data
            });
            return accum;
        },[]);

        // add a dataset with the total conviction
        let totalconvictiondata = [];
        for (let t = 0; t < this.state.currenttime; t++) {
            let total = datasets.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.data[t];
            }, 0);
            totalconvictiondata.push(total);
            if (total < this.state.globalparams.convictionthreshold) {
                // just go on 
            } else {
                // treshold reached. Stop simulation drawing
                this.setState({ convictiontresholdpassed: true });
            }
        }

        let convictionthreshold_below = [];
        for (let t = 0; t < this.state.globalparams.totaltime; t++) {
            convictionthreshold_below.push(this.state.globalparams.convictionthreshold);
        }

        // draw total conviction
        datasets.push({
            label: "total",
            borderColor: "rgba(75,192,192,1)",
            data: totalconvictiondata
        });

        // draw line for required conviction (treshold)
        datasets.push({
            fill: true,
            label: "required conviction",
            borderColor: "rgba(175,0,0,1)",
            data: convictionthreshold_below
        });

        let timeline = stakeHistory.sort((a, b) => {
            return a.t - b.t;
        });

        this.setState({
            plot: {
                labels: labels,
                datasets: datasets
            },
            timeline: timeline,
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
