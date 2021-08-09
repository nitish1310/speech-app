import "./App.css";
// import Speech from "./component/Speech";
import SpeechToTextWeather from "./component/SpeechToTextDemo";
import Test from "./component/Test";
// import TextToSpeech from "./component/TextToSpeech";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SpeechToTextIntents from "./component/SpeechToTextIntents";
import SpeechToTextTranslation from "./component/SpeechToTextTranslation";
import Sound from "./component/Sound";
import SpeechToTextJSimilarity from "./component/SpeechToTextJSimilarity";
import GridComp from "./component/GridComp";
// import Watson from "./component/Watson";

function App() {
  return (
    // <div className="App">
    //   {/* <Speech /> */}
    //   <SpeechToTextDemo />
    //   {/* <TextToSpeech /> */}
    // </div>

    <Router>
      <div className="App">
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/weather">Weather</Link>
            </li>
            <li>
              <Link to="/intents">Intents</Link>
            </li>
          </ul>
        </nav> */}

        {/* A <Switch> looks through its children <Route>s and
      renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/weather">
            <SpeechToTextWeather />
          </Route>
          <Route path="/intents">
            <SpeechToTextIntents />
          </Route>
          <Route path="/translation">
            <SpeechToTextTranslation />
          </Route>
          <Route path="/sound">
            <Sound />
          </Route>
          <Route path="/word">
            <SpeechToTextJSimilarity />
          </Route>
          <Route path="/test">
            <GridComp />
          </Route>
          <Route path="/">
            <Test />
            {/* <Watson /> */}
            {/* <Home /> */}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
