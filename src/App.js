import React, { Component } from "react";
import "./App.css";
import Typehead from "./components/typehead/Typehead";
import { colorsList } from "./constants/colorLists";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Blockchains LLC</h1>
        </header>
        <Typehead
          suggestions={colorsList}
        />
      </div>
    );
  }
}

export default App;
