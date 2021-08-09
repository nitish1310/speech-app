import React, { useEffect } from "react";
import Speech from "speak-tts";

const Test = () => {
  const speech = new Speech(); // will throw an exception if not browser supported
  //   const client = new textToSpeech.TextToSpeechClient();

  // useEffect(() => {
  //   setInterval(function () {
  //     play();
  //   }, 2000);
  // }, []);

  const speak = () => {
    const speech = new Speech(); // will throw an exception if not browser supported
    // if (speech.hasBrowserSupport()) {
    //   // returns a boolean
    //   console.log("speech synthesis supported");

    //   //   Speech.setLanguage("hi-IN");

    //   speech
    //     .speak({
    //       text: "मुझे खेद है, लेकिन मुझे नहीं समझा।",
    //       lang: "hi-IN",
    //       //   text: "আপনি কেমন আছেন",
    //       //   lang: "bn",
    //     })
    //     .then(() => {
    //       console.log("Success !");
    //     })
    //     .catch((e) => {
    //       console.error("An error occurred :", e);
    //     });
    // }

    speech
      .init({
        volume: 0.5,
        lang: "mr",
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
            text: "मुझे खेद है, लेकिन मुझे नहीं समझा।",
            // lang: "hi-IN",
            // text: "আপনি কেমন আছেন",
            // lang: "bn",
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
  };

  const TextToSPeech = () => {
    // responsiveVoice.speak("hello world", "UK English Male", {pitch: 2});
  };
  //   var speech = new Speech();
  //   useEffect(() => {
  //     var speech = new Speech();
  //     _prepareSpeakButton(speech);
  //   }, []);

  function _init() {
    speech
      .init({
        volume: 0.5,
        lang: "bn-IN",
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
        //   _prepareSpeakButton(speech);
        speech
          .speak({
            text: "Hello World!",
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

  // function _prepareSpeakButton(speech) {
  //   // const speakButton = document.getElementById("play");
  //   // const pauseButton = document.getElementById("pause");
  //   // const resumeButton = document.getElementById("resume");
  //   // const textarea = document.getElementById("text");
  //   // const languages = document.getElementById("languages");
  //   // speakButton.addEventListener("click", () => {
  //   const language = "hi-IN";
  //   const voice = "hi-IN";
  //   // if (language) speech.setLanguage(language);
  //   // if (voice) speech.setVoice(voice);
  //   speech
  //     .speak({
  //       text: "Hello World",
  //       queue: false,
  //       listeners: {
  //         onstart: () => {
  //           console.log("Start utterance");
  //         },
  //         onend: () => {
  //           console.log("End utterance");
  //         },
  //         onresume: () => {
  //           console.log("Resume utterance");
  //         },
  //         onboundary: (event) => {
  //           console.log(
  //             event.name +
  //               " boundary reached after " +
  //               event.elapsedTime +
  //               " milliseconds."
  //           );
  //         },
  //       },
  //     })
  //     .then((data) => {
  //       console.log("Success !", data);
  //     })
  //     .catch((e) => {
  //       console.error("An error occurred :", e);
  //     });
  //   // );
  // }

  //   _init();

  return (
    <div>
      <h1>Speak</h1>
      <button onClick={speak}>Speak</button>
    </div>
  );
};

export default Test;
