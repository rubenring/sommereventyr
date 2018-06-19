import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { CheckUsername } from '../commen/CheckUsername';
import { InputAndButton } from '../commen/InputAndButton';
import { NesteOppgaveLenke } from '../commen/NesteOppgaveLenke';
import queryString from 'query-string'
import { apiCallPost, apiCallGet } from '../utils';

export class PageThree extends Component {
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
            hasUsername: res.hasUsername
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
      const url = `/api/${this.username}/answerthree`;
      apiCallPost(url, svar)
        .then(res => {
          this.setState({
            isCompleted: res.answer,
            toLowLevel: res.toLowLevel
          })
        })
    }
  }

  isTrue(){
    const patt = /(?=.*N)(?=.*O)/i;
    return this.state.reg.match(patt)
  }
  render(){
    return (
      <CheckUsername
        hasUsername={this.state.hasUsername}
      >
      {console.log(this.state.level)}
      {
        this.state.level < 2 ? <Redirect to={`/?username=${this.username}`}/> : null 
      }
      <section className='page-Three'>
          <div className='info'>
            <p>Etter flere runder i manesjen på Solsiden er dere klare for å dra videre.</p>
            <p>Flertallet stemmer for å ta hurtigruta til Bodø.</p>
            <p>Dette har dere ikke penger til (selvfølgelig). Nå er gode råd dyre.</p>
            <p>Kapteinen på en lokal fiskebåt skal også oppover i kveld, og får nyss om gruppen deres</p>
            <p>Han sier dere kan få sitte på, men kun hvis dere løser denne oppgaven han har jobbet med en stund</p>
          </div>
          <label htmlFor="">
            Hva kreves her? <br/>
            <input onChange={(e) => this.setState({reg: e.target.value})} value={this.state.reg} />
            <br />
            <span >Er dere inne på noe? <b>{this.state.reg.length>0 ? this.isTrue() ? 'Jepp' : 'Nope' : null} </b></span>
          </label>

          <InputAndButton 
            id={'page-three-answer'} 
            label='Fyll inn svaret deres her' 
            onChange={this.onChange}
            value={this.state.value}
            onClick={this.lagreSvar}
          />

        <NesteOppgaveLenke lenke={`/page-four?username=${this.username}`} showLink={this.state.isCompleted} title='Du kan nå gå videre' />

      </section>
      </CheckUsername>
    );
  }

};