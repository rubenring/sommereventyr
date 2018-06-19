import React, { Component } from 'react';
import './infoPage.css';
import { Link } from 'react-router-dom';
import { apiCallPost } from '../utils';
import queryString from 'query-string';
import {CheckUsername} from '../commen/CheckUsername';
import Flagg from '../Flag_of_Norway.svg';
export class InfoPage extends Component{
  constructor(props){
    super(props);
    const { username } = queryString.parse(this.props.location.search);
    this.username = username;
    this.state = {
      hasUsername: false,
      username: ''
    }
  }
  componentDidMount(){
    if(this.username){
      const url = `/api/${this.username}/addusernametodb`;
      apiCallPost(url, {username: this.username})
      .then(res => {
        this.setState({
          hasUsername: res.hasUsername,
          username: res.username
        })
      })
    }
  }
  render(){
    return (
      <CheckUsername
        hasUsername={this.state.hasUsername}
      >
        
        <section className='info-page'>
            <img src={Flagg} style={{width: '50%'}} alt='norsk flag'/>
            <h2>Velkommen til reisen gjennom Norge.</h2>
            <p>For å komme dere gjennom må dere løse oppgavene som møter dere på veien.</p>
            {this.state.hasUsername ? <Link 
              to={`/page-one?username=${this.username}`} 
            >
              Klikk her for å gå videre
            </Link>
            : null
            }
        </section>
      </CheckUsername>

    );
  }
};