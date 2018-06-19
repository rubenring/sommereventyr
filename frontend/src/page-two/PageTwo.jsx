import React, { Component } from 'react';
import './pageTwo.css';
import { apiCallGet } from '../utils';
import queryString from 'query-string';
import { CheckUsername } from '../commen/CheckUsername';
import { Redirect } from 'react-router-dom';

export class PageTwo extends Component {
  constructor(props){
    super(props);
    const { username } = queryString.parse(props.location.search);
    this.username = username;
    this.state = {
      svar: '',
      level: 2
    }
    this.sendSvar = this.sendSvar.bind(this);
  }
  componentDidMount(){
    const url = `/api/${this.username}/pagetwo`;

    apiCallGet(url)
      .then(res => {

        this.setState({
          level: res.level
        })
      })
  }
  sendSvar(){
  };
  render(){

    return (
      <CheckUsername
        username={this.username}
      >
        {
          this.state.level < 2 ? <Redirect to={`/?username=${this.username}`}/> : null 
        }
        <section  className='page-two'>
          <h2>Løs oppgaven</h2>
          <div style={{margin: '2em'}}>
            <input type="password" onChange={()=>{}} value='1001'/>
            <span>{` + `}</span>
            <input type="password" onChange={()=>{}} value='111'/>
          </div>

          <div>
            <label htmlFor="">
              Svar
              <input type="text" onChange={(e) => this.setState({svar: e.target.value})} value={this.state.svar} />
            </label>
            <button
            onClick={this.sendSvar}
              style={{display: 'none'}}
            >
                Send svar
            </button>
          </div>
        </section>
      </CheckUsername>

    );
  }

};