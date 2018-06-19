import React, { Component } from 'react';
import './pageTwo.css';
import { apiCallGet, apiCallPost } from '../utils';
import queryString from 'query-string';
import { CheckUsername } from '../commen/CheckUsername';
import { NesteOppgaveLenke } from '../commen/NesteOppgaveLenke';
import { Redirect } from 'react-router-dom';

export class PageTwo extends Component {
  constructor(props){
    super(props);
    const { username } = queryString.parse(props.location.search);
    this.username = username;
    this.state = {
      value: '',
      level: 10,
      isCompleted: null,
      hasUsername: false,
      toLowLevel: false
    }
    this.sendSvar = this.sendSvar.bind(this);
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
  sendSvar(){
    const svar = {
      svar: this.state.value
    };
    if(svar.svar){
      const url = `/api/${this.username}/answertwo`;
      apiCallPost(url, svar)
        .then(res => {
          this.setState({
            isCompleted: res.answer,
            toLowLevel: res.toLowLevel
          })
        })
    }
  };
  render(){
    return (
      <CheckUsername
        hasUsername={this.state.hasUsername}
      >
        {
          this.state.level < 1 ? <Redirect to={`/?username=${this.username}`}/> : null 
        }
        <section  className='page-two'>
          <div>
            <p>Etter en lang dag i Bergen er dere klare for å dra videre. <span style={{color: 'white'}}>(binær)</span></p> 
            <p>Flere i gruppen ønsker å se Nidarosdomen og svinge seg litt på Solsiden.</p>
            <p>Dette vil koste penger så dere prøver å få haik oppover</p>
            <p>En bil stopper og det er ingen ringere enn Åge Alexandersen som stiger ut</p>
            <p>Han synger noen stofer og ber dere løse neste oppgave før han vil kjøre dere oppover mot sitt kjære Trondheim.</p>
          </div>


          <h2>Løs oppgaven</h2>
          Oppgave 1 : <div style={{margin: '2em'}}>
            <input type="password" onChange={()=>{}} value='1001'/>
            <span>{` + `}</span>
            <input type="password" onChange={()=>{}} value='0111'/>
          </div>
          Oppgave 2 : <div style={{margin: '2em'}}>
            <span>{`Oppgave 1 - `}</span>
            <input type="password" onChange={()=>{}} value='1111'/>
          </div>
          <div>
            <p style={{color: 'white'}}>(Tenk alfabetet)</p>
            <label htmlFor="">
              Svar
              <input type="text" onChange={(e) => this.setState({value: e.target.value})} value={this.state.value} />
            </label>
            <button
              onClick={this.sendSvar}
              // style={{display: 'none'}}
            >
                Send svar
            </button>
          </div>
          <NesteOppgaveLenke lenke={`/page-three?username=${this.username}`} showLink={this.state.isCompleted} title='Du kan nå gå videre' />

        </section>
      </CheckUsername>

    );
  }

};