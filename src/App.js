import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PizzaMaker from './components/PizzaMaker/PizzaMaker';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            Build Your Stuff
        </header>
        <div className="main">
          <PizzaMaker />
        </div>
      </div>
    );
  }
}

export default App;
