import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  AppBar,
  Toolbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import SpeechToText from "speech-to-text";
import axios from "axios";

import supportedLanguages from "../SupportedLanguages";

const styles = (theme) => ({
  root: {
    paddingTop: 65,
    paddingLeft: 11,
    paddingRight: 11,
  },
  flex: {
    flex: 1,
  },
  grow: {
    flexGrow: 1,
  },
  paper: theme.mixins.gutters({
    paddingTop: 22,
    paddingBottom: 22,
  }),
});

const SpeechToTextDemo = (props) => {
  const [error, setError] = useState("");
  const [interimText, setInterimText] = useState("");
  const [finalisedText, setFinalisedText] = useState([]);
  const [listening, setListening] = useState(false);
  const [language, setLanguage] = useState("");
  const [weatherData, setWeatherData] = useState([]);

  // state = {
  //   error: "",
  //   interimText: "",
  //   finalisedText: [],
  //   listening: false,
  //   language: "en-US",
  //   // persons: "",
  //   // weatherData: "",
  // };

  useEffect(() => {
    axios
      .get(`https://74d437c5351e.ngrok.io/weather/bridgeport/1`)
      .then((res) => {
        var weatherData = res.data;
        // console.log(weatherData);
        setWeatherData(weatherData);
      })
      .catch((error) => console.error(`Error: ${error}`));
  }, []);

  const onAnythingSaid = (text) => {
    setInterimText(text);
  };

  const onEndEvent = () => {
    if (!isWidthUp("sm", props.width)) {
      setListening(false);
    } else if (listening) {
      this.startListening();
    }
  };

  const onFinalised = (text) => {
    setFinalisedText([text, ...finalisedText]);
    setInterimText("");
  };

  const startListening = () => {
    try {
      this.listener = new SpeechToText(
        this.onFinalised,
        this.onEndEvent,
        this.onAnythingSaid,
        this.state.language
      );
      this.listener.startListening();
      setListening(true);
    } catch (err) {
      console.log("yoyoy");
      console.log(err);
    }
  };

  const stopListening = () => {
    this.listener.stopListening();
    setListening(false);
  };

  //   axios.get(`https:///f46816d567f8.ngrok.io/weather/${cityName}/${value}`)
  //     .then((response) => {
  //       const allWeatherData = response.data;

  //       console.log(allWeatherData);

  //       setWeatherData(allWeatherData);
  //     })
  //     .catch((error) => console.error(`Error: ${error}`));
  // };

  // const { error, interimText, finalisedText, listening, language } =
  //   this.state;
  const { classes } = props;
  let content;
  if (error) {
    content = (
      <Paper className={classes.paper}>
        <Typography variant="h6" gutterBottom>
          {error}
        </Typography>
      </Paper>
    );
  } else {
    let buttonForListening;

    if (listening) {
      buttonForListening = (
        <Button color="primary" onClick={() => stopListening()}>
          Stop Listening
        </Button>
      );
    } else {
      buttonForListening = (
        <Button
          color="primary"
          onClick={() => startListening()}
          variant="contained"
        >
          Start Listening
        </Button>
      );
    }
    content = (
      <Grid container spacing={8}>
        <Grid item xs={12} md={7}>
          <Paper className={props.classes.paper}>
            <Grid container spacing={8}>
              <Grid item xs={12} lg={6}>
                <Typography variant="overline" gutterBottom>
                  Status: {listening ? "listening..." : "finished listening"}
                </Typography>
                {buttonForListening}
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel>Language</InputLabel>
                  <Select
                    value={language}
                    onChange={(evt) => setLanguage(evt.target.value)}
                    disabled={listening}
                  >
                    {supportedLanguages.map((language) => (
                      <MenuItem key={language[1]} value={language[1]}>
                        {language[0]}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    What language are you going to speak in?
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper className={props.classes.paper}>
            <Typography variant="overline" gutterBottom>
              Current utterances
            </Typography>
            <Typography variant="body1" gutterBottom>
              {interimText}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Finalized Text</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {finalisedText.map((str, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {str}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
          <div>
            {/* <ul>
                {this.state.persons?.map((person) => (
                  <li>{person.name}</li>
                ))}
              </ul> */}
            {/* {this.state.weatherData === "" ? (
                <div></div>
              ) : (
                <div> {this.state.weatherData.weather}</div>
              )} */}

            {/* {weatherData?.map(function (item) {
              return { item };
            })} */}
          </div>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.grow} color="inherit">
            Speech To Text
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container justify="center" className={classes.root}>
        <Grid item xs={12} sm={8}>
          <Grid container>
            <Grid item xs={12}></Grid>
          </Grid>
          {content}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withWidth()(withStyles(styles)(SpeechToTextDemo));
