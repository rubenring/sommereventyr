import React from 'react';
import { User } from './User';

export const Header = ({logo, updateName, username, sendUsernameToServer}) => {

  return(
    <header className="App-header">
      <div className='user-container'>
        <User updateName={updateName} username={username} sendUsernameToServer={sendUsernameToServer}/>
      </div>
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
  )
}
