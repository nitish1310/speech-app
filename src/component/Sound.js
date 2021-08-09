import React, { useEffect } from "react";
import useSound from "use-sound";
// import boopSfx from "./pomodoro-times-up.mp3";

function Sound() {
  const boopSfx = "http://assets.coderrocketfuel.com/pomodoro-times-up.mp3";
  const soundRes = "https://544995de7c93.ngrok.io/audio/";
  //   const [play] = useSound(boopSfx);

  useEffect(() => {
    fun();
    // play();
    // setInterval(function () {
    //   //   play();
    //   let song = new Audio(boopSfx);
    //   song.play();
    //   console.log("Sound Played!");
    // }, 5000);
  }, []);

  function fun() {
    let song = new Audio(soundRes);
    song.play();
    // play();
  }
  return (
    <div>
      <button onClick={fun}>Boop!</button>
    </div>
  );
}

export default Sound;
