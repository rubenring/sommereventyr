import React, { Component } from 'react';
import { apiCallGet } from '../utils';

export class CheckUsername extends Component {
  constructor(props){
    super(props);
    this.state = {
      hasUsername: false
    }
  }
  componentDidMount(){
    const url = `/api/${this.props.username}/progress`;
    apiCallGet(url)
      .then(res => {
        this.setState({
          hasUsername: res.hasUsername
        })
      })
  }
  render(){
    return (
      <section className='checker'>
          {
            this.state.hasUsername === true ? this.props.children : <div>Dere mangler brukernavn</div>
          }
      </section>
    );
  }

};