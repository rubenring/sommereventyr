import React, { Component } from 'react';

export class CheckUsername extends Component {
  render(){
    return (
      <section className='checker'>
          {
            this.props.hasUsername === true ? this.props.children : <div>Dere mangler brukernavn</div>
          }
      </section>
    );
  }

};