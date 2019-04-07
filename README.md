# Commons Stack Sim

React app for simulating and visualizing the concepts of the Commons Stack

## Installing

```
$ yarn
$ yarn start
```

## Components

### Token Bonding Curve

TODO

### Conviction voting

The conviction math is in `components/convictionlib.js`

The visualisation / simulation is in `components/ConvictionVoting.js`


### Creating and nominating funding proposals

TODO

### Further work

#### The simulation scenario's

TODO

There should be a number of scenario's which we ideally can replay over the different components and fiddle with the parameters to watch the behaviour of the system - and tweak these parameters until we have a system that makes sense withing certain boundaries.

#### Determine boundaries

The system should work within certain boundaries. These simulations should show the boundaries that result into acceptable behaviour of the system. One of the goals of this visualisation & simulation is to determine and document these boundaries.

## CSS framework

The CSS framework in use is Bulma ( https://bulma.io/documentation/ )

It is easy themable and you make any react component look nice without too much overhead.

There are some good examples of using Bulma here : https://dansup.github.io/bulma-templates/

