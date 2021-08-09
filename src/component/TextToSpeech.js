// import * as googleTTS from "google-tts-api"; // ES6 or TypeScript
// import { useEffect } from "react";
// import Player from "./Player";
import fs from "fs";
import tts from "google-translate-tts";
import { useEffect } from "react";

// const googleTTS = require('google-tts-api'); // CommonJS

const TextToSpeech = () => {
  //   // get audio URL
  //   const url = googleTTS.getAudioBase64("Hello World", {
  //     lang: "en",
  //     slow: false,
  //     host: "https://translate.google.com",
  //   });
  //   console.log("URL", url); // https://translate.google.com/translate_tts?...

  // notice that `tts.synthesize` returns a Promise<Buffer>
  const saveFile = async () => {
    const buffer = await tts.synthesize({
      text: "Hello, world!",
      voice: "en-US",
      slow: false, // optional
    });

    fs.writeFileSync("hello-world.mp3", buffer);
  };

  const fun = () => {
    const msg = new SpeechSynthesisUtterance("Hello, hope my code is helpful");
    window.speechSynthesis.speak(msg);
  };

  //   useEffect(() => {
  //     var audio = new Audio();
  //     audio.src =
  //       "https://translate.google.com/translate_tts?ie=UTF-8&q=Hello%20World&tl=en&total=1&idx=0&textlen=11&client=tw-ob&prev=input&ttsspeed=1";
  //     audio.play();
  //   }, []);

  //   useEffect(() => {
  //     const audio = new Audio(
  //       "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  //     );
  //     audio.load();
  //     playAudio();
  //   }, []);

  //   const playAudio = () => {
  //     const audio = new Audio(
  //       "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  //     );
  //     const audioPromise = audio.play();
  //     if (audioPromise !== undefined) {
  //       audioPromise
  //         .then((_) => {
  //           // autoplay started
  //         })
  //         .catch((err) => {
  //           // catch dom exception
  //           console.info(err);
  //         });
  //     }
  //   };

  return (
    <div>
      <h2>googleTTS</h2>
      {/* <p>{url}</p> */}
      <div>
        {/* <Player
          //   url={"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"}
          url={url}
        /> */}
        {/* <audio
          autoPlay="autoPlay"
          href="audio_tag"
          loop
          src={
            "https://translate.google.com/translate_tts?ie=UTF-8&q=Hello%20World&tl=en&total=1&idx=0&textlen=11&client=tw-ob&prev=input&ttsspeed=1"
          }
          //   type="audio/mpeg"
          controls
        ></audio> */}
        <button onClick={saveFile}>Click</button>
        <button type="button" onClick={fun}>
          Listen to me
        </button>
      </div>
    </div>
  );
};

export default TextToSpeech;
