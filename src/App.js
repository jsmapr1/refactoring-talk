import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Options from './components/Options/Options';
import Choices from './components/Choices/Choices';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            Build Your Stuff
        </header>
        <div className="main">
          <Options />
          <Choices />
        </div>
      </div>
    );
  }
}

export default App;
