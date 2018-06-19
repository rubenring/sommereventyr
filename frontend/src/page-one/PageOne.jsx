import React, { Component } from 'react';
import './pageOne.css';
import {Letter} from './Letter';
import { letters } from './letters'
import { InputAndButton } from '../commen/InputAndButton';
import queryString from 'query-string';
import { apiCallPost } from '../utils';
import { NesteOppgaveLenke } from '../commen/NesteOppgaveLenke';

export class PageOne extends Component {
 constructor(props){
   super(props);
   const { username } = queryString.parse(props.location.search);
   this.username = username;
  //  this.lagreSvar = this.lagreSvar.bind(this);
   this.onChange = this.onChange.bind(this)
   this.state = {
    value: '',
    isCompleted: null
  };
 }
  lagreSvar = () => {
    const svar = {
      svar: this.state.value
    };
    if(svar.svar){
      const url = `/api/${this.username}/answerone`;
      apiCallPost(url, svar)
        .then(res => {
          this.setState({
            isCompleted: res.answer
          })
        })
    }
  }
  onChange(value){
    this.setState({
      value
    });
  }
  render(){
    return (
      this.username ? <section  className='page-one'>
        <h2>Finn 2 skjulte bokstaver.</h2>
        <i style={{visibility: 'hidden', fontSize: '200px'}}>123</i>
        <div style={{width: '0px', height: '0px', overflow: 'hidden'}}>ec5f307427dc5c85df0cae1dfe863f25</div>
        <div className='alpabeth' >
          {letters.map(x => {
              return <Letter key={x.text} active={x.active} text={x.text}/>
            }
          )}
        </div>
        <InputAndButton 
          id={'page-one-answer'} 
          label='Fyll inn svaret deres her' 
          onChange={this.onChange}
          value={this.state.value}
          onClick={this.lagreSvar}
        />
        {this.state.isCompleted ? <span>

          Turen går videre mot vest. <br />
          Her er det høye fjell og dype fjorder. <br />
          Husk å samle på bokstavne dere har funnet. <br />
          Disse vil hjelpe dere videre etterhvert... 
          <br />
        </span> : null}
        
        <NesteOppgaveLenke lenke={`/page-two?username=${this.username}`} showLink={this.state.isCompleted} title='Du kan nå gå videre' />
      </section>: <div>
      Det ser ut som brukernavnet deres har blitt borte på veien. Uten dette kommer dere ingen vei i dette landet...
    </div>
    );
  }

};