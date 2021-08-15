import React, { Component } from "react";
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
import Speech from "speak-tts";
// import prompt from "./prompt.mp3";

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

class SpeechToTextTranslation extends Component {
  state = {
    error: "",
    interimText: "",
    finalisedText: [],
    listening: false,
    language: "en-US",
    languageDest: "en-US",
    weatherData: "",
    persons: [],
    speechFun: false,
    translation: [],
  };

  onAnythingSaid = (text) => {
    this.setState({ interimText: text });
  };

  onEndEvent = () => {
    if (!isWidthUp("sm", this.props.width)) {
      this.setState({ listening: false });
    } else if (this.state.listening) {
      this.startListening();
    }
  };

  onFinalised = (text) => {
    this.setState(
      {
        finalisedText: [text, ...this.state.finalisedText],
        interimText: "",
      },
      () => {
        this.getData(this.state.finalisedText);
      }
    );
  };

  startListening = () => {
    try {
      this.listener = new SpeechToText(
        this.onFinalised,
        this.onEndEvent,
        this.onAnythingSaid,
        this.state.language
      );
      this.listener.startListening();
      this.setState({ listening: true });
      this.setState({ speechFun: false });
    } catch (err) {
      console.log("yoyoy");
      console.log(err);
    }
  };

  stopListening = () => {
    this.listener.stopListening();
    this.setState({ listening: false });
  };

  getTranslation(word, destLang) {
    const soundRes = "https://449dbe2deb7a.ngrok.io/audio/";
    // axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    console.log(
      `https://449dbe2deb7a.ngrok.io/translation/${word}/${destLang.substring(
        0,
        2
      )}`
    );
    axios
      // .get(`https://74d437c5351e.ngrok.io/weather/bridgeport/1`)
      .get(
        `https://449dbe2deb7a.ngrok.io/translation/${word}/${destLang.substring(
          0,
          2
        )}`
        // {
        //   headers: {
        //     "Access-Control-Allow-Origin": "*",
        //     "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        //     "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
        //   },
        // }
      )
      .then((res) => {
        const translation = res.data;
        console.log(translation.translationText);

        this.setState({ translation });
        console.log(translation.translationText);
        // const msg = new SpeechSynthesisUtterance(persons.weather);
        // window.speechSynthesis.speak(msg);
        let audioPlay = new Audio(soundRes);
        audioPlay.play();
        // this.fun(translation.translationText);
      })
      .catch((error) => console.error(`Error: ${error}`));
  }

  fun(weather) {
    if (this.state.speechFun === false) {
      // const msg = new SpeechSynthesisUtterance(weather);
      // window.speechSynthesis.speak(msg);
      var languageDestValue = this.state.languageDest;
      if (languageDestValue === "bn-IN" || languageDestValue === "mr-IN") {
        languageDestValue = "hi-IN";
      }
      const speech = new Speech(); // will throw an exception if not browser supported
      speech
        .init({
          volume: 0.5,
          lang: languageDestValue,
          rate: 1,
          pitch: 1,
          //'voice':'Google UK English Male',
          //'splitSentences': false,
          listeners: {
            onvoiceschanged: (voices) => {
              console.log("Voices changed", voices);
            },
          },
        })
        .then((data) => {
          console.log("Speech is ready", data);
          // _addVoicesList(data.voices);
          // speak(speech);
          speech
            .speak({
              text: weather,
              // lang: "hi-IN",
            })
            .then(() => {
              console.log("Success !");
            })
            .catch((e) => {
              console.error("An error occurred :", e);
            });
        })
        .catch((e) => {
          console.error("An error occured while initializing : ", e);
        });
      const text = speech.hasBrowserSupport()
        ? "Hurray, your browser supports speech synthesis"
        : "Your browser does NOT support speech synthesis. Try using Chrome of Safari instead !";
      console.log(text);
    }
    this.setState({ speechFun: true });
  }

  getData(finalText) {
    var res = finalText[0].replace(/ /g, "%20");
    console.log("Res:", res);

    this.getTranslation(res, this.state.languageDest);
    // console.log(res);
  }

  render() {
    const {
      error,
      interimText,
      finalisedText,
      listening,
      language,
      languageDest,
      weatherData,
      persons,
    } = this.state;
    const { classes } = this.props;
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
          <Button color="primary" onClick={() => this.stopListening()}>
            Stop Listening
          </Button>
        );
      } else {
        buttonForListening = (
          <Button
            color="primary"
            onClick={() => this.startListening()}
            variant="contained"
          >
            Start Listening
          </Button>
        );
      }
      content = (
        <Grid container spacing={8}>
          <Grid item xs={12} md={7}>
            <Paper className={this.props.classes.paper}>
              <Grid container spacing={8}>
                <Grid item xs={12} lg={6}>
                  <Typography variant="overline" gutterBottom>
                    Status: {listening ? "listening..." : "finished listening"}
                  </Typography>
                  {buttonForListening}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={7}>
            <Paper className={this.props.classes.paper}>
              <Grid container spacing={8}>
                <Grid item xs={12} lg={6}>
                  <Grid item xs={12} lg={6}>
                    <FormControl className={classes.formControl}>
                      <InputLabel>Source Language</InputLabel>
                      <Select
                        value={language}
                        onChange={(evt) =>
                          this.setState({ language: evt.target.value })
                        }
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
                        {this.state.language.substring(0, 2)}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormControl className={classes.formControl}>
                    <InputLabel>Destination Language</InputLabel>
                    <Select
                      value={languageDest}
                      onChange={(evt) =>
                        this.setState({ languageDest: evt.target.value })
                      }
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
                      {this.state.languageDest.substring(0, 2)}
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper className={this.props.classes.paper}>
              <Typography variant="overline" gutterBottom>
                Current utterances
              </Typography>
              <Typography variant="body1" gutterBottom>
                {interimText}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Your Messages: </TableCell>
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
          </Grid>

          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Bot Reply: </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {finalisedText.map((str, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          Your Message: {str}
                        </TableCell>
                      </TableRow>
                    );
                  })} */}
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {/* {this.state.persons.res} */}
                      {this.state.translation.translationText}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
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
        <Grid container justify-content="center" className={classes.root}>
          <Grid item xs={12} sm={8}>
            <Grid container>
              <Grid item xs={12}></Grid>
            </Grid>
            {content}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withWidth()(withStyles(styles)(SpeechToTextTranslation));
