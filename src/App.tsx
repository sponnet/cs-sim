import React, { Component } from "react";
import logo from "./logo.svg";
import './App.css';
import "bulma/css/bulma.css";
// import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import GlobalParams from "./components/GlobalParams";
import ConvictionVoting from "./components/ConvictionVoting";
import TimeLine from "./components/TimeLine";
// Material UI
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
// Components
import Header from "./components/Header";
import InputParams from "./components/InputParams";
import HelpText from "./components/HelpText";


const headerOffset = 10;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mainContainer: {
            "& > div:not(:last-child)": {
                paddingBottom: theme.spacing(3)
            },
            "& > div": {
                "& > div": {
                    paddingTop: "0 !important"
                }
            },
            paddingBottom: theme.spacing(9)
        },
        simulationContainer: {
            minHeight: "442px"
        },
        paper: {
            width: "100%",
            height: "100%",
            minHeight: 310,
            backgroundColor: "#293640"
        },
        box: {
            padding: theme.spacing(3, 3),
            minHeight: 310
        },
        boxButton: {
            padding: theme.spacing(3, 3)
        },
        boxHeader: {
            padding: theme.spacing(3, 3),
            height: theme.spacing(headerOffset),
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid #313d47"
        },
        boxChart: {
            width: "100%",
            height: "100%",
            minHeight: 310,
            maxHeight: 350,
            padding: theme.spacing(3, 3),
            // Correct the chart excessive margins
            paddingRight: "5px",
            paddingLeft: "5px"
        },
        boxPlaceholder: {
            padding: theme.spacing(3, 3),
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            color: theme.palette.text.secondary,
            opacity: 0.4
        },
        header: {
            backgroundColor: "#0b1216",
            color: "#f8f8f8",
            textAlign: "center",
            padding: theme.spacing(3, 0, 6 + headerOffset),
            marginBottom: -theme.spacing(headerOffset)
        },
        button: {
            background: "linear-gradient(290deg, #2ad179, #4ab47c)",
            color: "white"
        }
    })
);


export default function App() {

    const [globalParams, setGlobalParams] = React.useState({
        alpha: 90,
        totaltime: 100,
        convictionthreshold: 50000,
    });

    const [proposals, setProposals] = React.useState([
        {
            timecreated: 0,
            id: 1,
            value: 1000,
            name: "Spend 1000 xDAI on X",
            convictions: [
                {
                    name: "Griff",
                    stakes: [
                        { time: 20, tokensstaked: 1000 },
                        { time: 50, tokensstaked: 0 }
                    ]
                },
                {
                    name: "Jeff",
                    stakes: [
                        { time: 30, tokensstaked: 1000 },
                        { time: 60, tokensstaked: 7000 }
                    ]
                }

            ]
        }
        // { id: 2, timecreated: 30, value: 1000, name: "Spend 2000 xDAI on Y" }
    ]);

    // const votes = globalParams.proposals.map((proposal, i) => {
    //     return (
    //         <div key={i} className="tile is-ancestor has-text-centered">
    //             <div className="tile is-parent">
    //                 <article className="tile is-child box">
    //                     <ConvictionVoting
    //                         globalparams={globalParams}
    //                         proposal={proposal}
    //                     />
    //                 </article>
    //             </div>
    //         </div>
    //     );
    // });



    const classes = useStyles({});
    return (
        <>
            <header className={classes.header}>
                <Container fixed>
                    <Header />
                </Container>
            </header>

            <Container fixed className={classes.mainContainer}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={6} lg={8}>
                        <Paper className={classes.paper}>
                            <Box className={classes.boxHeader}>
                                <Typography variant="h6">Simulation Parameters</Typography>
                                <HelpText
                                    text={
                                        <span>
                                            Description of the different parameters <br />

                                        </span>
                                    }
                                />
                            </Box>

                            <Box className={classes.box}>
                                <InputParams curveParams={{
                                    alpha: globalParams.alpha,
                                    totaltime: globalParams.totaltime,
                                    convictionthreshold: globalParams.convictionthreshold
                                }} setCurveParams={setGlobalParams} />
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={4}>
                        <Paper className={classes.paper}>
                            <Box className={classes.boxHeader}>
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                >
                                    <Button
                                        variant="contained"
                                        className={classes.button}
                                    // onClick={startSimulation}
                                    // disabled={simulationRunning}
                                    >
                                        Run simulation
                  </Button>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>

                </Grid>
            </Container>



        </>
    );

    // return (
    //     <div className="App">
    //         <section className="info-tiles">
    //             <GlobalParams
    //                 globalparams={globalParams}
    //                 onChange={data => {
    //                     setGlobalParams(data);
    //                 }}
    //             />
    //         </section>
    //         <section className="info-tiles">{votes}</section>
    //     </div>
    // )

}

