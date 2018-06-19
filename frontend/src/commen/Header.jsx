import React from 'react';
import { User } from './User';

export const Header = (props) => {
  return(
    <header className="App-header">
      <div className='user-container'>
        <User username={props.username}/>
      </div>
      <img src={props.logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
  )
}
