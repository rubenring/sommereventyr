import React, { Component } from 'react';
import logo from './logo.svg';
import { AppRouter } from './root/Router';
import './App.css';
import { checkstatus, parseJSON } from './utils';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      response: '',
      username: ''
    };
    this.updateName = this.updateName.bind(this);
    this.sendUsernameToServer = this.sendUsernameToServer.bind(this);
  }
 
  componentDidMount() {
    this.callApi()
    .then(checkstatus)
    .then(parseJSON)
    .then(json => {
      this.setState({
        username: json.username
      })
    })
    .catch(err => console.log(err));
  }
  updateName(e){
    this.setState({
      username: e.target.value
    })
  }
  sendUsernameToServer(){

  }
  callApi = () => {
    const response = fetch('/api/test/progress');
    return response;
  };
  render() {
    return (
      <div className="App">
        <AppRouter username={this.state.username} updateName={this.updateName} logo={logo} />
      </div>
    );
  }
}

export default App;
