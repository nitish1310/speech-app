import React from "react";

import TextToSpeechV1 from "ibm-watson/text-to-speech/v1";
import { IamAuthenticator } from "ibm-watson/auth";
var apikey = "0pZ327WNBwp7Do56OItWyvxoOFrOzJ3q5CRLp9H6TJ6l";
var url =
  "https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/f744b243-77aa-4d68-9edd-1c3137a8968b";

function Watson() {
  const textToSpeech = new TextToSpeechV1({
    authenticator: new IamAuthenticator({
      apikey: apikey,
    }),
    serviceUrl: url,
  });
  textToSpeech
    .listSpeakerModels()
    .then((speakers) => {
      console.log(JSON.stringify(speakers, null, 2));
    })
    .catch((err) => {
      console.log("error:", err);
    });

  return (
    <div>
      <h1>Watson</h1>
    </div>
  );
}

export default Watson;
