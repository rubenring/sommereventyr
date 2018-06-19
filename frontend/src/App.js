import React, { Component } from 'react';
import logo from './logo.svg';
import { AppRouter } from './root/Router';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppRouter logo={logo} />
      </div>
    );
  }
}

export default App;
