import React, { Component } from 'react';
import logo from './logo.svg';
import { AppRouter } from './root/Router';
import { Header } from './commen/Header';
import './App.css';

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
      .then(res => this.setState({ response: res.express }))
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
    const response = fetch('/api/hello');
    // const body =  response.json();

    // if (response.status !== 200) throw Error(body.message);

    return response;
  };
  render() {
    return (
      <div className="App">
        <Header username={this.state.username} updateName={this.updateName} logo={logo}/>
        <AppRouter username={this.state.username} />
      </div>
    );
  }
}

export default App;
