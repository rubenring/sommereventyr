import React, { Component } from 'react';
import './infoPage.css';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import {CheckUsername} from '../commen/CheckUsername'

export class InfoPage extends Component{
  constructor(props){
    super(props);
    const { username } = queryString.parse(this.props.location.search);
    this.username = username;
  }
  componentDidMount(){

  }
  render(){
    return (
      <CheckUsername
        username={this.username}
      >
        <section className='info-page'>
            <h2>Velkommen til reisen gjennom et nytt land.</h2>
            <p>For å komme dere gjennom må dere løse oppgavene som møter dere på veien.</p>
            <Link 
              to={`/page-one?username=${this.username}`} 
            >
              Klikk her for å gå videre
            </Link>
        </section>
      </CheckUsername>

    );
  }
};