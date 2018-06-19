import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './pageFour.css';
import { CheckUsername } from '../commen/CheckUsername';
import { InputAndButton } from '../commen/InputAndButton';
import { NesteOppgaveLenke } from '../commen/NesteOppgaveLenke';
import queryString from 'query-string'
import { apiCallPost, apiCallGet } from '../utils';

export class PageFour extends Component {
  constructor(props){
    super(props)
    const { username } = queryString.parse(props.location.search);
    this.username = username;
    this.state = {
      value: '',
      reg: '',
      level: 10,
      isCompleted: null,
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
      const url = `/api/${this.username}/answerfour`;
      apiCallPost(url, svar)
        .then(res => {
          console.log(res);
          this.setState({
            isCompleted: res.answer
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
        this.state.level < 3 ? <Redirect to={`/?username=${this.username}`}/> : null 
      }
      <section className='page-Four'>
          <div className='info'>
            <p>Bodø var en eneste stor skuffelse.</p>
            <p>Dere skulle ønske dere heller dro til nordens paris!</p>
            <p>Dette rekker dere desverre ikke, for nå er dere snart kommet til kveldens siste oppgave. <span style={{color: 'white'}}>md5</span></p>
            <p>Flere av dere er nå lei og vil bare ut å drikke pils. Dette skjønner reiseleder godt</p>
            <p>, men bryr seg ikke nevneverdig. Her er neste oppgave</p>
          </div>
          <div>
            <h3>Finn de siste bokstavene</h3>
            <code>da2be3f8b1640de6534fea0e9744cccb</code>
          </div>
          <InputAndButton 
            id={'page-four-answer'} 
            label='Fyll inn svaret deres her' 
            onChange={this.onChange}
            value={this.state.value}
            onClick={this.lagreSvar}
          />
        {this.state.isCompleted === true ? <span>Godt jobbet! Gå videre til siste oppgave</span> : null }
        <NesteOppgaveLenke lenke={`/page-five?username=${this.username}`} showLink={this.state.isCompleted} title='Gå til siste oppgave' />

      </section>
      </CheckUsername>
    );
  }

};