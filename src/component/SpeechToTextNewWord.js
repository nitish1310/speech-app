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
  Card,
  CardActions,
  CardContent,
} from "@material-ui/core";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import SpeechToText from "speech-to-text";
import axios from "axios";
import Speech from "speak-tts";
import loading from "../loading.gif";
// import prompt from "./prompt.mp3";

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
  paper: {
    paddingTop: 22,
    paddingBottom: 22,
  },
});

class SpeechToTextNewWord extends Component {
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
    jDistRes: [],
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
        this.props.languageDest
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

  getJaccardDist(translatedText, userInput, language) {
    const soundCorrectRes = "https://applang.herokuapp.com/audio-correct";
    const soundWrongRes = "https://applang.herokuapp.com/audio-wrong";
    // axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    console.log(
      `https://applang.herokuapp.com/jdist/${translatedText}/${userInput}/${language}`
    );
    axios
      // .get(`https://74d437c5351e.ngrok.io/weather/bridgeport/1`)
      .get(
        `https://applang.herokuapp.com/jdist/${translatedText}/${userInput}/${language}`
      )
      .then((res) => {
        const jDistRes = res.data;
        console.log(jDistRes.res);

        this.setState({ jDistRes });
        console.log(jDistRes.res);
        let audioPlay = "";
        if (jDistRes.status === "Correct") {
          audioPlay = new Audio(soundCorrectRes);
          audioPlay.play();
        } else {
          audioPlay = new Audio(soundWrongRes);
          audioPlay.play();
        }
      })
      .catch((error) => console.error(`Error: ${error}`));
  }

  getData(finalText) {
    var res = finalText[0].replace(/ /g, "%20");
    console.log("Res:", res);
    console.log("translation:", this.props.translation.trim());

    // this.getTranslation(res, this.props.languageDest.substring(0, 2));
    this.getJaccardDist(
      this.props.translation.trim(),
      res,
      this.props.language
    );
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
          <div>
            <Button color="primary" onClick={() => this.stopListening()}>
              Stop Listening
            </Button>
            <div>
              <img
                src={loading}
                alt="loading..."
                height="60px"
                style={{ marginTop: 10 }}
              />
            </div>
          </div>
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
        <Grid container spacing={0}>
          <Grid item xs={12} md={12}>
            <Paper className={this.props.classes.paper}>
              <Grid container spacing={8}>
                <Grid item xs={12} lg={12}>
                  <Typography variant="overline" gutterBottom>
                    Status: {listening ? "listening..." : "finished listening"}
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={12} style={{ marginTop: -60 }}>
                  {buttonForListening}
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={5} style={{ marginTop: -30 }}>
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
                    <TableCell>Your Word: </TableCell>
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
                      {this.state.jDistRes.res}
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
      <div>
        <Grid container>
          <Grid container justify-content="center" className={classes.root}>
            <Grid item xs={12} sm={8}>
              <Grid container>
                <Grid item xs={12}></Grid>
              </Grid>
              <Typography variant="h5" component="h2" gutterBottom>
                Try Your Word
              </Typography>
              {content}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withWidth()(withStyles(styles)(SpeechToTextNewWord));
