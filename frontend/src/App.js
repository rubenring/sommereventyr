import React, { Component } from 'react';
import logo from './logo.svg';
import { AppRouter } from './root/Router';
import './App.css';

class App extends Component {

  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = () => {
    const response =  fetch('/api/hello');
    // const body =  response.json();

    // if (response.status !== 200) throw Error(body.message);

    return response;
  };
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
