import React, { Component } from 'react';
import './pageOne.css';
import {Letter} from './Letter';
import { letters } from './letters'
import { InputAndButton } from '../commen/InputAndButton';
import queryString from 'query-string';

export class PageOne extends Component {
 constructor(props){
   super(props);
   const { username } = queryString.parse(props.location.search);
   this.username = username;
 }

  render(){
    return (
      this.username ? <section data-bokstav='D' className='page-one'>
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
          onClick={() => {}}
        />
      </section>: <div>
      Det ser ut som brukernavnet deres har blitt borte på veien. Uten dette kommer dere ingen vei i dette landet...
    </div>
    );
  }

};