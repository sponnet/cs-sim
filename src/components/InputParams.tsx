import React, { useState, useEffect, useMemo } from "react";
import {
  createStyles,
  makeStyles,
  withStyles,
  Theme
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import NumberFormat from "react-number-format";
// import { throttle } from "lodash";

const PrettoSlider = withStyles({
  root: {
    height: 8
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus,&:hover,&$active": {
      boxShadow: "inherit"
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  },
  markLabel: {
    top: 30
  }
})(Slider);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(6, 0, 3)
    },
    lightBulb: {
      verticalAlign: "middle",
      marginRight: theme.spacing(1)
    },
    leftContainer: {
      color: theme.palette.text.secondary
    },
    centerContainer: {
      // color: blackColor
    },
    listBoxContainer: {
      "& > div:not(:last-child)": {
        paddingBottom: "12px",
        marginBottom: "12px",
        borderBottom: "1px solid #313d47"
      }
    },
    listBox: {
      "& > div": {
        display: "flex",
        alignItems: "center",
        "& p": {
          marginBottom: 0
        }
      },
      "& > div:not(:last-child)": {
        paddingRight: "12px"
      }
    },
    slider: {
      color: theme.palette.primary.main
    }
  })
);

function NumberFormatCustom(props: any) {
  const { inputRef, onChange, prefix, suffix, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({ target: { value: values.value } });
      }}
      thousandSeparator
      prefix={prefix}
      suffix={suffix}
    />
  );
}

export default function InputParams({
  curveParams,
  setCurveParams
}: {
  curveParams?: {
    alpha: number;
    totaltime: number;
    convictionthreshold: number;
  };
  setCurveParams(newCurveParams: any): void;
}) {
  const [alpha, setAlpha] = useState(0.9);
  const [totaltime, setTotaltime] = useState(100); // fraction allocated to reserve (.)
  const [convictionthreshold, setConvictionthreshold] = useState(50000); // Hatch sale Price p0 (DAI / token)

  function setParentCurveParams() {
    setCurveParams({ alpha, totaltime, convictionthreshold});
  }

  const maxReturnRate = 10;

  const inputFields: {
    label: string;
    value: number;
    setter(newValue: any): void;
    min: number;
    max: number;
    step: number;
    unit?: string;
    prefix?: string;
    suffix?: string;
    toText?(value: number): string;
    toNum?(value: string): number;
    format(value: number): string;
  }[] = [
    {
        label: "Alpha",
        value: alpha,
        setter: setAlpha,
        min: 0,
        max: 1,
        step: 0.1,
        unit: "",
        prefix: "",
        suffix: "",
        format: (n: number) => `${(n).toFixed(2)}`,
        toText: (n: number) => String((n).toFixed(2)),
        toNum: (n: string) => parseFloat(n)
      },      
    {
      label: "Simulation duration",
      value: totaltime,
      setter: setTotaltime,
      min: 10,
      max: 300,
      step: 1,
      unit: "",
      prefix: "",
      suffix: "",
      format: (n: number) => `${n.toFixed(0)}`,
      toText: (n: number) => String(+(n).toFixed(0)),
      toNum: (n: string) => Math.floor(parseFloat(n))
    },
    {
      label: "Conviction required",
      value: convictionthreshold,
      setter: setConvictionthreshold,
      min: 100,
      max: 200000,
      step: 100,
      unit: "",
      suffix: "",
      format: (n: number) => `${Math.round( n)}`,
      toText: (n: number) => String(+(n ).toFixed(0)),
      toNum: (n: string) => parseFloat(n) 
    },
   
  ];

//   useEffect(() => {
//     if (p1 < p0) setP1(p0);
//     else if (p1 > p0 * maxReturnRate) setP1(p0 * maxReturnRate);
//   }, [p0]);

  const classes = useStyles({});

  return (
    <div className={classes.listBoxContainer}>
      {inputFields.map(
        ({
          label,
          value,
          setter,
          min,
          max,
          step,
          prefix,
          suffix,
          format,
          toText,
          toNum
        }) => {
          function sanitizeInput(num: number = 0) {
            if (isNaN(num)) num = 0;
            if (num > max) num = max;
            else if (num < min) num = min;
            setter(num);
          }

          return (
            <Grid key={label} container spacing={0} className={classes.listBox}>
              <Grid item xs={6} className={classes.leftContainer}>
                <Typography id={label} gutterBottom>
                  {label}
                </Typography>
              </Grid>

              <Grid item xs={2} className={classes.centerContainer}>
                {/* <Typography gutterBottom>{display(value)}</Typography> */}
                <TextField
                  onChange={e => {
                    sanitizeInput(
                      toNum ? toNum(e.target.value) : parseFloat(e.target.value)
                    );
                    setParentCurveParams();
                  }}
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                    disableUnderline: true,
                    inputProps: {
                      prefix,
                      suffix
                    }
                  }}
                  value={toText ? toText(value) : value}
                />
              </Grid>

              <Grid item xs={4}>
                <PrettoSlider
                  className={classes.slider}
                  valueLabelDisplay="auto"
                  aria-label={label}
                  defaultValue={value}
                  onChange={(_, newValue) => sanitizeInput(Number(newValue))}
                  onChangeCommitted={setParentCurveParams}
                  value={value}
                  min={min}
                  max={max}
                  step={step}
                  valueLabelFormat={value => format(value).replace("$", "")}
                  // marks={[
                  //   { value: 0, label: "0%" },
                  //   { value: 50, label: "50%" },
                  //   { value: 100, label: "100%" }
                  // ]}
                />
              </Grid>
            </Grid>
          );
        }
      )}
    </div>
  );
}