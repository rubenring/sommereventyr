import React, { Component } from 'react';
import './pageTwo.css';

export class PageTwo extends Component {
  constructor(props){
    super(props);
    this.state = {
      svar: '16'
    }
    this.sendSvar = this.sendSvar.bind(this);
  }
  sendSvar(){
    console.log(this.state.svar)
  };
  render(){
    return (
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
    );
  }

};