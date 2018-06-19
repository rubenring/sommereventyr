import React, { Component } from 'react';
import './pageOne.css';
import {Letter} from './Letter';
import { letters } from './letters'
import { InputAndButton } from '../commen/InputAndButton';
import queryString from 'query-string';
import { apiCallPost, apiCallGet } from '../utils';
import { NesteOppgaveLenke } from '../commen/NesteOppgaveLenke';
import { CheckUsername } from '../commen/CheckUsername';

export class PageOne extends Component {
  constructor(props){
    super(props);
    const { username } = queryString.parse(props.location.search);
    this.username = username;
    this.lagreSvar = this.lagreSvar.bind(this);
    this.onChange = this.onChange.bind(this)
    this.state = {
      value: '',
      isCompleted: null,
      hasUsername: false
    };
  }
  componentDidMount(){
    const url = `/api/${this.username}/progress`;
    if(this.username){
      apiCallGet(url)
        .then(res => {
          this.setState({
            level: res.level,
            hasUsername: res.hasUsername,
          })
        });
    }
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
      <CheckUsername
        hasUsername={this.state.hasUsername}
      >
        <section className='page-one'>
          <h2>Finn 2 skjulte bokstaver.</h2>
          <div>
            <p>Vi befinner oss i Oslo. Den flotteste byen i dette langstrakte land.</p>
            <p>I Oslo er det veldig dyrt, og etter at dere har spist en bedre middag</p>
            <p>er det ikke lenger penger igjen til togbillett over fjellet.</p>
            <p>Dere møter en dame som sier hun kan snike dere på nattoget</p>
            <p>men kun om dere hjelper henne å finne 2 bokstaver hun har mistet.</p>

            
          </div>
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
              Flott jobbet!
              Turen går nå videre mot vest. <br />
              Her er det høye fjell og dype fjorder. <br />
              Det er også flere oppgaver å løse... <br />
              <br />
            </span> 
          : null}
          
          <NesteOppgaveLenke lenke={`/page-two?username=${this.username}`} showLink={this.state.isCompleted} title='Du kan nå gå videre' />
        </section>
      </CheckUsername>

    );
  }

};