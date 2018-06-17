import React, { Component } from 'react';
import logo from './logo.svg';
import { AppRouter } from './root/Router';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <AppRouter />
      </div>
    );
  }
}

export default App;
