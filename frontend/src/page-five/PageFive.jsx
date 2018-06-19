import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './pageFive.css';
import { CheckUsername } from '../commen/CheckUsername';
import { InputAndButton } from '../commen/InputAndButton';
import queryString from 'query-string'
import { apiCallPost, apiCallGet } from '../utils';

export class PageFive extends Component {
  constructor(props){
    super(props)
    const { username } = queryString.parse(props.location.search);
    this.username = username;
    this.state = {
      value: '',
      level: 10,
      lat: '',
      long: '',
      hasUsername: false,
      toLowLevel: false
    }
    this.lagreSvar = this.lagreSvar.bind(this);
    this.onChange = this.onChange.bind(this);

  }
  componentDidMount(){
    if(this.username){
      const url = `/api/${this.username}/progress`;
      apiCallGet(url)
        .then(res => {
          this.setState({
            level: res.level,
            hasUsername: res.hasUsername,
            username: res.username
          })
        })
    }
  }
  onChange(value){
    this.setState({
      value
    })
  }
  lagreSvar(){
    const svar = {
      svar: this.state.value
    };
    if(svar.svar){
      const url = `/api/${this.username}/answerlast`;
      apiCallPost(url, svar)
        .then(res => {
          this.setState({
            long: res.long,
            lat: res.lat
          })
        })
    }
  }

  render(){
    return (
      <CheckUsername
        hasUsername={this.state.hasUsername}
      >
      {
        this.state.level < 4 ? <Redirect to={`/?username=${this.username}`}/> : null 
      }
      <section className='page-Four'>
          <div className='info'>
            <p>Veldig godt jobbet og godt reist!</p>
            <p>Nå må dere komme dere hjem til Oslo for å få dere en pils.</p>
            <p>For å få plass på flyet må dere først finne ut hvor dere er. <span style={{color: 'white'}}>Network</span></p>
            <p>Dette vil hjelpe dere å finne ut hvor dere skal</p>
          </div>
          <div>
            <h3>Løs anagrammet</h3>
            <p>Bruk bokstavene dere har samlet inn i løpet av denne oppgaven til å finne navnet på stedet dere befinner dere.</p>
          </div>
          <InputAndButton 
            id={'page-four-answer'} 
            label='Fyll inn svaret deres her' 
            onChange={this.onChange}
            value={this.state.value}
            onClick={this.lagreSvar}
          />
          {this.state.long && <div>
              <code>long: {this.state.long}</code><br/>
              <code>lat: {this.state.lat}</code>
              <p>Gratulerer. Nå er det bare å forte seg, vinneren får flere øl!</p>
          </div> }

      </section>
      </CheckUsername>
    );
  }
};