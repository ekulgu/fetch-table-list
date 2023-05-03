import React from "react";
import { render } from "react-dom";
import FetchData from "./FetchData";

class App extends React.Component {
  render() {
    return (
      <div>
        <FetchData />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));

// https://run.mocky.io/v3/ffb2ab39-247a-4797-b4bd-185451fd1e4a
